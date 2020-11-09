import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Property } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property/property.service';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';
import { Offer } from 'app/shared/model/offer.model';

@Component({
  selector: 'jhi-see-auction',
  templateUrl: './see-auction.component.html',
  styleUrls: ['./see-auction.component.scss'],
})
export class SeeAuctionComponent implements OnInit {
  public property: Property;
  public idProperty: number;
  public offers: Offer[];
  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private seeAuctionService: SeeAuctionService) {
    this.property = new Property();
    this.idProperty = -1;
    this.offers = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idProperty = params['id'];
      this.propertyService.find(this.idProperty).subscribe(response => {
        this.property = response.body as Property;
        this.seeAuctionService.geByOffersBySale(this.property.sale?.id as number).subscribe(response => {
          this.offers = response.body;
          console.log(response);
        });
      });
    });
  }
}
