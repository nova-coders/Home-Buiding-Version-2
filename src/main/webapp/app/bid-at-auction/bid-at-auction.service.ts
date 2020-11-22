import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../app.constants';
import { Injectable } from '@angular/core';
import { Offer } from '../shared/model/offer.model';

@Injectable({
  providedIn: 'root',
})
export class BidAtAuctionService {
  public resourceUrl = SERVER_API_URL + 'api';
  constructor(private httpClient: HttpClient) {}
  public saveBidAuction(offer: Offer): Observable<any> {
    return this.httpClient.post(`${this.resourceUrl}/saveBidAuction/`, offer);
  }
}
