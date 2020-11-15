import { Moment } from 'moment';
import { ICanton } from 'app/shared/model/canton.model';

export interface IProvince {
  id?: number;
  name?: string;
  latitude?: string;
  longitude?: string;
  state?: boolean;
  creationDate?: Moment;
  cantons?: ICanton[];
}

export class Province implements IProvince {
  constructor(
    public id?: number,
    public name?: string,
    public latitude?: string,
    public longitude?: string,
    public state?: boolean,
    public creationDate?: Moment,
    public cantons?: ICanton[]
  ) {
    this.state = this.state || false;
  }
}
