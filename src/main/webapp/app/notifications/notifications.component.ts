import { Component, OnInit } from '@angular/core';
import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from 'app/notifications/notification.service';

@Component({
  selector: 'jhi-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  public notifications: INotification[];
  constructor(protected notificationService: NotificationService) {
    this.notifications = [];
  }

  ngOnInit(): void {
    this.notificationService.getNotificationsByUserReceptor().subscribe((response: any) => {
      this.notifications = response || [];
    });
  }
}
