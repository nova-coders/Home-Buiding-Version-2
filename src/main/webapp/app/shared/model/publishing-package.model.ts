import { Moment } from 'moment';
import { IUserAccount } from 'app/shared/model/user-account.model';

export interface IPublishingPackage {
  id?: number;
  name?: string;
  price?: number;
  cantPropertySale?: number;
  cantPropertyRent?: number;
  cantDays?: number;
  professional?: boolean;
  creationDate?: Moment;
  type?: number;
  state?: boolean;
  userAccounts?: IUserAccount[];
}

export class PublishingPackage implements IPublishingPackage {
  constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public cantPropertySale?: number,
    public cantPropertyRent?: number,
    public cantDays?: number,
    public professional?: boolean,
    public creationDate?: Moment,
    public type?: number,
    public state?: boolean,
    public userAccounts?: IUserAccount[]
  ) {
    this.professional = this.professional || false;
    this.state = this.state || false;
  }
}
