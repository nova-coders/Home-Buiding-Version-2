import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IUserAccount, UserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from './user-account.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';
import { ProfessionalProfileUserService } from 'app/entities/professional-profile-user/professional-profile-user.service';
import { IPublishingPackage } from 'app/shared/model/publishing-package.model';
import { PublishingPackageService } from 'app/entities/publishing-package/publishing-package.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';

type SelectableEntity = IUser | IProfessionalProfileUser | IPublishingPackage | IRole;

@Component({
  selector: 'jhi-user-account-update',
  templateUrl: './user-account-update.component.html',
})
export class UserAccountUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  professionalprofileusers: IProfessionalProfileUser[] = [];
  publishingpackages: IPublishingPackage[] = [];
  roles: IRole[] = [];

  editForm = this.fb.group({
    id: [],
    identification: [],
    birthdate: [],
    profilePicture: [],
    signaturePicture: [],
    signatureCode: [],
    state: [],
    creationDate: [],
    user: [],
    professionalProfileUser: [],
    publishingPackage: [],
    role: [],
  });

  constructor(
    protected userAccountService: UserAccountService,
    protected userService: UserService,
    protected professionalProfileUserService: ProfessionalProfileUserService,
    protected publishingPackageService: PublishingPackageService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAccount }) => {
      if (!userAccount.id) {
        const today = moment().startOf('day');
        userAccount.birthdate = today;
        userAccount.creationDate = today;
      }

      this.updateForm(userAccount);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.professionalProfileUserService
        .query({ filter: 'useraccount-is-null' })
        .pipe(
          map((res: HttpResponse<IProfessionalProfileUser[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProfessionalProfileUser[]) => {
          if (!userAccount.professionalProfileUser || !userAccount.professionalProfileUser.id) {
            this.professionalprofileusers = resBody;
          } else {
            this.professionalProfileUserService
              .find(userAccount.professionalProfileUser.id)
              .pipe(
                map((subRes: HttpResponse<IProfessionalProfileUser>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProfessionalProfileUser[]) => (this.professionalprofileusers = concatRes));
          }
        });

      this.publishingPackageService
        .query()
        .subscribe((res: HttpResponse<IPublishingPackage[]>) => (this.publishingpackages = res.body || []));

      this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
    });
  }

  updateForm(userAccount: IUserAccount): void {
    this.editForm.patchValue({
      id: userAccount.id,
      identification: userAccount.identification,
      birthdate: userAccount.birthdate ? userAccount.birthdate.format(DATE_TIME_FORMAT) : null,
      profilePicture: userAccount.profilePicture,
      signaturePicture: userAccount.signaturePicture,
      signatureCode: userAccount.signatureCode,
      state: userAccount.state,
      creationDate: userAccount.creationDate ? userAccount.creationDate.format(DATE_TIME_FORMAT) : null,
      user: userAccount.user,
      professionalProfileUser: userAccount.professionalProfileUser,
      publishingPackage: userAccount.publishingPackage,
      role: userAccount.role,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userAccount = this.createFromForm();
    if (userAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.userAccountService.update(userAccount));
    } else {
      this.subscribeToSaveResponse(this.userAccountService.create(userAccount));
    }
  }

  private createFromForm(): IUserAccount {
    return {
      ...new UserAccount(),
      id: this.editForm.get(['id'])!.value,
      identification: this.editForm.get(['identification'])!.value,
      birthdate: this.editForm.get(['birthdate'])!.value ? moment(this.editForm.get(['birthdate'])!.value, DATE_TIME_FORMAT) : undefined,
      profilePicture: this.editForm.get(['profilePicture'])!.value,
      signaturePicture: this.editForm.get(['signaturePicture'])!.value,
      signatureCode: this.editForm.get(['signatureCode'])!.value,
      state: this.editForm.get(['state'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      user: this.editForm.get(['user'])!.value,
      professionalProfileUser: this.editForm.get(['professionalProfileUser'])!.value,
      publishingPackage: this.editForm.get(['publishingPackage'])!.value,
      role: this.editForm.get(['role'])!.value,
    };
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
