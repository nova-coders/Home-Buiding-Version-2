import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProperty } from '../shared/model/property.model';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<boolean>;
@Injectable({
  providedIn: 'root',
})
export class CustomSaleService {
  public resourceUrl = SERVER_API_URL + 'api/custom-sale-resource';

  constructor(private http: HttpClient) {}

  isPropertySale(propertyId: number | undefined): Observable<EntityResponseType> {
    return this.http
      .get<boolean>(this.resourceUrl + '/is-property-sale/' + propertyId, { observe: 'response' })
      .pipe(
        map((res: EntityResponseType) => {
          return res;
        })
      );
  }
}
