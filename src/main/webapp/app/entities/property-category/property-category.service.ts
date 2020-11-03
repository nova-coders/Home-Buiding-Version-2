import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPropertyCategory } from 'app/shared/model/property-category.model';

type EntityResponseType = HttpResponse<IPropertyCategory>;
type EntityArrayResponseType = HttpResponse<IPropertyCategory[]>;

@Injectable({ providedIn: 'root' })
export class PropertyCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/property-categories';

  constructor(protected http: HttpClient) {}

  create(propertyCategory: IPropertyCategory): Observable<EntityResponseType> {
    return this.http.post<IPropertyCategory>(this.resourceUrl, propertyCategory, { observe: 'response' });
  }

  update(propertyCategory: IPropertyCategory): Observable<EntityResponseType> {
    return this.http.put<IPropertyCategory>(this.resourceUrl, propertyCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPropertyCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPropertyCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
