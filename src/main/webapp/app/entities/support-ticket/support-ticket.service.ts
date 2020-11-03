import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISupportTicket } from 'app/shared/model/support-ticket.model';

type EntityResponseType = HttpResponse<ISupportTicket>;
type EntityArrayResponseType = HttpResponse<ISupportTicket[]>;

@Injectable({ providedIn: 'root' })
export class SupportTicketService {
  public resourceUrl = SERVER_API_URL + 'api/support-tickets';

  constructor(protected http: HttpClient) {}

  create(supportTicket: ISupportTicket): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supportTicket);
    return this.http
      .post<ISupportTicket>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(supportTicket: ISupportTicket): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supportTicket);
    return this.http
      .put<ISupportTicket>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISupportTicket>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISupportTicket[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(supportTicket: ISupportTicket): ISupportTicket {
    const copy: ISupportTicket = Object.assign({}, supportTicket, {
      creationDate: supportTicket.creationDate && supportTicket.creationDate.isValid() ? supportTicket.creationDate.toJSON() : undefined,
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
      res.body.forEach((supportTicket: ISupportTicket) => {
        supportTicket.creationDate = supportTicket.creationDate ? moment(supportTicket.creationDate) : undefined;
      });
    }
    return res;
  }
}
