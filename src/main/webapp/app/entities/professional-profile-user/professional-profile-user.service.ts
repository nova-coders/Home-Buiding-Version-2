import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';

type EntityResponseType = HttpResponse<IProfessionalProfileUser>;
type EntityArrayResponseType = HttpResponse<IProfessionalProfileUser[]>;

@Injectable({ providedIn: 'root' })
export class ProfessionalProfileUserService {
  public resourceUrl = SERVER_API_URL + 'api/professional-profile-users';

  constructor(protected http: HttpClient) {}

  create(professionalProfileUser: IProfessionalProfileUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professionalProfileUser);
    return this.http
      .post<IProfessionalProfileUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(professionalProfileUser: IProfessionalProfileUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professionalProfileUser);
    return this.http
      .put<IProfessionalProfileUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfessionalProfileUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfessionalProfileUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(professionalProfileUser: IProfessionalProfileUser): IProfessionalProfileUser {
    const copy: IProfessionalProfileUser = Object.assign({}, professionalProfileUser, {
      creationDate:
        professionalProfileUser.creationDate && professionalProfileUser.creationDate.isValid()
          ? professionalProfileUser.creationDate.toJSON()
          : undefined,
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
      res.body.forEach((professionalProfileUser: IProfessionalProfileUser) => {
        professionalProfileUser.creationDate = professionalProfileUser.creationDate
          ? moment(professionalProfileUser.creationDate)
          : undefined;
      });
    }
    return res;
  }
}
