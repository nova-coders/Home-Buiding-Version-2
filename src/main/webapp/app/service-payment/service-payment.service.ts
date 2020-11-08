import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { UserAccount } from '../shared/model/user-account.model';
@Injectable({
  providedIn: 'root',
})
export class ServicePaymentService {
  public resourceUrl = SERVER_API_URL + 'api';
  constructor(protected http: HttpClient) {}

  getUserAcoount(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/payment-user-account`, { observe: 'response' });
  }
}
