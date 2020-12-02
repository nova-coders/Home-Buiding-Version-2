import { Component, OnInit } from '@angular/core';
import { UserAccount } from 'app/shared/model/user-account.model';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { CustomPropertyService } from 'app/global-services/custom-property.service';
import { IProperty, Property } from 'app/shared/model/property.model';
import { Router } from '@angular/router';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';
import { CustomOfferService } from 'app/global-services/custom-offer.service';
import { IOffer, Offer } from 'app/shared/model/offer.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-listusersales',
  templateUrl: './list-user-sales.component.html',
  styleUrls: ['./list-user-sales.component.scss'],
})
export class ListUserSalesComponent implements OnInit {
  myProperties: Property[] = [];
  userAccount?: UserAccount;
  startPage = 1;
  offers: Offer[] = [];
  private tempOffer: Offer | undefined;

  constructor(
    private servicePaymentService: ServicePaymentService,
    private customPropertyService: CustomPropertyService,
    private seeAuctionService: SeeAuctionService,
    private customOfferService: CustomOfferService,
    private router: Router
  ) {
    this.myProperties = [];
  }

  ngOnInit(): void {
    this.servicePaymentService.getUserAccount().subscribe(puserAccount => {
      let userAccount: any;
      userAccount = <UserAccount>puserAccount.body;
      this.userAccount = userAccount;
      if (userAccount) {
        this.customPropertyService.getPropertiesInSaleByUserId(userAccount.id).subscribe(data => {
          this.myProperties = data;

          for (let ind = 0; ind < this.myProperties.length; ind++) {
            this.seeAuctionService.getAuctionImgs(this.myProperties[ind].id as number).subscribe(response => {
              this.myProperties[ind].propertyImages = response;
            });
            this.customOfferService.getMaxOfferBySaleId(this.myProperties[ind].sale!.id!).subscribe(dataO => {
              var temp: number | null;
              temp = dataO.body;
              if (temp != null) {
                this.tempOffer = new Offer();
                this.tempOffer.amount = temp;
                this.myProperties[ind].sale!.offers! = [];
                this.myProperties[ind].sale!.offers!.push(this.tempOffer);
              }
            });
          }
        });
      } else {
        console.log('No user is logged on.');
      }
    });
  }

  routetoSaleView(id: number | undefined): void {
    this.router.navigate(['/see-auction/', id]);
  }
}
