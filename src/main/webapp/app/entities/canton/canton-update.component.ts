import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICanton, Canton } from 'app/shared/model/canton.model';
import { CantonService } from './canton.service';
import { IProvince } from 'app/shared/model/province.model';
import { ProvinceService } from 'app/entities/province/province.service';

@Component({
  selector: 'jhi-canton-update',
  templateUrl: './canton-update.component.html',
})
export class CantonUpdateComponent implements OnInit {
  isSaving = false;
  provinces: IProvince[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    state: [],
    creationDate: [],
    province: [],
  });

  constructor(
    protected cantonService: CantonService,
    protected provinceService: ProvinceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ canton }) => {
      if (!canton.id) {
        const today = moment().startOf('day');
        canton.creationDate = today;
      }

      this.updateForm(canton);

      this.provinceService.query().subscribe((res: HttpResponse<IProvince[]>) => (this.provinces = res.body || []));
    });
  }

  updateForm(canton: ICanton): void {
    this.editForm.patchValue({
      id: canton.id,
      name: canton.name,
      state: canton.state,
      creationDate: canton.creationDate ? canton.creationDate.format(DATE_TIME_FORMAT) : null,
      province: canton.province,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const canton = this.createFromForm();
    if (canton.id !== undefined) {
      this.subscribeToSaveResponse(this.cantonService.update(canton));
    } else {
      this.subscribeToSaveResponse(this.cantonService.create(canton));
    }
  }

  private createFromForm(): ICanton {
    return {
      ...new Canton(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      state: this.editForm.get(['state'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      province: this.editForm.get(['province'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICanton>>): void {
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

  trackById(index: number, item: IProvince): any {
    return item.id;
  }
}
