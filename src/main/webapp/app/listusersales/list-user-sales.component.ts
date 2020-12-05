import { Component, OnInit } from '@angular/core';
import { UserAccount } from 'app/shared/model/user-account.model';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { CustomPropertyService } from 'app/global-services/custom-property.service';
import { Property } from 'app/shared/model/property.model';
import { Router } from '@angular/router';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';
import { CustomOfferService } from 'app/global-services/custom-offer.service';
import { Offer } from 'app/shared/model/offer.model';
import { DocumentService } from 'app/entities/document/document.service';
import { Document, IDocument } from 'app/shared/model/document.model';

@Component({
  selector: 'jhi-listusersales',
  templateUrl: './list-user-sales.component.html',
  styleUrls: ['./list-user-sales.component.scss'],
})
export class ListUserSalesComponent implements OnInit {
  myDocuments: Document[] = [];
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
    private documentsService: DocumentService,
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
            //In this section we place the documents.
            this.myProperties[ind].documents! = [];
            this.documentsService.findByProperty(this.myProperties[ind].id!).subscribe(dataD => {
              console.log('This is the dataD: ');
              console.log(dataD);
              /*var tempDocNumber: IDocument | null;
              tempDocNumber = dataD.body;
              if (tempDocNumber != null) {
                this.tempOffer = new Document();
                this.tempOffer = tempDocNumber;
                this.myProperties[ind].documents! = [];
                this.myProperties[ind].documents!.push(this.tempOffer);
              }*/
            });
          }
          console.log('These are the properties after the for loop.');
          console.log(this.myProperties);
        });
      } else {
        console.log('No user is logged on.');
      }
    });
  }

  routetoSaleView(id: number | undefined): void {
    this.router.navigate(['/see-auction/', id]);
  }

  routetoDocument(id: number | undefined): void {
    this.router.navigate(['/document/', id]);
  }
}
