import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { jsPDF } from 'jspdf';

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
  sellerSignaturePicture: any;
  buyerSignaturePicture: any;

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

  downloadContract(): void {
    const doc = new jsPDF();
    let x = 15;
    let y = 20;
    doc.setFontSize(22);
    doc.text('HomeBuilding - Términos del contrato', x, y);
    doc.setFontSize(16);
    y = this.addSpacing(y);
    doc.text('Contrato de subasta', x, y);

    //Paragraphs 1
    doc.setFontSize(11);
    y = this.addSpacing(y);
    doc.text(
      'Comparecen los señores ' +
        this.contract.buyer?.user?.firstName +
        ' ' +
        this.contract.buyer?.user?.lastName +
        ', mayor, portador de la cédula de identidad número ' +
        this.contract.buyer?.identification,
      x,
      y
    );
    y = this.addLineSpacing(y);
    doc.text(
      'y ' +
        this.contract.seller?.user?.firstName +
        ' ' +
        this.contract.seller?.user?.lastName +
        ', mayor, portador de la cédula de identidad número ' +
        this.contract.seller?.identification +
        ' y DICEN: Que el',
      x,
      y
    );
    y = this.addLineSpacing(y);
    doc.text('primero, en adelante conocido como: EL PROPIETARIO y el segundo en adelante conocido como: EL', x, y);
    y = this.addLineSpacing(y);
    doc.text('COMPRADOR, han convenido en acordar los términos siguientes, como normas para la promesa', x, y);
    y = this.addLineSpacing(y);
    doc.text('de compraventa a ser realizada con las siguientes cláusulas:', x, y);

    //Paragraphs 2
    y = this.addSpacing(y);
    doc.text('Se declara el propietario como legítimo dueño del inmueble presente en este contrato, inscrito en el', x, y);
    y = this.addLineSpacing(y);
    doc.text(
      'Registro Público de la propiedad, situado en ' +
        this.contract.property?.canton?.province?.name +
        ' ' +
        this.contract.property?.canton?.name +
        'tiene de área ' +
        this.contract.property?.areaSquareMeters +
        ' metros cuadrados',
      x,
      y
    );
    y = this.addLineSpacing(y);
    doc.text('y tiene dimensiones de ' + this.contract.property?.landSquareMeters + ' metros cuadrados.', x, y);

    //Paragraphs 3
    y = this.addSpacing(y);
    doc.text('Por medio del presente acuerdo, EL PROPIETARIO promete la transmisión futura del INMUEBLE, a', x, y);
    y = this.addLineSpacing(y);
    doc.text('favor del COMPRADOR, siendo esta última quien lo adquirirá para sí misma, en las condiciones en que', x, y);
    y = this.addLineSpacing(y);
    doc.text('actualmente se encuentra, con todos sus usos, mejoras y todo cuanto de hecho y por derecho correspondan.', x, y);

    //Paragraphs 4
    y = this.addSpacing(y);
    doc.text('Las PARTES convienen que el precio de la presente operación será de ' + this.bestOffer + ' colones.', x, y);
    y = this.addLineSpacing(y);
    doc.text('Las PARTES señalan que en este mismo acuerdo El COMPRADOR liquida totalmente el precio señalado.', x, y);

    //Paragraphs 5
    y = this.addSpacing(y);
    doc.text('LAS PARTES reconocen y aceptan que este contrato y sus adicionales constituyen a un acuerdo total', x, y);
    y = this.addLineSpacing(y);
    doc.text('entre ellos, por lo que desde el momento de su firma dejan sin efecto cualquier acuerdo o negociación', x, y);
    y = this.addLineSpacing(y);
    doc.text('previa, prevaleciendo lo dispuesto en este instrumento respecto, de cualquier otro, hasta en tanto se realice', x, y);
    y = this.addLineSpacing(y);
    doc.text('la firma de la escritura o del contrato de compraventa.', x, y);

    //Paragraphs 6
    y = this.addSpacing(y);
    doc.text('LAS PARTES convienen que el presente contrato es de caráter privado y, por lo tanto, se abstendrán de', x, y);
    y = this.addLineSpacing(y);
    doc.text('comunicar a un tercero su contenido o hacerlo público, así como tampoco podrán divulgar, compartir, o ', x, y);
    y = this.addLineSpacing(y);
    doc.text('hacer mal uso de los datos aportados por las PARTES para celebrar el contrato, no obstante, ', x, y);
    y = this.addLineSpacing(y);
    doc.text('prevalecerán todos los derechos y obligaciones de LAS PARTES, y por tanto podrán ejercitarse todas', x, y);
    y = this.addLineSpacing(y);
    doc.text('las acciones legales que se deriven del mismo conforme a la Ley.', x, y);

    //Images Signatures
    y = this.addSpacing(y);
    y = this.addSpacing(y);
    y = this.addSpacing(y);
    doc.setLineWidth(0.2);
    doc.addImage(this.contract.seller?.signaturePicture, 'JPEG', x + 10, y, 50, 20);
    doc.line(x + 10, y + 20, x + 60, y + 20);
    doc.text('Firma de ' + this.contract.seller?.user?.firstName + ' ' + this.contract.seller?.user?.lastName, x + 10, y + 26);
    doc.addImage(this.contract.buyer?.signaturePicture, 'JPEG', x + 100, y, 50, 20);
    doc.line(x + 100, y + 20, x + 160, y + 20);
    doc.text('Firma de ' + this.contract.buyer?.user?.firstName + ' ' + this.contract.buyer?.user?.lastName, x + 100, y + 26);
    doc.save('Contrato.pdf');
  }

  addLineSpacing(pos: number): number {
    return pos + 6;
  }

  addSpacing(pos: number): number {
    return pos + 12;
  }
}
