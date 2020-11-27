import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProperty } from 'app/shared/model/property.model';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

type EntityArrayResponseType = HttpResponse<IProperty[]>;

@Injectable({ providedIn: 'root' })
export class ShowMapService {
  public resourceUrl = SERVER_API_URL + 'api/properties/sale';
  constructor(protected http: HttpClient) {}

  getByProvince(): Observable<any> {
    return this.http.get(`${this.resourceUrl}`, { observe: 'response' });
  }
  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((property: IProperty) => {
        property.creationDate = property.creationDate ? moment(property.creationDate) : undefined;
      });
    }
    return res;
  }
}
