import { IScore } from 'app/shared/model/score.model';
import { IProperty } from 'app/shared/model/property.model';

export interface IRent {
  id?: number;
  deposit?: number;
  scores?: IScore[];
  property?: IProperty;
}

export class Rent implements IRent {
  constructor(public id?: number, public deposit?: number, public scores?: IScore[], public property?: IProperty) {}
}
