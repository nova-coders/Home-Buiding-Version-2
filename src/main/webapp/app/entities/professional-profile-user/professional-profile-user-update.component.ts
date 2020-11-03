import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProfessionalProfileUser, ProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';
import { ProfessionalProfileUserService } from './professional-profile-user.service';

@Component({
  selector: 'jhi-professional-profile-user-update',
  templateUrl: './professional-profile-user-update.component.html',
})
export class ProfessionalProfileUserUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    profesionalType: [],
    pricePerHour: [],
    description: [],
    creationDate: [],
    state: [],
  });

  constructor(
    protected professionalProfileUserService: ProfessionalProfileUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professionalProfileUser }) => {
      if (!professionalProfileUser.id) {
        const today = moment().startOf('day');
        professionalProfileUser.creationDate = today;
      }

      this.updateForm(professionalProfileUser);
    });
  }

  updateForm(professionalProfileUser: IProfessionalProfileUser): void {
    this.editForm.patchValue({
      id: professionalProfileUser.id,
      profesionalType: professionalProfileUser.profesionalType,
      pricePerHour: professionalProfileUser.pricePerHour,
      description: professionalProfileUser.description,
      creationDate: professionalProfileUser.creationDate ? professionalProfileUser.creationDate.format(DATE_TIME_FORMAT) : null,
      state: professionalProfileUser.state,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const professionalProfileUser = this.createFromForm();
    if (professionalProfileUser.id !== undefined) {
      this.subscribeToSaveResponse(this.professionalProfileUserService.update(professionalProfileUser));
    } else {
      this.subscribeToSaveResponse(this.professionalProfileUserService.create(professionalProfileUser));
    }
  }

  private createFromForm(): IProfessionalProfileUser {
    return {
      ...new ProfessionalProfileUser(),
      id: this.editForm.get(['id'])!.value,
      profesionalType: this.editForm.get(['profesionalType'])!.value,
      pricePerHour: this.editForm.get(['pricePerHour'])!.value,
      description: this.editForm.get(['description'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      state: this.editForm.get(['state'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfessionalProfileUser>>): void {
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
}
