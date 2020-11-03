import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPublishingPackage } from 'app/shared/model/publishing-package.model';

type EntityResponseType = HttpResponse<IPublishingPackage>;
type EntityArrayResponseType = HttpResponse<IPublishingPackage[]>;

@Injectable({ providedIn: 'root' })
export class PublishingPackageService {
  public resourceUrl = SERVER_API_URL + 'api/publishing-packages';

  constructor(protected http: HttpClient) {}

  create(publishingPackage: IPublishingPackage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(publishingPackage);
    return this.http
      .post<IPublishingPackage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(publishingPackage: IPublishingPackage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(publishingPackage);
    return this.http
      .put<IPublishingPackage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPublishingPackage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPublishingPackage[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(publishingPackage: IPublishingPackage): IPublishingPackage {
    const copy: IPublishingPackage = Object.assign({}, publishingPackage, {
      creationDate:
        publishingPackage.creationDate && publishingPackage.creationDate.isValid() ? publishingPackage.creationDate.toJSON() : undefined,
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
      res.body.forEach((publishingPackage: IPublishingPackage) => {
        publishingPackage.creationDate = publishingPackage.creationDate ? moment(publishingPackage.creationDate) : undefined;
      });
    }
    return res;
  }
}
