import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserAccount } from 'app/shared/model/user-account.model';

type EntityResponseType = HttpResponse<IUserAccount>;
type EntityArrayResponseType = HttpResponse<IUserAccount[]>;

@Injectable({ providedIn: 'root' })
export class UserAccountService {
  public resourceUrl = SERVER_API_URL + 'api/user-accounts';

  constructor(protected http: HttpClient) {}

  create(userAccount: IUserAccount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userAccount);
    return this.http
      .post<IUserAccount>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(userAccount: IUserAccount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userAccount);
    return this.http
      .put<IUserAccount>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserAccount[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(userAccount: IUserAccount): IUserAccount {
    const copy: IUserAccount = Object.assign({}, userAccount, {
      birthdate: userAccount.birthdate && userAccount.birthdate.isValid() ? userAccount.birthdate.toJSON() : undefined,
      creationDate: userAccount.creationDate && userAccount.creationDate.isValid() ? userAccount.creationDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthdate = res.body.birthdate ? moment(res.body.birthdate) : undefined;
      res.body.creationDate = res.body.creationDate ? moment(res.body.creationDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((userAccount: IUserAccount) => {
        userAccount.birthdate = userAccount.birthdate ? moment(userAccount.birthdate) : undefined;
        userAccount.creationDate = userAccount.creationDate ? moment(userAccount.creationDate) : undefined;
      });
    }
    return res;
  }
}
