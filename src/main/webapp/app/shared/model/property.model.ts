import { Moment } from 'moment';
import { ISale } from 'app/shared/model/sale.model';
import { IRent } from 'app/shared/model/rent.model';
import { IPropertyImage } from 'app/shared/model/property-image.model';
import { IDocument } from 'app/shared/model/document.model';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { IMoneyType } from 'app/shared/model/money-type.model';
import { ICanton } from 'app/shared/model/canton.model';
import { IPropertyCategory } from 'app/shared/model/property-category.model';

export interface IProperty {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  discount?: number;
  landSquareMeters?: number;
  areaSquareMeters?: number;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  addressText?: string;
  creationDate?: Moment;
  state?: number;
  sale?: ISale;
  rent?: IRent;
  propertyImages?: IPropertyImage[];
  documents?: IDocument[];
  userAccount?: IUserAccount;
  moneyType?: IMoneyType;
  canton?: ICanton;
  propertyCategory?: IPropertyCategory;
}

export class Property implements IProperty {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public price?: number,
    public discount?: number,
    public landSquareMeters?: number,
    public areaSquareMeters?: number,
    public latitude?: number,
    public longitude?: number,
    public zoom?: number,
    public addressText?: string,
    public creationDate?: Moment,
    public state?: number,
    public sale?: ISale,
    public rent?: IRent,
    public propertyImages?: IPropertyImage[],
    public documents?: IDocument[],
    public userAccount?: IUserAccount,
    public moneyType?: IMoneyType,
    public canton?: ICanton,
    public propertyCategory?: IPropertyCategory
  ) {}
}
