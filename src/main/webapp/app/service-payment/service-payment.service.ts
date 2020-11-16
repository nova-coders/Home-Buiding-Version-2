import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
@Injectable({
  providedIn: 'root',
})
export class ServicePaymentService {
  public resourceUrl = SERVER_API_URL + 'api';
  constructor(protected http: HttpClient) {}

  getUserAcoount(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/payment-user-account`, { observe: 'response' });
  }
  assignPackageToUser(packegeid: number, userid: number): Observable<any> {
    return this.http.get(`${this.resourceUrl}/payment-user-account/${packegeid}/${userid}`);
  }
}
