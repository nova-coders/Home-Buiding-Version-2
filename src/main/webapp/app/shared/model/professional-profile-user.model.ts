import { Moment } from 'moment';
import { IUserAccount } from 'app/shared/model/user-account.model';

export interface IProfessionalProfileUser {
  id?: number;
  profesionalType?: number;
  pricePerHour?: number;
  description?: string;
  creationDate?: Moment;
  state?: boolean;
  userAccount?: IUserAccount;
}

export class ProfessionalProfileUser implements IProfessionalProfileUser {
  constructor(
    public id?: number,
    public profesionalType?: number,
    public pricePerHour?: number,
    public description?: string,
    public creationDate?: Moment,
    public state?: boolean,
    public userAccount?: IUserAccount
  ) {
    this.state = this.state || false;
  }
}
