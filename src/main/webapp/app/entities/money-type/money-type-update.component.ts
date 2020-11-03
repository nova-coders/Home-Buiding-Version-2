import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMoneyType, MoneyType } from 'app/shared/model/money-type.model';
import { MoneyTypeService } from './money-type.service';

@Component({
  selector: 'jhi-money-type-update',
  templateUrl: './money-type-update.component.html',
})
export class MoneyTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    icon: [],
    name: [],
    state: [],
  });

  constructor(protected moneyTypeService: MoneyTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ moneyType }) => {
      this.updateForm(moneyType);
    });
  }

  updateForm(moneyType: IMoneyType): void {
    this.editForm.patchValue({
      id: moneyType.id,
      icon: moneyType.icon,
      name: moneyType.name,
      state: moneyType.state,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const moneyType = this.createFromForm();
    if (moneyType.id !== undefined) {
      this.subscribeToSaveResponse(this.moneyTypeService.update(moneyType));
    } else {
      this.subscribeToSaveResponse(this.moneyTypeService.create(moneyType));
    }
  }

  private createFromForm(): IMoneyType {
    return {
      ...new MoneyType(),
      id: this.editForm.get(['id'])!.value,
      icon: this.editForm.get(['icon'])!.value,
      name: this.editForm.get(['name'])!.value,
      state: this.editForm.get(['state'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMoneyType>>): void {
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
