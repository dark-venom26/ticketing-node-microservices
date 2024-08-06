import { requireAuth } from '@aman-tickets/common';
import { Request, Response, Router } from 'express';

const router = Router();

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };
