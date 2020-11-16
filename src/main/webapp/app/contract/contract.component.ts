import { Component, OnInit } from '@angular/core';
import { UserAccount } from 'app/shared/model/user-account.model';
import { ActivatedRoute } from '@angular/router';
import { Document } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document/document.service';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';

@Component({
  selector: 'jhi-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  public salesContract = false;
  public rentContract = true;
  public contractId: number | null = 0;

  public loggedUserAccount = new UserAccount();
  public contract = new Document();

  /*Checks for the signature*/
  public checkSeller = '';
  public checkBuyer = '';

  /*Boolean values that disable or enable the toogles that user needs to sign the document.*/
  public toogleUser = false;

  /*Hold the picture of the signature for each user*/
  public sellerSignaturePicture =
    'data:image/png;base64,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';
  public BuyerSignaturePicture =
    'data:image/png;base64,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';

  constructor(
    private activeRouter: ActivatedRoute,
    private documentService: DocumentService,
    private servicePaymentService: ServicePaymentService
  ) {}

  ngOnInit(): void {
    this.contractId = Number(this.activeRouter.snapshot.paramMap.get('id'));
    this.servicePaymentService.getUserAcoount().subscribe(puserAccount => {
      let userAccount: UserAccount;
      userAccount = <UserAccount>puserAccount.body;
      this.loggedUserAccount = userAccount;
      console.log('LOGED USER ACCOUNT');
      console.log(<UserAccount>this.loggedUserAccount);
    });
    this.documentService.find(this.contractId).subscribe(data => {
      this.contract = <Document>data.body;
      console.log('This is the contract data.');
      console.log(<Document>this.contract);
      if (<Document>this.contract.buyerState == true) {
        this.checkBuyer = 'checked';
      }
      if (<Document>this.contract.sellerState == true) {
        this.checkSeller = 'checked';
      }
      this.putUsersValuesOnContract();
      this.sellerSignaturePicture = this.contract.seller?.signaturePicture;
      this.BuyerSignaturePicture = this.contract.buyer?.signaturePicture;
    });
  }

  putUsersValuesOnContract(): void {
    if (String(this.contract.seller?.id) === String(this.loggedUserAccount.id)) {
      this.toogleUser = true;
    }
    console.log(this.toogleUser);
  }

  checkChange(element: HTMLInputElement): void {
    let response = confirm('Are you the boss?');
    if (!response) {
      element.checked = !element.checked;
    }
  }
}
