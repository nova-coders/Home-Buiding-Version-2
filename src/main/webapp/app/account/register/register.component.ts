import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { RegisterService } from './register.service';
import { ImageService } from '../../global-services/image.service';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  errorSignatureNotSaved = false;
  errorUserImage = false;
  errorInUploadImage = false;

  signatureImageUrl: any;
  files: File[];
  userImageUrl: string;

  registerForm = this.fb.group({
    identificationType: ['', [Validators.required]],
    identification: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
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
    phone: ['', [Validators.required, Validators.pattern('(\\+506|00506|506)?[ -]*([0-9][ -]*){8}')]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor(
    private languageService: JhiLanguageService,
    private loginModalService: LoginModalService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private imageService: ImageService
  ) {
    this.signatureImageUrl = '';
    this.files = [];
    this.userImageUrl = '';
  }

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;
    this.errorSignatureNotSaved = false;
    this.errorUserImage = false;

    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      if (!this.files[0]) {
        this.errorUserImage = true;
      } else {
        if (this.signatureImageUrl === '') {
          this.errorSignatureNotSaved = true;
        } else {
          this.uploadImage();

          if (!this.error) {
            const login = this.registerForm.get(['login'])!.value;
            const email = this.registerForm.get(['email'])!.value;
            this.registerService.save({ login, email, password, langKey: this.languageService.getCurrentLanguage() }).subscribe(
              () => (this.success = true),
              response => this.processError(response)
            );
          }
        }
      }
    }
  }

  openLogin(): void {
    this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
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
