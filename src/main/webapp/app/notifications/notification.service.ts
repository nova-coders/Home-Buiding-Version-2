import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../app.constants';
import { Notification } from 'app/shared/model/notification.model';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public resourceUrl = SERVER_API_URL + 'api';
  constructor(private httpClient: HttpClient) {}
  public getNotificationsByUserReceptor(): Observable<any> {
    return this.httpClient.get(`${this.resourceUrl}/usernotifications`);
  }

  public getNotification(notificationId: number): Observable<any> {
    return this.httpClient.get(`${this.resourceUrl}/getnotification/${notificationId}`);
  }
}
