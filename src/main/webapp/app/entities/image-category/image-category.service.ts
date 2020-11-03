import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IImageCategory } from 'app/shared/model/image-category.model';

type EntityResponseType = HttpResponse<IImageCategory>;
type EntityArrayResponseType = HttpResponse<IImageCategory[]>;

@Injectable({ providedIn: 'root' })
export class ImageCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/image-categories';

  constructor(protected http: HttpClient) {}

  create(imageCategory: IImageCategory): Observable<EntityResponseType> {
    return this.http.post<IImageCategory>(this.resourceUrl, imageCategory, { observe: 'response' });
  }

  update(imageCategory: IImageCategory): Observable<EntityResponseType> {
    return this.http.put<IImageCategory>(this.resourceUrl, imageCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IImageCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IImageCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
