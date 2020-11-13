import { Moment } from 'moment';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';

export interface INotification {
  id?: number;
  title?: string;
  message?: string;
  state?: boolean;
  type?: NotificationType;
  creationDate?: Moment;
  transmitter?: IUserAccount;
  receptor?: IUserAccount;
}

export class Notification implements INotification {
  constructor(
    public id?: number,
    public title?: string,
    public message?: string,
    public state?: boolean,
    public type?: NotificationType,
    public creationDate?: Moment,
    public transmitter?: IUserAccount,
    public receptor?: IUserAccount
  ) {
    this.state = this.state || false;
  }
}
