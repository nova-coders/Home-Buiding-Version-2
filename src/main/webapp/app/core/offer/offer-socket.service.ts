import { Injectable } from '@angular/core';
import * as Stomp from 'webstomp-client';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { IOffer } from '../../shared/model/offer.model';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { Location } from '@angular/common';
import * as SockJS from 'sockjs-client';
import { Frame } from 'webstomp-client';

@Injectable({
  providedIn: 'root',
})
export class OfferSocketService {
  private stompClient: Stomp.Client | null = null;
  private connectionSubject: ReplaySubject<void> = new ReplaySubject(1);
  private connectionSubscription: Subscription | null = null;
  private stompSubscription: Stomp.Subscription | undefined;
  private listenerSubject: Subject<IOffer> = new Subject();

  constructor(private authServerProvider: AuthServerProvider, private location: Location) {}

  public connect(): void {
    if (this.stompClient && this.stompClient.connected) {
      return;
    }
    // building absolute path so that websocket doesn't fail when deploying with a context path
    let url = '/websocket/tracker';
    url = this.location.prepareExternalUrl(url);
    const authToken = this.authServerProvider.getToken();
    if (authToken) {
      url += '?access_token=' + authToken;
    }
    const socket: WebSocket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const headers: Stomp.ConnectionHeaders = {};
    this.stompClient.connect(headers, (frame: Frame | undefined) => {
      this.connectionSubject.next();
    });
  }

  disconnect(): void {
    this.unsubscribe();
    this.connectionSubject = new ReplaySubject(1);
    if (this.stompClient) {
      if (this.stompClient.connected) {
        this.stompClient.disconnect();
      }
      this.stompClient = null;
    }
  }

  receive(): Subject<IOffer> {
    return this.listenerSubject;
  }
  subscribe(): void {
    if (this.connectionSubscription) {
      return;
    }
    this.connectionSubscription = this.connectionSubject.subscribe(() => {
      if (this.stompClient) {
        setTimeout(() => {
          this.stompSubscription = this.stompClient?.subscribe('/topic/new-offer', (data: Stomp.Message) => {
            this.listenerSubject.next(JSON.parse(data.body));
          });
        }, 3000); //wait 3 seconds
      }
    });
  }
  unsubscribe(): void {
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
      this.connectionSubscription = null;
    }
  }
  public sendOffer(offerId: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        '/topic/offer', // destination
        offerId, // body
        {} // header
      );
    }
  }
}
