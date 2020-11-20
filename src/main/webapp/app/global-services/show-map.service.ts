import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ShowMapService {
  public resourceUrl = SERVER_API_URL + 'api';
  constructor(protected http: HttpClient) {}

  getByProvince(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/provinces?_sort=id&_order=asc`);
  }
}
