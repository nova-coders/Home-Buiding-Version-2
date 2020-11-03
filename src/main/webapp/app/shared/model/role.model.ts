import { Moment } from 'moment';
import { IUserAccount } from 'app/shared/model/user-account.model';

export interface IRole {
  id?: number;
  name?: string;
  description?: string;
  state?: boolean;
  creationDate?: Moment;
  userAccounts?: IUserAccount[];
}

export class Role implements IRole {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public state?: boolean,
    public creationDate?: Moment,
    public userAccounts?: IUserAccount[]
  ) {
    this.state = this.state || false;
  }
}
