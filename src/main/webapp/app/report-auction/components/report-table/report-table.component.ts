import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../entities/property/property.service';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';
import { OfferService } from 'app/entities/offer/offer.service';
import { IProperty } from 'app/shared/model/property.model';

@Component({
  selector: 'jhi-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit {
  public propertyList: IProperty[];
  public propertyListFilter: IProperty[];
  public startPage = 1;
  constructor(private propertyService: PropertyService, private seeAuctionService: SeeAuctionService, private offerService: OfferService) {
    this.propertyList = [];
    this.propertyListFilter = [];
  }

  ngOnInit(): void {
    this.propertyService.query().subscribe(response => {
      this.propertyList = response.body as IProperty[];
      let idSale: any;
      let sale: any;
      for (let i = 0; i < this.propertyList.length; i++) {
        if (this.propertyList[i]?.sale != null) {
          idSale = this.propertyList[i]?.sale?.id;
          this.seeAuctionService.geByOffersBySale(idSale).subscribe(response => {
            sale = this.propertyList[i]?.sale;
            sale.offers = response;
            this.propertyList[i].sale = sale;
          });
        }
      }
      this.propertyListFilter = this.propertyList;
    });
  }
  public filterData($event: any) {
    console.log($event);
    this.propertyListFilter = $event;
  }
}
