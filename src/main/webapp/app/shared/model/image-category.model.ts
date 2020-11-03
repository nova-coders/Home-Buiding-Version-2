import { IPropertyImage } from 'app/shared/model/property-image.model';

export interface IImageCategory {
  id?: number;
  name?: string;
  propertyImages?: IPropertyImage[];
}

export class ImageCategory implements IImageCategory {
  constructor(public id?: number, public name?: string, public propertyImages?: IPropertyImage[]) {}
}
