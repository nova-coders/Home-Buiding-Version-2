import { Moment } from 'moment';
import { ICanton } from 'app/shared/model/canton.model';

export interface IProvince {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  state?: boolean;
  creationDate?: Moment;
  cantons?: ICanton[];
}

export class Province implements IProvince {
  constructor(
    public id?: number,
    public name?: string,
    public latitude?: number,
    public longitude?: number,
    public state?: boolean,
    public creationDate?: Moment,
    public cantons?: ICanton[]
  ) {
    this.state = this.state || false;
  }
}
