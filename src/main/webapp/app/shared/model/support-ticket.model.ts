import { Moment } from 'moment';
import { ISupportTicketLog } from 'app/shared/model/support-ticket-log.model';
import { IUserAccount } from 'app/shared/model/user-account.model';

export interface ISupportTicket {
  id?: number;
  title?: string;
  message?: string;
  creationDate?: Moment;
  state?: boolean;
  supportTicketLogs?: ISupportTicketLog[];
  client?: IUserAccount;
  signOffUser?: IUserAccount;
}

export class SupportTicket implements ISupportTicket {
  constructor(
    public id?: number,
    public title?: string,
    public message?: string,
    public creationDate?: Moment,
    public state?: boolean,
    public supportTicketLogs?: ISupportTicketLog[],
    public client?: IUserAccount,
    public signOffUser?: IUserAccount
  ) {
    this.state = this.state || false;
  }
}
