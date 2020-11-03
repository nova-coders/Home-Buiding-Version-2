import { Moment } from 'moment';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { ISale } from 'app/shared/model/sale.model';

export interface IOffer {
  id?: number;
  date?: Moment;
  commentary?: string;
  amount?: number;
  state?: boolean;
  userAccount?: IUserAccount;
  sale?: ISale;
}

export class Offer implements IOffer {
  constructor(
    public id?: number,
    public date?: Moment,
    public commentary?: string,
    public amount?: number,
    public state?: boolean,
    public userAccount?: IUserAccount,
    public sale?: ISale
  ) {
    this.state = this.state || false;
  }
}
