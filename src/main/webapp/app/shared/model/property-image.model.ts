import { Moment } from 'moment';
import { IProperty } from 'app/shared/model/property.model';
import { IImageCategory } from 'app/shared/model/image-category.model';

export interface IPropertyImage {
  id?: number;
  url?: string;
  creationDate?: Moment;
  state?: boolean;
  property?: IProperty;
  imageCategory?: IImageCategory;
}

export class PropertyImage implements IPropertyImage {
  constructor(
    public id?: number,
    public url?: string,
    public creationDate?: Moment,
    public state?: boolean,
    public property?: IProperty,
    public imageCategory?: IImageCategory
  ) {
    this.state = this.state || false;
  }
}
