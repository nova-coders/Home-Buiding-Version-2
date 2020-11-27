import { Component, Input, AfterViewInit, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Offer } from 'app/shared/model/offer.model';
import * as moment from 'moment';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { OfferService } from 'app/entities/offer/offer.service';
import { BidAtAuctionService } from 'app/bid-at-auction/bid-at-auction.service';
import { OfferSocketService } from 'app/core/offer/offer-socket.service';
import { Notification } from 'app/shared/model/notification.model';
import { formatCurrency } from '@angular/common';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';
import { NotificationSocketService } from 'app/core/notification/notificationSocket.service';
import { NotificationService } from 'app/entities/notification/notification.service';
@Component({
  selector: 'jhi-modal-bid',
  templateUrl: './modal-bid.component.html',
  styleUrls: ['./modal-bid.component.scss'],
})
export class ModalBidComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() maximumBid: any = 0;
  @Input() offers: any;
  @Input() sale: any;
  @Input() property: any;
  @Input() currenValue: any = 0;
  public successfulOffer = 0;
  public offer: any;
  public hasError = false;
  constructor(
    public servicePaymentService: ServicePaymentService,
    public offerService: OfferService,
    private bidAtAuctionService: BidAtAuctionService,
    private offerSocketService: OfferSocketService,
    private notificationSocketService: NotificationSocketService,
    private notificationService: NotificationService
  ) {
    this.offer = new Offer();
    this.offer.commentary = 'Sin comentario';
    this.offer.state = true;
    this.offer.date = moment();
  }
  ngAfterViewInit(): void {
    this.offer.amount = this.maximumBid;
  }
  ngOnInit(): void {
    this.offerSocketService.connect();
    this.offerSocketService.subscribe();
    this.notificationSocketService.connect();
  }
  public sendOffer(): void {
    if (this.offer.amount > this.maximumBid) {
      this.hasError = false;
      this.successfulOffer = 0;
      this.offer.date = moment();
      this.processOffer();
    } else {
      this.hasError = true;
    }
  }
  public processOffer(): void {
    if (this.currenValue < this.offer.amount) {
      this.servicePaymentService.getUserAccount().subscribe((response: any) => {
        this.offer.userAccount = response.body;
        this.offer.sale = this.sale;
        this.saveOffer();
      });
    } else {
      this.successfulOffer = 5;
    }
  }
  private saveOffer() {
    this.bidAtAuctionService.saveBidAuction(this.offer).subscribe(
      (response: any) => {
        if (response.length === 2) {
          this.successfulOffer = response[1];
          this.offerSocketService.sendOffer('' + response[0].id);
          if (this.successfulOffer === 1) {
            this.offer = response[0];
            if (this.offers[0]?.userAccount?.id != this.offer.userAccount.id && this.offers.length > 0) {
              let notification = new Notification();
              notification.receptor = this.offers[0].userAccount;
              notification.title = 'Oferta superada';
              notification.message =
                'Su oferta de ' +
                formatCurrency(this.offers[0]?.amount || 0, 'en-cr', '₡', 'CR', '2.0-0') +
                ' fue rebasada en la subasta ' +
                '<a href=' +
                '"' +
                '/bit-at-auction/' +
                this.property.id +
                '"' +
                '>' +
                this.property.title +
                '.' +
                '</a>';
              notification.creationDate = moment();
              notification.type = NotificationType.Subasta;
              notification.state = true;
              console.log(notification);

              this.notificationService.create(notification).subscribe((response: any) => {
                notification = response.body;
                console.log(response);

                //return this.notificationSocketService.sendNotification('' + notification.id);
              });
            }
          }
        } else {
          this.successfulOffer = response[0];
        }
      },
      error => {
        this.successfulOffer = 3;
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.offerSocketService.disconnect();
    this.notificationSocketService.disconnect();
  }
}
