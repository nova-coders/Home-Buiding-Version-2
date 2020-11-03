import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPublishingPackage, PublishingPackage } from 'app/shared/model/publishing-package.model';
import { PublishingPackageService } from './publishing-package.service';

@Component({
  selector: 'jhi-publishing-package-update',
  templateUrl: './publishing-package-update.component.html',
})
export class PublishingPackageUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    price: [],
    cantPropertySale: [],
    cantPropertyRent: [],
    cantDays: [],
    professional: [],
    creationDate: [],
    type: [],
    state: [],
  });

  constructor(
    protected publishingPackageService: PublishingPackageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ publishingPackage }) => {
      if (!publishingPackage.id) {
        const today = moment().startOf('day');
        publishingPackage.creationDate = today;
      }

      this.updateForm(publishingPackage);
    });
  }

  updateForm(publishingPackage: IPublishingPackage): void {
    this.editForm.patchValue({
      id: publishingPackage.id,
      name: publishingPackage.name,
      price: publishingPackage.price,
      cantPropertySale: publishingPackage.cantPropertySale,
      cantPropertyRent: publishingPackage.cantPropertyRent,
      cantDays: publishingPackage.cantDays,
      professional: publishingPackage.professional,
      creationDate: publishingPackage.creationDate ? publishingPackage.creationDate.format(DATE_TIME_FORMAT) : null,
      type: publishingPackage.type,
      state: publishingPackage.state,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const publishingPackage = this.createFromForm();
    if (publishingPackage.id !== undefined) {
      this.subscribeToSaveResponse(this.publishingPackageService.update(publishingPackage));
    } else {
      this.subscribeToSaveResponse(this.publishingPackageService.create(publishingPackage));
    }
  }

  private createFromForm(): IPublishingPackage {
    return {
      ...new PublishingPackage(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      price: this.editForm.get(['price'])!.value,
      cantPropertySale: this.editForm.get(['cantPropertySale'])!.value,
      cantPropertyRent: this.editForm.get(['cantPropertyRent'])!.value,
      cantDays: this.editForm.get(['cantDays'])!.value,
      professional: this.editForm.get(['professional'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      type: this.editForm.get(['type'])!.value,
      state: this.editForm.get(['state'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPublishingPackage>>): void {
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
