import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISale, Sale } from 'app/shared/model/sale.model';
import { SaleService } from './sale.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-sale-update',
  templateUrl: './sale-update.component.html',
})
export class SaleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    finalDate: [],
    cadastralPlan: [],
    registryStudy: [],
    propertyId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected saleService: SaleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sale }) => {
      if (!sale.id) {
        const today = moment().startOf('day');
        sale.finalDate = today;
      }

      this.updateForm(sale);
    });
  }

  updateForm(sale: ISale): void {
    this.editForm.patchValue({
      id: sale.id,
      finalDate: sale.finalDate ? sale.finalDate.format(DATE_TIME_FORMAT) : null,
      cadastralPlan: sale.cadastralPlan,
      registryStudy: sale.registryStudy,
      propertyId: sale.propertyId,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('homeBuildingApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sale = this.createFromForm();
    if (sale.id !== undefined) {
      this.subscribeToSaveResponse(this.saleService.update(sale));
    } else {
      this.subscribeToSaveResponse(this.saleService.create(sale));
    }
  }

  private createFromForm(): ISale {
    return {
      ...new Sale(),
      id: this.editForm.get(['id'])!.value,
      finalDate: this.editForm.get(['finalDate'])!.value ? moment(this.editForm.get(['finalDate'])!.value, DATE_TIME_FORMAT) : undefined,
      cadastralPlan: this.editForm.get(['cadastralPlan'])!.value,
      registryStudy: this.editForm.get(['registryStudy'])!.value,
      propertyId: this.editForm.get(['propertyId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISale>>): void {
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
