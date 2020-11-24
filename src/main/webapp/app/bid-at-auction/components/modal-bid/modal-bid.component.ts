import { Component, Input, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { Offer } from 'app/shared/model/offer.model';
import * as moment from 'moment';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { OfferService } from 'app/entities/offer/offer.service';
import { UserAccount } from 'app/shared/model/user-account.model';
import { BidAtAuctionService } from 'app/bid-at-auction/bid-at-auction.service';
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
  constructor(
    public servicePaymentService: ServicePaymentService,
    public offerService: OfferService,
    private bidAtAuctionService: BidAtAuctionService
  ) {
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
      this.offer.sale = this.sale;
      this.saveOffer();
    });
  }
  private saveOffer() {
    this.bidAtAuctionService.saveBidAuction(this.offer).subscribe(
      (response: any) => {
        this.successfulOffer = response;
      },
      error => {
        this.successfulOffer = 3;
        console.log(error);
      }
    );
  }
}
