import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISupportTicketLog } from 'app/shared/model/support-ticket-log.model';

type EntityResponseType = HttpResponse<ISupportTicketLog>;
type EntityArrayResponseType = HttpResponse<ISupportTicketLog[]>;

@Injectable({ providedIn: 'root' })
export class SupportTicketLogService {
  public resourceUrl = SERVER_API_URL + 'api/support-ticket-logs';

  constructor(protected http: HttpClient) {}

  create(supportTicketLog: ISupportTicketLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supportTicketLog);
    return this.http
      .post<ISupportTicketLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(supportTicketLog: ISupportTicketLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supportTicketLog);
    return this.http
      .put<ISupportTicketLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISupportTicketLog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISupportTicketLog[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(supportTicketLog: ISupportTicketLog): ISupportTicketLog {
    const copy: ISupportTicketLog = Object.assign({}, supportTicketLog, {
      creationDate:
        supportTicketLog.creationDate && supportTicketLog.creationDate.isValid() ? supportTicketLog.creationDate.toJSON() : undefined,
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
      res.body.forEach((supportTicketLog: ISupportTicketLog) => {
        supportTicketLog.creationDate = supportTicketLog.creationDate ? moment(supportTicketLog.creationDate) : undefined;
      });
    }
    return res;
  }
}
