import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { LANGUAGES } from 'app/core/language/language.constants';
import {LoginModalService} from "../../core/login/login-modal.service";
import {RegisterService} from "../register/register.service";
import {ImageService} from "../../global-services/image.service";
import {UserAccount} from "../../shared/model/user-account.model";
import {UserAccountService} from "../../entities/user-account/user-account.service";

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

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
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    langKey: [undefined],
    
    //Check later here.
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
    lastname1: ['', [Validators.required]],
    lastname2: [],
    phone: ['', [Validators.required, Validators.pattern('(\\+506|00506|506)?[ -]*([0-9][ -]*){8}')]]
    //Check here later
  });

  constructor(
    private loginModalService: LoginModalService,
    private registerService: RegisterService,
    private imageService: ImageService,
    private accountService: AccountService,
    private userAccountService: UserAccountService,
    private fb: FormBuilder,
    private languageService: JhiLanguageService)
  {
    this.signatureImageUrl = '';
    this.files = [];
    this.userImageUrl = '';
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.settingsForm.patchValue({
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
          langKey: account.langKey
        });
        this.account = account;
        alert('this is the information got from the account Service | identity: ' + this.account);
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

  update(): void{
    console.log('This is the information on the form: ' + this.account);
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
