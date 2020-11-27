import { Moment } from 'moment';
import { IOffer } from 'app/shared/model/offer.model';
import { IProperty } from 'app/shared/model/property.model';

export interface ISale {
  id?: number;
  finalDate?: Moment;
  cadastralPlan?: any;
  registryStudy?: any;
  propertyId?: number;
  offers?: IOffer[];
  property?: IProperty;
}

export class Sale implements ISale {
  constructor(
    public id?: number,
    public finalDate?: Moment,
    public cadastralPlan?: any,
    public registryStudy?: any,
    public propertyId?: number,
    public offers?: IOffer[],
    public property?: IProperty
  ) {}
}
