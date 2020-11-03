import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICanton } from 'app/shared/model/canton.model';

type EntityResponseType = HttpResponse<ICanton>;
type EntityArrayResponseType = HttpResponse<ICanton[]>;

@Injectable({ providedIn: 'root' })
export class CantonService {
  public resourceUrl = SERVER_API_URL + 'api/cantons';

  constructor(protected http: HttpClient) {}

  create(canton: ICanton): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(canton);
    return this.http
      .post<ICanton>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(canton: ICanton): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(canton);
    return this.http
      .put<ICanton>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICanton>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICanton[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(canton: ICanton): ICanton {
    const copy: ICanton = Object.assign({}, canton, {
      creationDate: canton.creationDate && canton.creationDate.isValid() ? canton.creationDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate ? moment(res.body.creationDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((canton: ICanton) => {
        canton.creationDate = canton.creationDate ? moment(canton.creationDate) : undefined;
      });
    }
    return res;
  }
}
