import { Component, OnInit } from '@angular/core';
import { Offer } from 'app/shared/model/offer.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PropertyService } from 'app/entities/property/property.service';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';
import { Property } from 'app/shared/model/property.model';

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
  public maximumBid: number | undefined;
  public successfulOffer = 0;
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
    this.maximumBid = 0;
    this.successfulOffer = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idProperty = params['id'];
      this.propertyService.find(this.idProperty).subscribe(response => {
        this.property = response.body as Property;
        if (this.property.sale != null) {
          this.seeAuctionService.geByOffersBySale(this.property.sale?.id as number).subscribe(response => {
            this.offers = response;
            if (this.offers.length > 0) {
              this.maximumBid = this.offers[0]?.amount;
            }
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
}
