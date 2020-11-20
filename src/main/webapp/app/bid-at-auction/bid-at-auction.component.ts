import { Component, OnInit } from '@angular/core';
import { Property } from 'app/shared/model/property.model';
import { Offer } from 'app/shared/model/offer.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PropertyService } from 'app/entities/property/property.service';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';
import { Notification } from 'app/shared/model/notification.model';
import * as moment from 'moment';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';

@Component({
  selector: 'jhi-bid-at-auction',
  templateUrl: './bid-at-auction.component.html',
  styleUrls: ['./bid-at-auction.component.scss'],
})
export class BidAtAuctionComponent implements OnInit {
  public property: any;
  public idProperty: number;
  public offers: Array<Offer> = [];
  public images: string[];
  public startPage = 1;
  public actualPrice = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private seeAuctionService: SeeAuctionService
  ) {
    this.property = new Property();
    this.idProperty = -1;
    this.offers = [];
    this.images = [];
  }

  ngOnInit(): void {
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
  }
  public closeAuction(): void {
    const opcion = confirm(
      '¿ Se guro de cerar la subasta ' +
        this.property.userAccount?.user?.login +
        ' ' +
        this.property.userAccount?.user?.firstName +
        ' ' +
        this.property.userAccount?.user?.lastName +
        ' ?'
    );
    if (opcion == true) {
      this.setAuctionToCloseState();
      //this.notifyClients();
    } else {
    }
  }
  private setAuctionToCloseState(): void {
    this.seeAuctionService.auctionToCloseState(this.idProperty).subscribe(
      (response: any) => {
        this.property.state = 3;
        //this.goDocument(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  private notifyClients(): void {
    if (this.offers.length > 0) {
      let notification = new Notification();
      notification.title = 'La subasta se ha cerrado';
      notification.message = 'La subasta a la que asistia fue cerrada';
      notification.receptor = this.offers[0].userAccount;
      notification.state = false;
      notification.creationDate = moment();
      notification.type = NotificationType.Alquiler;
    }
  }
  private goDocument(idDocumen: number): void {
    this.router.navigate(['/document/', idDocumen]);
  }
}
