import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { IProperty, Property } from '../shared/model/property.model';

type EntityResponseType = HttpResponse<IProperty>;

@Injectable({
  providedIn: 'root',
})
export class CustomPropertyService {
  public resourceUrl = SERVER_API_URL + 'api/custom-property-resource';

  constructor(private http: HttpClient) {}

  getPropertyBySaleId(saleId: number): Observable<EntityResponseType> {
    return this.http
      .get<IProperty>(this.resourceUrl + '/get-property-by-sale-id/' + saleId, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getPropertiesInSaleByUserId(userId: number): Observable<any> {
    console.log('THIS IS THE ID OF THE USER: ', userId);
    return this.http.get(this.resourceUrl + '/get-properties-in-sales-by-Userid/' + userId);
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate ? moment(res.body.creationDate) : undefined;
    }
    return res;
  }
}
