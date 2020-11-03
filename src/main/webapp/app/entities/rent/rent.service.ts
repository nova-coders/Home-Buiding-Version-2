import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRent } from 'app/shared/model/rent.model';

type EntityResponseType = HttpResponse<IRent>;
type EntityArrayResponseType = HttpResponse<IRent[]>;

@Injectable({ providedIn: 'root' })
export class RentService {
  public resourceUrl = SERVER_API_URL + 'api/rents';

  constructor(protected http: HttpClient) {}

  create(rent: IRent): Observable<EntityResponseType> {
    return this.http.post<IRent>(this.resourceUrl, rent, { observe: 'response' });
  }

  update(rent: IRent): Observable<EntityResponseType> {
    return this.http.put<IRent>(this.resourceUrl, rent, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
