import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class DeleteAuctionService {
  public resourceUrl = SERVER_API_URL + 'api';
  constructor(private httpClient: HttpClient) {}
  public auctionToDeleteState(idproperty: number): Observable<any> {
    return this.httpClient.get(`${this.resourceUrl}/deleteauction/${idproperty}`);
  }
}
