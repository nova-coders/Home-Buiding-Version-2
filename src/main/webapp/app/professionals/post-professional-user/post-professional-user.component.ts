import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { UserAccount } from 'app/shared/model/user-account.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProfessionalProfileUserService } from 'app/entities/professional-profile-user/professional-profile-user.service';
import { MoneyTypeService } from 'app/entities/money-type/money-type.service';
import { IMoneyType } from 'app/shared/model/money-type.model';

@Component({
  selector: 'jhi-post-professional-user',
  templateUrl: './post-professional-user.component.html',
  styleUrls: ['./post-professional-user.component.scss'],
})
export class PostProfessionalUserComponent implements OnInit {
  public success = false;
  public error = false;
  public amount = 0;
  public professionalProfileUser: any;
  public userAccount: any;
  public picture = '';
  public currencies: IMoneyType[] | null = [];

  serviceForm = this.fb.group({
    profesionalType: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    pricePerHour: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    description: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254)]],
    currency: [undefined],
  });

  constructor(
    private servicePaymentService: ServicePaymentService,
    private professionalProfileService: ProfessionalProfileUserService,
    private currencyService: MoneyTypeService,
    private location: Location,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.professionalProfileUser = new ProfessionalProfileUser();
    this.currencies = [];
  }

  ngOnInit(): void {
    this.servicePaymentService.getUserAccount().subscribe(puserAccount => {
      let userAccount: UserAccount;
      userAccount = <UserAccount>puserAccount.body;
      this.userAccount = userAccount;
      if (userAccount) {
        if (userAccount.profilePicture == null) {
          this.picture = 'https://res.cloudinary.com/dsx9svdes/image/upload/v1606008693/default_ucc0ug.png';
        } else {
          this.picture = this.userAccount.profilePicture;
        }
      } else {
        this.error = true;
        this.picture = 'https://res.cloudinary.com/dsx9svdes/image/upload/v1606008693/default_ucc0ug.png';
      }
    });
    this.currencyService.query().subscribe(data => {
      console.log(data.body);
      this.currencies = data.body;
    });
  }

  changeAmountOnScreen(): void {
    this.amount = this.serviceForm.get(['pricePerHour'])!.value;
  }

  createProfessionalService(): void {
    this.professionalProfileUser.profesionalType = this.serviceForm.get(['profesionalType'])!.value;
    this.professionalProfileUser.pricePerHour = this.serviceForm.get(['pricePerHour'])!.value;
    this.professionalProfileUser.description = this.serviceForm.get(['description'])!.value;
    this.professionalProfileUser.currency = this.serviceForm.get(['currency'])!.value;
    this.professionalProfileUser.state = true;
    this.professionalProfileUser.userAccount = this.userAccount;
    this.professionalProfileUser.creationDate = new Date();
    console.log(this.professionalProfileUser);
    this.professionalProfileUser.save(this.professionalProfileUser).subscribe((data: any) => {
      this.success = true;
    });
  }

  CancelGoBack(): void {
    this.location.back();
  }
}
