import { Moment } from 'moment';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { IRent } from 'app/shared/model/rent.model';

export interface IScore {
  id?: number;
  rating?: number;
  commentary?: string;
  creationDate?: Moment;
  state?: boolean;
  userAccount?: IUserAccount;
  rent?: IRent;
}

export class Score implements IScore {
  constructor(
    public id?: number,
    public rating?: number,
    public commentary?: string,
    public creationDate?: Moment,
    public state?: boolean,
    public userAccount?: IUserAccount,
    public rent?: IRent
  ) {
    this.state = this.state || false;
  }
}
