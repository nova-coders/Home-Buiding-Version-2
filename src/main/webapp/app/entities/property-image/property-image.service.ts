import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPropertyImage } from 'app/shared/model/property-image.model';

type EntityResponseType = HttpResponse<IPropertyImage>;
type EntityArrayResponseType = HttpResponse<IPropertyImage[]>;

@Injectable({ providedIn: 'root' })
export class PropertyImageService {
  public resourceUrl = SERVER_API_URL + 'api/property-images';

  constructor(protected http: HttpClient) {}

  create(propertyImage: IPropertyImage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(propertyImage);
    return this.http
      .post<IPropertyImage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(propertyImage: IPropertyImage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(propertyImage);
    return this.http
      .put<IPropertyImage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPropertyImage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPropertyImage[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(propertyImage: IPropertyImage): IPropertyImage {
    const copy: IPropertyImage = Object.assign({}, propertyImage, {
      creationDate: propertyImage.creationDate && propertyImage.creationDate.isValid() ? propertyImage.creationDate.toJSON() : undefined,
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
      res.body.forEach((propertyImage: IPropertyImage) => {
        propertyImage.creationDate = propertyImage.creationDate ? moment(propertyImage.creationDate) : undefined;
      });
    }
    return res;
  }
}
