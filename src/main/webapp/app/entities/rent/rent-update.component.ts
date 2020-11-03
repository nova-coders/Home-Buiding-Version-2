import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRent, Rent } from 'app/shared/model/rent.model';
import { RentService } from './rent.service';

@Component({
  selector: 'jhi-rent-update',
  templateUrl: './rent-update.component.html',
})
export class RentUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    deposit: [],
  });

  constructor(protected rentService: RentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rent }) => {
      this.updateForm(rent);
    });
  }

  updateForm(rent: IRent): void {
    this.editForm.patchValue({
      id: rent.id,
      deposit: rent.deposit,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rent = this.createFromForm();
    if (rent.id !== undefined) {
      this.subscribeToSaveResponse(this.rentService.update(rent));
    } else {
      this.subscribeToSaveResponse(this.rentService.create(rent));
    }
  }

  private createFromForm(): IRent {
    return {
      ...new Rent(),
      id: this.editForm.get(['id'])!.value,
      deposit: this.editForm.get(['deposit'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRent>>): void {
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
