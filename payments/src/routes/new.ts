import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@aman-tickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { Order } from '../models/order';
import { Payment } from '../models/payment';
import { natsWrapper } from '../nats-wrapper';
import { stripe } from '../stripe';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }

    const paymentIntents = await stripe.paymentIntents.create({
      currency: 'INR',
      amount: order.price * 100,
      payment_method_types: ['card'],
      metadata: {
        orderId: order.id,
      },
    });

    await stripe.paymentIntents.confirm(paymentIntents.id, {
      payment_method: 'pm_card_in',
      return_url: 'https://ticketing.dev/',
    });

    const payment = Payment.build({
      orderId,
      stripeId: paymentIntents.id,
    });

    await payment.save();
    await new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: paymentIntents.id,
    });

    res.status(201).send({ id: payment.id });
  }
);

export { router as createChargeRouter };
