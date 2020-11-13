import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Property } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property/property.service';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';
import { Offer } from 'app/shared/model/offer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-see-auction',
  templateUrl: './see-auction.component.html',
  styleUrls: ['./see-auction.component.scss'],
})
export class SeeAuctionComponent implements OnInit {
  public property: Property;
  public idProperty: number;
  public offers: Array<Offer> = [];
  public startPage = 1;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private seeAuctionService: SeeAuctionService
  ) {
    this.property = new Property();
    this.idProperty = -1;
    this.offers = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idProperty = params['id'];
      this.propertyService.find(this.idProperty).subscribe(response => {
        this.property = response.body as Property;
        if (this.property.sale != null) {
          this.seeAuctionService.geByOffersBySale(this.property.sale?.id as number).subscribe(response => {
            this.offers = response;
            console.log(response);
          });
        }
      });
    });
  }
  public closeAuction(): void {
    this.setAuctionState();
  }
  private setAuctionState(): void {
    this.seeAuctionService.closeAuction(this.idProperty).subscribe((response: any) => {
      console.log(response);
    });
  }
  private notifyClients(): void {}
  private goDocument(): void {
    this.router.navigate(['/']);
  }
}
