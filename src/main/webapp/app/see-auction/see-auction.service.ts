import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../app.constants';
@Injectable({
  providedIn: 'root',
})
export class SeeAuctionService {
  public resourceUrl = SERVER_API_URL + 'api';
  constructor(private httpClient: HttpClient) {}

  public geByOffersBySale(idsale: number): Observable<any> {
    return this.httpClient.get(`${this.resourceUrl}/offerby-sale/${idsale}`);
  }
  public auctionToCloseState(idproperty: number): Observable<any> {
    return this.httpClient.get(`${this.resourceUrl}/closeauction/${idproperty}`);
  }
  public getAuctionImgs(idproperty: number): Observable<any> {
    return this.httpClient.get(`${this.resourceUrl}/getauctionimg/${idproperty}`);
  }
}
