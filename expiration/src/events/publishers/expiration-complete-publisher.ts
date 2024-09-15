import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@aman-tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
