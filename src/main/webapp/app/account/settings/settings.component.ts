import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { LANGUAGES } from 'app/core/language/language.constants';
import {LoginModalService} from "../../core/login/login-modal.service";
import {RegisterService} from "../register/register.service";
import {ImageService} from "../../global-services/image.service";
import {IUserAccount, UserAccount} from "../../shared/model/user-account.model";
import {UserAccountService} from "../../entities/user-account/user-account.service";
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import {IUser, User} from "../../core/user/user.model";
import {IProfessionalProfileUser} from "../../shared/model/professional-profile-user.model";
import {IPublishingPackage} from "../../shared/model/publishing-package.model";
import {IRole} from "../../shared/model/role.model";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import * as moment from "moment";
import {DATE_TIME_FORMAT} from "../../shared/constants/input.constants";

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  public completeName = '';

  isSaving = false;
  users: IUser[] = [];
  professionalprofileusers: IProfessionalProfileUser[] = [];
  publishingpackages: IPublishingPackage[] = [];
  roles: IRole[] = [];


  //Just in case

  signatureImageUrl: any;
  files: File[];
  userImageUrl: string;

//here

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  errorSignatureNotSaved = false;
  errorUserImage = false;
  errorInUploadImage = false;

  //here

  account!: Account;
  userAccount!: UserAccount;//This is a new instance
  success = false;
  languages = LANGUAGES;
  settingsForm = this.fb.group({

    id: [],
    identification: [],
    profilePicture: [],
    signaturePicture: [],
    signatureCode: [],
    state: [],
    creationDate: [],
    user: [],
    professionalProfileUser: [],
    publishingPackage: [],
    role: [],
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    langKey: [undefined],
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    birthdate: ['', [Validators.required]],
    //Check here later
  });

  constructor(
    private loginModalService: LoginModalService,
    private registerService: RegisterService,
    private imageService: ImageService,
    private accountService: AccountService,
    private userAccountService: UserAccountService,
    private fb: FormBuilder,
    private languageService: JhiLanguageService,
    private servicePaymentService: ServicePaymentService
  )
  {
    this.signatureImageUrl = '';
    this.files = [];
    this.userImageUrl = '';
    this.userAccount = new UserAccount();
    this.userAccount.birthdate = moment();
  }

  ngOnInit(): void {
    this.servicePaymentService.getUserAcoount().subscribe(puserAccount => {
      let userAccount: UserAccount;
      userAccount = <UserAccount>puserAccount.body;
      this.userAccount = userAccount;
      if (userAccount) {
        this.completeName = userAccount.user?.firstName + ' ' + userAccount.user?.lastName;
        this.settingsForm.patchValue({
          firstName: userAccount.user?.firstName,
          lastName: userAccount.user?.lastName,
          email: userAccount.user?.email,
          langKey: userAccount.user?.langKey,
          birthday: userAccount?.birthdate
        });
      }
    });
  }

  save(): void {
    this.success = false;

    this.account.firstName = this.settingsForm.get('firstName')!.value;
    this.account.lastName = this.settingsForm.get('lastName')!.value;
    this.account.email = this.settingsForm.get('email')!.value;
    this.account.langKey = this.settingsForm.get('langKey')!.value;

    this.accountService.save(this.account).subscribe(() => {
      this.success = true;

      this.accountService.authenticate(this.account);

      if (this.account.langKey !== this.languageService.getCurrentLanguage()) {
        this.languageService.changeLanguage(this.account.langKey);
      }
    });
  }

  update(): void {
    this.isSaving = true;
    const userAccount = this.createFromForm();
    if (userAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.userAccountService.update(userAccount));
    } else {
      this.subscribeToSaveResponse(this.userAccountService.create(userAccount));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserAccount>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  previousState(): void {
    window.history.back();
  }

  private createFromForm(): IUserAccount {
    let userAccountTemp: UserAccount = {
      ...new UserAccount(),
      id: this.settingsForm.get(['id'])!.value,
      identification: this.settingsForm.get(['identification'])!.value,
      birthdate: this.settingsForm.get(['birthdate'])!.value ? moment(this.settingsForm.get(['birthdate'])!.value, DATE_TIME_FORMAT) : undefined,
      profilePicture: this.settingsForm.get(['profilePicture'])!.value,
      signaturePicture: this.settingsForm.get(['signaturePicture'])!.value,
      signatureCode: this.settingsForm.get(['signatureCode'])!.value,
      state: this.settingsForm.get(['state'])!.value,
      creationDate: this.settingsForm.get(['creationDate'])!.value
        ? moment(this.settingsForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      user: this.settingsForm.get(['user'])!.value,
      professionalProfileUser: this.settingsForm.get(['professionalProfileUser'])!.value,
      publishingPackage: this.settingsForm.get(['publishingPackage'])!.value,
      role: this.settingsForm.get(['role'])!.value,
    };

    let user: User = {
      ...new User(),

      firstName: this.settingsForm.get(['firstName'])!.value,
      lastName:  this.settingsForm.get(['lastName'])!.value,
      email:  this.settingsForm.get(['email'])!.value,
      langKey: this.settingsForm.get(['langKey'])!.value,
    }
    userAccountTemp.user = user;
    return userAccountTemp;
  }

  public saveSignatureImage(data: any): void {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      const base64data = reader.result;
      this.signatureImageUrl = base64data;
    };
  }

  public onSelectImage(event: any): void {
    if (this.files && this.files.length >= 1) {
      this.onRemoveImage(this.files[0]);
    }

    this.files.push(...event.addedFiles);
  }

  public onRemoveImage(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadImage(): void {
    const fileData = this.files[0];
    this.imageService.uploadImage(fileData).subscribe(
      response => {
        this.userImageUrl = response.url;
      },
      () => {
        this.error = true;
      }
    );
  }

}
