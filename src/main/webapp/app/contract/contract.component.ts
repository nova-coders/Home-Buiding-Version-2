import { Component, OnInit } from '@angular/core';
import { UserAccount } from 'app/shared/model/user-account.model';
import { ActivatedRoute } from '@angular/router';
import { Document } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document/document.service';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { CustomSaleService } from 'app/global-services/custom-sale.service';
import { HttpResponse } from '@angular/common/http';
import { CustomOfferService } from 'app/global-services/custom-offer.service';

@Component({
  selector: 'jhi-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  salesContract = false;
  contractId: number | null = 0;

  loggedUserAccount = new UserAccount();
  contract = new Document();
  bestOffer: number;

  /* Checks for the signature */
  checkedSeller: undefined | boolean;
  checkedBuyer: undefined | boolean;
  disabledSeller: boolean;
  disabledBuyer: boolean;

  /* Hold the picture of the signature for each user */
  public sellerSignaturePicture: any;
  public buyerSignaturePicture: any;

  success: boolean;
  error: boolean;
  errorSignatureEmpty: boolean;
  errorNotAuthorization: boolean;

  constructor(
    private activeRouter: ActivatedRoute,
    private documentService: DocumentService,
    private servicePaymentService: ServicePaymentService,
    private customSaleService: CustomSaleService,
    private customOfferService: CustomOfferService
  ) {
    this.checkedBuyer = false;
    this.checkedSeller = false;
    this.disabledBuyer = true;
    this.disabledSeller = true;
    this.errorSignatureEmpty = false;
    this.success = false;
    this.error = false;
    this.errorNotAuthorization = false;
    this.bestOffer = 0;
  }

  ngOnInit(): void {
    this.servicePaymentService.getUserAccount().subscribe(puserAccount => {
      this.contractId = Number(this.activeRouter.snapshot.paramMap.get('id'));
      let userAccount: UserAccount;
      userAccount = <UserAccount>puserAccount.body;
      this.loggedUserAccount = userAccount;

      this.documentService.find(this.contractId).subscribe(data => {
        this.contract = <Document>data.body;
        this.checkedBuyer = this.contract.buyerState;
        this.checkedSeller = this.contract.sellerState;
        this.disabledBuyer = this.loggedUserAccount.id != this.contract.buyer?.id;
        this.disabledSeller = this.loggedUserAccount.id != this.contract.seller?.id;
        this.sellerSignaturePicture = this.contract.seller?.signaturePicture;
        this.buyerSignaturePicture = this.contract.buyer?.signaturePicture;

        this.customSaleService.isPropertySale(this.contract.property?.id).subscribe(
          data => {
            this.salesContract = <boolean>data.body;

            if (this.contract.property?.sale?.id != null) {
              this.customOfferService.getMaxOfferBySaleId(this.contract.property?.sale?.id).subscribe(
                (response: HttpResponse<number>) => {
                  this.bestOffer = <number>response.body;
                },
                () => (this.error = true)
              );
            }
          },
          () => (this.error = true)
        );
      });
    });
  }

  checkSellerSignature(): void {
    if (this.checkedSeller) {
      this.checkedSeller = false;
    } else {
      this.checkedSeller = true;
    }
  }

  checkBuyerSignature(): void {
    if (this.checkedBuyer) {
      this.checkedBuyer = false;
    } else {
      this.checkedBuyer = true;
    }
  }

  saveSignature(): void {
    this.error = false;
    this.success = false;
    this.errorSignatureEmpty = false;
    this.errorNotAuthorization = false;

    if (this.loggedUserAccount.id == this.contract.buyer?.id) {
      if (this.checkedBuyer) {
        this.contract.buyerState = this.checkedBuyer;
        this.documentService.update(this.contract).subscribe(
          () => (this.success = true),
          () => (this.error = true)
        );
      } else {
        this.errorSignatureEmpty = true;
      }
    } else if (this.loggedUserAccount.id == this.contract.seller?.id) {
      if (this.checkedSeller) {
        this.contract.sellerState = this.checkedSeller;
        this.documentService.update(this.contract).subscribe(
          () => (this.success = true),
          () => (this.error = true)
        );
      } else {
        this.errorSignatureEmpty = true;
      }
    } else {
      this.errorNotAuthorization = true;
    }
  }
}
