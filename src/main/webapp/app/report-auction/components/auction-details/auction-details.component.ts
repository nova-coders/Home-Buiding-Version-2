import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Property } from 'app/shared/model/property.model';
import { Offer } from 'app/shared/model/offer.model';
import { OfferService } from 'app/entities/offer/offer.service';
import { PropertyService } from 'app/entities/property/property.service';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';

@Component({
  selector: 'jhi-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss'],
})
export class AuctionDetailsComponent implements OnInit {
  public property: Property | null;
  public offer: Offer | null;
  public images: string[];
  public discount: any;
  public price: any;
  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private propertyService: PropertyService,
    private seeAuctionService: SeeAuctionService
  ) {
    this.offer = new Offer();
    this.property = new Property();
    this.images = [];
    this.price = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let idProperty = params['idProperty'];
      let idOffer = params['idOffer'];
      this.propertyService.find(idProperty).subscribe(response => {
        this.property = response.body;
        this.price = this.property?.price;
        this.discount = this.property?.discount;
        let discount = (this.property?.discount || 0) / 100;
        discount = this.price * discount;
        this.price = this.price - discount;
        this.seeAuctionService.getAuctionImgs(this.property?.id as number).subscribe(response => {
          response.forEach((value: any) => {
            this.images.push(value.url);
          });
        });
      });
      this.offerService.find(idOffer).subscribe(response => {
        this.offer = response.body;
      });
    });
  }

  public goBack() {
    window.history.back();
  }
}
