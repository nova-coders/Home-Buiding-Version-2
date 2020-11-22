import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationSocketService } from 'app/core/notification/notificationSocket.service';
import { NotificationService } from 'app/entities/notification/notification.service';
import { UserAccount } from 'app/shared/model/user-account.model';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';
import * as moment from 'moment';
import { Notification } from 'app/shared/model/notification.model';

@Component({
  selector: 'jhi-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public message: string;
  constructor(private NotificationSocketService: NotificationSocketService, private notificationService: NotificationService) {
    this.message = '';
  }
  ngOnInit(): void {
    this.NotificationSocketService.connect();
  }
  public sendMessage(): void {
    let transmitter = new UserAccount();
    transmitter.id = 2;
    let receptor = new UserAccount();
    receptor.id = 1;
    let notification: Notification = {
      title: 'Mensaje de prueba',
      message: this.message,
      state: true,
      type: NotificationType.Soporte,
      creationDate: moment(),
      transmitter: transmitter,
      receptor: receptor,
    };
    this.notificationService.create(notification).subscribe((response: any) => {
      notification = response.body;
      return this.NotificationSocketService.sendNotification('' + notification.id);
    });
  }
  ngOnDestroy(): void {
    this.NotificationSocketService.disconnect();
  }
}
