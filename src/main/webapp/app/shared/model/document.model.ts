import { Moment } from 'moment';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { IProperty } from 'app/shared/model/property.model';

export interface IDocument {
  id?: number;
  url?: string;
  sellerUserId?: number;
  buyerUserId?: number;
  state?: boolean;
  creationDate?: Moment;
  seller?: IUserAccount;
  buyer?: IUserAccount;
  property?: IProperty;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public url?: string,
    public sellerUserId?: number,
    public buyerUserId?: number,
    public state?: boolean,
    public creationDate?: Moment,
    public seller?: IUserAccount,
    public buyer?: IUserAccount,
    public property?: IProperty
  ) {
    this.state = this.state || false;
  }
}
