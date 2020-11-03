import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProperty } from 'app/shared/model/property.model';

type EntityResponseType = HttpResponse<IProperty>;
type EntityArrayResponseType = HttpResponse<IProperty[]>;

@Injectable({ providedIn: 'root' })
export class PropertyService {
  public resourceUrl = SERVER_API_URL + 'api/properties';

  constructor(protected http: HttpClient) {}

  create(property: IProperty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(property);
    return this.http
      .post<IProperty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(property: IProperty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(property);
    return this.http
      .put<IProperty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProperty>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProperty[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(property: IProperty): IProperty {
    const copy: IProperty = Object.assign({}, property, {
      creationDate: property.creationDate && property.creationDate.isValid() ? property.creationDate.toJSON() : undefined,
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
      res.body.forEach((property: IProperty) => {
        property.creationDate = property.creationDate ? moment(property.creationDate) : undefined;
      });
    }
    return res;
  }
}
