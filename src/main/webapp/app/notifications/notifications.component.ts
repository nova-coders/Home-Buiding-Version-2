import { Component, OnInit, OnDestroy } from '@angular/core';
import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from 'app/notifications/notification.service';
import { NotificationSocketService } from 'app/core/notification/notificationSocket.service';
import { Notification } from 'app/shared/model/notification.model';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { UserAccount } from 'app/shared/model/user-account.model';

@Component({
  selector: 'jhi-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
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
    this.servicePaymentService.getUserAccount().subscribe((response: UserAccount) => {
      this.userAccount = response;
    });
    this.notificationSocketService.receive().subscribe((response: Notification) => {
      console.log(this.userAccount.id);
      console.log(response);
      if (this.notifications.length > 0) {
        if (this.notifications[0].id != response.id && this.userAccount.id === response.receptor?.id) {
          this.notifications.unshift(response);
        }
      } else {
        if (this.userAccount.id === response.receptor?.id && this.notifications.length === 0) {
          this.notifications.unshift(response);
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.notificationSocketService.disconnect();
  }
}
