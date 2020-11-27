import { Moment } from 'moment';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { IProperty } from 'app/shared/model/property.model';

export interface IDocument {
  id?: number;
  base64Code?: any;
  state?: boolean;
  buyerState?: boolean;
  sellerState?: boolean;
  creationDate?: Moment;
  seller?: IUserAccount;
  buyer?: IUserAccount;
  property?: IProperty;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public base64Code?: any,
    public state?: boolean,
    public buyerState?: boolean,
    public sellerState?: boolean,
    public creationDate?: Moment,
    public seller?: IUserAccount,
    public buyer?: IUserAccount,
    public property?: IProperty
  ) {
    this.state = this.state || false;
    this.buyerState = this.buyerState || false;
    this.sellerState = this.sellerState || false;
  }
}
