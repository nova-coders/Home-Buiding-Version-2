import { Moment } from 'moment';
import { IProperty } from 'app/shared/model/property.model';
import { IProvince } from 'app/shared/model/province.model';

export interface ICanton {
  id?: number;
  name?: string;
  state?: boolean;
  creationDate?: Moment;
  properties?: IProperty[];
  province?: IProvince;
}

export class Canton implements ICanton {
  constructor(
    public id?: number,
    public name?: string,
    public state?: boolean,
    public creationDate?: Moment,
    public properties?: IProperty[],
    public province?: IProvince
  ) {
    this.state = this.state || false;
  }
}
