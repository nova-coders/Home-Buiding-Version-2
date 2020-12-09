import { Component, OnInit } from '@angular/core';
import { IOffer, Offer } from 'app/shared/model/offer.model';
import { IProperty } from 'app/shared/model/property.model';
import { CustomOfferService } from 'app/global-services/custom-offer.service';
import { UserAccount } from 'app/shared/model/user-account.model';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { HttpResponse } from '@angular/common/http';
import { Document } from 'app/shared/model/document.model';
import { CustomPropertyService } from 'app/global-services/custom-property.service';
import { CustomDocumentService } from 'app/entities/document/custom-document.service';

@Component({
  selector: 'jhi-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss'],
})
export class MyOffersComponent implements OnInit {
  myOffers: Offer[] = [];
  userAccount?: UserAccount;
  startPage = 1;
  constructor(
    private customOfferService: CustomOfferService,
    private servicePaymentService: ServicePaymentService,
    private customPropertyService: CustomPropertyService,
    private customDocumentService: CustomDocumentService
  ) {
    this.myOffers = [];
  }

  ngOnInit(): void {
    this.servicePaymentService.getUserAccount().subscribe(response => {
      this.userAccount = <UserAccount>response.body;

      this.customOfferService.getOffersByUserAccount(this.userAccount.id).subscribe((res: HttpResponse<IOffer[]>) => {
        this.myOffers = res.body || [];

        for (let offer of this.myOffers) {
          this.customPropertyService.getPropertyBySaleId(offer.sale!.id!).subscribe((response: HttpResponse<IProperty>) => {
            offer.sale!.property = response.body || undefined;

            this.customOfferService.getMaxOfferBySaleId(offer.sale!.id!).subscribe((response: HttpResponse<number>) => {
              let maxOffer = new Offer();
              maxOffer.amount = <number>response.body;
              offer.sale!.offers = [maxOffer];

              this.customDocumentService
                .getDocumentIdByUserIdAndPropertyId(this.userAccount?.id, offer.sale?.property?.id)
                .subscribe((response: HttpResponse<number>) => {
                  let document = new Document();
                  document.id = <number>response.body;
                  offer.sale!.property!.documents = [document];
                });
            });
          });
        }
      });
    });
  }
}
