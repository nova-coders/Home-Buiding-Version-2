import { IProperty } from 'app/shared/model/property.model';

export interface IPropertyCategory {
  id?: number;
  name?: string;
  propertyType?: string;
  state?: boolean;
  properties?: IProperty[];
}

export class PropertyCategory implements IPropertyCategory {
  constructor(
    public id?: number,
    public name?: string,
    public propertyType?: string,
    public state?: boolean,
    public properties?: IProperty[]
  ) {
    this.state = this.state || false;
  }
}
