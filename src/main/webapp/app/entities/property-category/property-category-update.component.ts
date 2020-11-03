import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPropertyCategory, PropertyCategory } from 'app/shared/model/property-category.model';
import { PropertyCategoryService } from './property-category.service';

@Component({
  selector: 'jhi-property-category-update',
  templateUrl: './property-category-update.component.html',
})
export class PropertyCategoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    propertyType: [],
    state: [],
  });

  constructor(
    protected propertyCategoryService: PropertyCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ propertyCategory }) => {
      this.updateForm(propertyCategory);
    });
  }

  updateForm(propertyCategory: IPropertyCategory): void {
    this.editForm.patchValue({
      id: propertyCategory.id,
      name: propertyCategory.name,
      propertyType: propertyCategory.propertyType,
      state: propertyCategory.state,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const propertyCategory = this.createFromForm();
    if (propertyCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.propertyCategoryService.update(propertyCategory));
    } else {
      this.subscribeToSaveResponse(this.propertyCategoryService.create(propertyCategory));
    }
  }

  private createFromForm(): IPropertyCategory {
    return {
      ...new PropertyCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      propertyType: this.editForm.get(['propertyType'])!.value,
      state: this.editForm.get(['state'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPropertyCategory>>): void {
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
