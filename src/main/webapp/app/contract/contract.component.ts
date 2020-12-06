import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserAccount, UserAccount } from 'app/shared/model/user-account.model';
import { ActivatedRoute } from '@angular/router';
import { Document } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document/document.service';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { CustomSaleService } from 'app/global-services/custom-sale.service';
import { HttpResponse } from '@angular/common/http';
import { CustomOfferService } from 'app/global-services/custom-offer.service';
import { NotificationSocketService } from 'app/core/notification/notificationSocket.service';
import { NotificationService } from 'app/entities/notification/notification.service';
import { Notification } from 'app/shared/model/notification.model';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';
import * as moment from 'moment';
import { User } from 'app/core/user/user.model';
import { not } from 'rxjs/internal-compatibility';

@Component({
  selector: 'jhi-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit, OnDestroy {
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
    private customOfferService: CustomOfferService,
    private notificationSocketService: NotificationSocketService,
    private notificationService: NotificationService
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

  ngOnDestroy(): void {
    this.notificationSocketService.disconnect();
  }

  ngOnInit(): void {
    this.notificationSocketService.connect();
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

    let transmitter: UserAccount | undefined;
    let receptor: UserAccount | undefined;
    let checked: boolean | undefined;

    if (this.loggedUserAccount.id == this.contract.buyer?.id) {
      checked = this.checkedBuyer;
      transmitter = this.contract.buyer;
      receptor = this.contract.seller;
      this.contract.buyerState = checked;
    } else {
      checked = this.checkedSeller;
      transmitter = this.contract.seller;
      receptor = this.contract.buyer;
      this.contract.sellerState = checked;
    }

    if (checked) {
      this.documentService.update(this.contract).subscribe(
        () => {
          let notification = this.buildNotification(transmitter, receptor);
          this.notificationService.create(notification).subscribe((response: any) => {
            notification = response.body;
            this.notificationSocketService.sendNotification('' + notification.id);
            this.success = true;
          });
        },
        () => (this.error = true)
      );
    } else {
      this.errorSignatureEmpty = true;
    }
  }

  buildNotification(transmitter: IUserAccount | undefined, receptor: IUserAccount | undefined): Notification {
    let notification = new Notification();
    notification.receptor = receptor;
    notification.creationDate = moment();
    notification.state = true;
    notification.title = '¡Contrato firmado!';

    if (this.salesContract) {
      notification.type = NotificationType.Subasta;
      notification.message = "El contrato de la subasta <b class='font-weight-bold'>" + this.contract.property?.title + '</b>';
      notification.message += " fue firmado por <b class='font-weight-bold'>" + transmitter?.user?.login + '</b> ';
      notification.message += "<a href='document/" + this.contractId + "'> Ver documento</a>";
    } else {
      notification.type = NotificationType.Alquiler;
      notification.message = "El contrato del alquiler <b class='font-weight-bold'>" + this.contract.property?.title + '</b>';
      notification.message += " fue firmado por <b class='font-weight-bold'>" + transmitter?.user?.login + '</b> ';
      notification.message += "<a href='document/" + this.contractId + "'> Ver documento</a>";
    }

    return notification;
  }
}
