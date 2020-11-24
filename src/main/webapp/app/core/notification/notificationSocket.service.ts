import { Injectable } from '@angular/core';
import * as Stomp from 'webstomp-client';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { Location } from '@angular/common';
import * as SockJS from 'sockjs-client';
import { Frame } from 'webstomp-client';
import { INotification } from 'app/shared/model/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  private stompClient: Stomp.Client | null = null;
  private connectionSubject: ReplaySubject<void> = new ReplaySubject(1);
  private connectionSubscription: Subscription | null = null;
  private stompSubscription: Stomp.Subscription | null = null;
  private listenerSubject: Subject<INotification> = new Subject();

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
      console.log(frame);
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

  receive(): Subject<INotification> {
    return this.listenerSubject;
  }
  subscribe(): void {
    if (this.connectionSubscription) {
      return;
    }
    this.connectionSubscription = this.connectionSubject.subscribe(() => {
      if (this.stompClient) {
        this.stompSubscription = this.stompClient.subscribe('/topic/inbox', (data: Stomp.Message) => {
          console.log(data);
          this.listenerSubject.next(JSON.parse(data.body));
        });
      }
    });
  }
  unsubscribe(): void {
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
      this.connectionSubscription = null;
    }
  }
  public sendNotification(notificationId: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        '/topic/notification', // destination
        notificationId, // body
        {} // header
      );
    }
  }
}
