import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMoneyType } from 'app/shared/model/money-type.model';

type EntityResponseType = HttpResponse<IMoneyType>;
type EntityArrayResponseType = HttpResponse<IMoneyType[]>;

@Injectable({ providedIn: 'root' })
export class MoneyTypeService {
  public resourceUrl = SERVER_API_URL + 'api/money-types';

  constructor(protected http: HttpClient) {}

  create(moneyType: IMoneyType): Observable<EntityResponseType> {
    return this.http.post<IMoneyType>(this.resourceUrl, moneyType, { observe: 'response' });
  }

  update(moneyType: IMoneyType): Observable<EntityResponseType> {
    return this.http.put<IMoneyType>(this.resourceUrl, moneyType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMoneyType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMoneyType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
