import { Component, Input, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { Offer } from 'app/shared/model/offer.model';
import * as moment from 'moment';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { OfferService } from 'app/entities/offer/offer.service';
import { UserAccount } from 'app/shared/model/user-account.model';
@Component({
  selector: 'jhi-modal-bid',
  templateUrl: './modal-bid.component.html',
  styleUrls: ['./modal-bid.component.scss'],
})
export class ModalBidComponent implements OnInit, AfterViewInit {
  @Input() maximumBid: any = 0;
  @Input() offers: any;
  @Input() sale: any;
  public successfulOffer = 0;
  public offer: any;
  public hasError = false;
  constructor(public servicePaymentService: ServicePaymentService, public offerService: OfferService) {
    this.offer = new Offer();
    this.offer.commentary = 'Sin comentario';
    this.offer.state = true;
    this.offer.date = moment();
  }

  ngAfterViewInit(): void {
    this.offer.amount = this.maximumBid;
  }

  ngOnInit(): void {}
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
    this.servicePaymentService.getUserAccount().subscribe((response: any) => {
      this.offer.userAccount = response.body;
      console.log(this.offer.userAccount);
      this.offer.sale = this.sale;
      if (this.offers.length > 0) {
        if (this.offers[0]?.userAccount?.id != this.offer.userAccount.id) {
          this.saveOffer();
        } else {
          this.successfulOffer = 2;
        }
      } else {
        this.saveOffer();
      }
    });
  }
  private saveOffer() {
    this.offerService.create(this.offer).subscribe(
      (response: any) => {
        this.successfulOffer = 1;
        this.offer = response;
      },
      error => {
        this.successfulOffer = 3;
        console.log(error);
      }
    );
  }
}
