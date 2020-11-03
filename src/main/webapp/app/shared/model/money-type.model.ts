import { IProperty } from 'app/shared/model/property.model';

export interface IMoneyType {
  id?: number;
  icon?: string;
  name?: string;
  state?: boolean;
  properties?: IProperty[];
}

export class MoneyType implements IMoneyType {
  constructor(public id?: number, public icon?: string, public name?: string, public state?: boolean, public properties?: IProperty[]) {
    this.state = this.state || false;
  }
}
