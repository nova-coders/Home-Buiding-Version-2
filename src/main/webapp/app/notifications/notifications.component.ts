import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from 'app/notifications/notification.service';
import { NotificationSocketService } from 'app/core/notification/notificationSocket.service';
import { Notification } from 'app/shared/model/notification.model';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { UserAccount } from 'app/shared/model/user-account.model';
import * as moment from 'moment';
@Component({
  selector: 'jhi-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy, AfterViewInit {
  public notifications: INotification[];
  public userAccount: UserAccount;
  constructor(
    protected notificationService: NotificationService,
    private notificationSocketService: NotificationSocketService,
    private servicePaymentService: ServicePaymentService
  ) {
    this.notifications = [];
    this.userAccount = new UserAccount();
  }

  ngOnInit(): void {
    this.notificationSocketService.connect();
    this.notificationSocketService.subscribe();
    this.notificationService.getNotificationsByUserReceptor().subscribe((response: Notification[]) => {
      this.notifications = response || [];
    });
    this.servicePaymentService.getUserAccount().subscribe((response: any) => {
      this.userAccount = response.body;
    });
    this.notificationSocketService.receive().subscribe((notification: Notification) => {
      if (this.notifications.length > 0) {
        if (this.notifications[0].id != notification.id && this.userAccount.id === notification.receptor?.id) {
          this.notifications.unshift(notification);
        }
      } else {
        if (this.userAccount.id === notification.receptor?.id && this.notifications.length === 0) {
          this.notifications.unshift(notification);
        }
      }
    });
  }

  public isNew(creationDate: any): boolean {
    const currenDate = moment();
    const diff = currenDate.diff(creationDate, 'days');
    if (diff < 2) {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.notificationSocketService.disconnect();
  }

  ngAfterViewInit(): void {}
}
