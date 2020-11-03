import { Moment } from 'moment';
import { ISupportTicket } from 'app/shared/model/support-ticket.model';

export interface ISupportTicketLog {
  id?: number;
  troubleshootingCommentary?: string;
  nextStepCommentary?: string;
  creationDate?: Moment;
  supportTicket?: ISupportTicket;
}

export class SupportTicketLog implements ISupportTicketLog {
  constructor(
    public id?: number,
    public troubleshootingCommentary?: string,
    public nextStepCommentary?: string,
    public creationDate?: Moment,
    public supportTicket?: ISupportTicket
  ) {}
}
