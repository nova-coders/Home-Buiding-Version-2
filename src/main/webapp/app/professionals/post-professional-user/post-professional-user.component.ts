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
import { now } from 'moment';

@Component({
  selector: 'jhi-post-professional-user',
  templateUrl: './post-professional-user.component.html',
  styleUrls: ['./post-professional-user.component.scss'],
})
export class PostProfessionalUserComponent implements OnInit {
  public success = false;
  public error = false;
  public errorMessage = 'Ha ocurrido un error, por favor intentar mas tarde!';
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
    window.scrollTo(0, 0);
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
      this.currencies = data.body;
    });
    this.serviceForm.patchValue({
      profesionalType: 0,
      pricePerHour: 0,
      description: '',
      currency: '',
    });
  }

  changeAmountOnScreen(): void {
    this.amount = this.serviceForm.get(['pricePerHour'])!.value;
  }

  createProfessionalService(): void {
    let check = false;
    check = this.validateForm();
    if (check) {
      this.professionalProfileUser.profesionalType = this.serviceForm.get(['profesionalType'])!.value;
      this.professionalProfileUser.pricePerHour = this.serviceForm.get(['pricePerHour'])!.value;
      this.professionalProfileUser.description = this.serviceForm.get(['description'])!.value;
      this.professionalProfileUser.currency = this.serviceForm.get(['currency'])!.value;
      this.professionalProfileUser.state = true;
      //this.professionalProfileUser.creationDate = now().toString();
      this.professionalProfileUser.userAccount = this.userAccount;
      console.log('Check the user account: ');
      console.log(this.professionalProfileUser);
      this.professionalProfileService.create(this.professionalProfileUser).subscribe(data => {
        console.log(data);
        this.success = true;
      });
      window.scrollTo(0, 0);
      //Siguiente linea resetea el valor default para los errores.
      this.errorMessage = 'Ha ocurrido un error, por favor intentar mas tarde!';
      this.error = false;
    } else {
      this.error = true;
    }
  }

  validateForm(): boolean {
    let check = true;
    let profesionalType = this.serviceForm.get(['profesionalType'])!.value;
    let pricePerHour = this.serviceForm.get(['pricePerHour'])!.value;
    let description = this.serviceForm.get(['description'])!.value;
    let currency = this.serviceForm.get(['currency'])!.value;
    this.errorMessage = 'Por favor indicar: ';
    if (profesionalType == null || profesionalType == 0 || profesionalType == null) {
      if (this.errorMessage == 'Por favor indicar: ') {
        this.errorMessage = this.errorMessage + ' Tipo de servicio professional';
      } else {
        this.errorMessage = this.errorMessage + ', ' + 'Tipo de servicio professional';
      }
      check = false;
    }
    if (pricePerHour <= 0 || pricePerHour == null) {
      if (this.errorMessage == 'Por favor indicar: ') {
        this.errorMessage = this.errorMessage + ' Precio por hora.';
      } else {
        this.errorMessage = this.errorMessage + ', ' + 'Precio por hora';
      }
      check = false;
    }
    if (description == null || description == '') {
      if (this.errorMessage == 'Por favor indicar: ') {
        this.errorMessage = this.errorMessage + ' Descripcion';
      } else {
        this.errorMessage = this.errorMessage + ', ' + 'Descripcion';
      }
      check = false;
    }
    if (currency == null || currency == '') {
      if (this.errorMessage == 'Por favor indicar: ') {
        this.errorMessage = this.errorMessage + ' Tipo de moneda';
      } else {
        this.errorMessage = this.errorMessage + ', ' + 'Tipo de moneda';
      }
      check = false;
    }
    return check;
  }

  CancelGoBack(): void {
    this.location.back();
  }
}
