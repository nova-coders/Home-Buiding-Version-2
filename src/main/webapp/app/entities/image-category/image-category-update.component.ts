import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IImageCategory, ImageCategory } from 'app/shared/model/image-category.model';
import { ImageCategoryService } from './image-category.service';

@Component({
  selector: 'jhi-image-category-update',
  templateUrl: './image-category-update.component.html',
})
export class ImageCategoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected imageCategoryService: ImageCategoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ imageCategory }) => {
      this.updateForm(imageCategory);
    });
  }

  updateForm(imageCategory: IImageCategory): void {
    this.editForm.patchValue({
      id: imageCategory.id,
      name: imageCategory.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const imageCategory = this.createFromForm();
    if (imageCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.imageCategoryService.update(imageCategory));
    } else {
      this.subscribeToSaveResponse(this.imageCategoryService.create(imageCategory));
    }
  }

  private createFromForm(): IImageCategory {
    return {
      ...new ImageCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImageCategory>>): void {
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
