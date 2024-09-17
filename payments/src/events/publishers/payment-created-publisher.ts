import { PaymentCreatedEvent, Publisher, Subjects } from '@aman-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
