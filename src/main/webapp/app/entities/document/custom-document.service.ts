import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../app.constants';
import { Observable } from 'rxjs';
import { IDocument } from '../../shared/model/document.model';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

type EntityResponseType = HttpResponse<IDocument>;

@Injectable({
  providedIn: 'root',
})
export class CustomDocumentService {
  public resourceUrl = SERVER_API_URL + 'api/custom-document-resource';

  constructor(private http: HttpClient) {}

  getDocumentByPropertyId(propertyId: number): Observable<EntityResponseType> {
    return this.http
      .get<IDocument>(this.resourceUrl + '/get-document-by-property-id/' + propertyId, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getDocumentIdByUserIdAndPropertyId(userId: number | undefined, propertyId: number | undefined): Observable<HttpResponse<number>> {
    return this.http
      .get<number>(this.resourceUrl + '/get-document-id-by-user-id-and-property-id/' + userId + '&' + propertyId, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<number>) => {
          return res;
        })
      );
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate ? moment(res.body.creationDate) : undefined;
    }
    return res;
  }
}
