import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOffer } from '../shared/model/offer.model';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

type EntityArrayResponseType = HttpResponse<IOffer[]>;

@Injectable({
  providedIn: 'root',
})
export class CustomOfferService {
  public resourceUrl = SERVER_API_URL + 'api/custom-offer-resource';
  constructor(private http: HttpClient) {}

  getOffersByUserAccount(id: number | undefined): Observable<EntityArrayResponseType> {
    return this.http
      .get<IOffer[]>(this.resourceUrl + '/get-offer-by-user/' + id, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((offer: IOffer) => {
        offer.date = offer.date ? moment(offer.date) : undefined;
      });
    }
    return res;
  }
}
