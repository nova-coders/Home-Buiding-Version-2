import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Property } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property/property.service';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';
import { Offer } from 'app/shared/model/offer.model';
import { Router } from '@angular/router';
import { NotificationSocketService } from 'app/core/notification/notificationSocket.service';
import { NotificationService } from 'app/entities/notification/notification.service';
import { Notification } from 'app/shared/model/notification.model';
import * as moment from 'moment';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';
import { OfferSocketService } from 'app/core/offer/offer-socket.service';
import { UserAccount } from 'app/shared/model/user-account.model';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
@Component({
  selector: 'jhi-see-auction',
  templateUrl: './see-auction.component.html',
  styleUrls: ['./see-auction.component.scss'],
})
export class SeeAuctionComponent implements OnInit, OnDestroy {
  public property: Property;
  public idProperty: number;
  public offers: Array<Offer> = [];
  public images: string[];
  public startPage = 1;
  public idDocumen = 0;
  public userAccount: UserAccount;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private seeAuctionService: SeeAuctionService,
    private offerSocketService: OfferSocketService,
    private notificationSocketService: NotificationSocketService,
    private notificationService: NotificationService,
    private servicePaymentService: ServicePaymentService
  ) {
    this.property = new Property();
    this.idProperty = -1;
    this.offers = [];
    this.images = [];
    this.userAccount = new UserAccount();
  }

  ngOnInit(): void {
    this.servicePaymentService.getUserAccount().subscribe((response: any) => {
      this.userAccount = response.body;
    });
    this.offerSocketService.connect();
    this.offerSocketService.subscribe();
    this.notificationSocketService.connect();
    this.route.params.subscribe((params: Params) => {
      this.idProperty = params['id'];
      this.propertyService.find(this.idProperty).subscribe(response => {
        this.property = response.body as Property;
        if (this.property.sale != null) {
          this.seeAuctionService.geByOffersBySale(this.property.sale?.id as number).subscribe(response => {
            this.offers = response;
          });
          this.seeAuctionService.getAuctionImgs(this.property.id as number).subscribe(response => {
            response.forEach((value: any) => {
              this.images.push(value.url);
            });
          });
        }
      });
    });
    this.offerSocketService.receive().subscribe((offer: Offer) => {
      if (this.property?.sale?.id === offer?.sale?.id) {
        if (offer.id != this.offers[0].id) {
          this.offers.unshift(offer);
        }
      }
    });
  }
  public closeAuction(): void {
    this.setAuctionToCloseState();
    this.notifyClients();
  }
  private setAuctionToCloseState(): void {
    this.seeAuctionService.auctionToCloseState(this.idProperty).subscribe(
      (response: any) => {
        this.property.state = 3;
        if (response === -1) {
        } else {
          this.goDocument(response);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  private notifyClients(): void {
    if (this.offers.length > 0) {
      let notification = new Notification();
      notification.title = 'Oferta aceptada';
      notification.message =
        'He  aceptado su oferta en al subasta ' +
        this.property.title +
        '. El ' +
        '<a  href=' +
        '"' +
        '/document/' +
        this.idDocumen +
        '"' +
        '>' +
        'Documento del contranto' +
        '</a>' +
        ' estaria pediente de su firma.';
      notification.receptor = this.offers[0].userAccount;
      notification.transmitter = this.property.userAccount;
      notification.state = false;
      notification.creationDate = moment();
      notification.type = NotificationType.Alquiler;
      this.notificationService.create(notification).subscribe((response: any) => {
        notification = response.body;
        return this.notificationSocketService.sendNotification('' + notification.id);
      });
    }
  }
  private goDocument(idDocumen: number): void {
    this.idDocumen = idDocumen;
    this.router.navigate(['/document/', idDocumen]);
  }

  ngOnDestroy(): void {
    this.offerSocketService.disconnect();
    this.notificationSocketService.disconnect();
  }
  public acept($event: any): void {
    const acept = $event;
    if (acept === true) {
      this.closeAuction();
    }
  }
}
