import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPropertyImage, PropertyImage } from 'app/shared/model/property-image.model';
import { PropertyImageService } from './property-image.service';
import { IProperty } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property/property.service';
import { IImageCategory } from 'app/shared/model/image-category.model';
import { ImageCategoryService } from 'app/entities/image-category/image-category.service';

type SelectableEntity = IProperty | IImageCategory;

@Component({
  selector: 'jhi-property-image-update',
  templateUrl: './property-image-update.component.html',
})
export class PropertyImageUpdateComponent implements OnInit {
  isSaving = false;
  properties: IProperty[] = [];
  imagecategories: IImageCategory[] = [];

  editForm = this.fb.group({
    id: [],
    url: [],
    creationDate: [],
    state: [],
    property: [],
    imageCategory: [],
  });

  constructor(
    protected propertyImageService: PropertyImageService,
    protected propertyService: PropertyService,
    protected imageCategoryService: ImageCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ propertyImage }) => {
      if (!propertyImage.id) {
        const today = moment().startOf('day');
        propertyImage.creationDate = today;
      }

      this.updateForm(propertyImage);

      this.propertyService.query().subscribe((res: HttpResponse<IProperty[]>) => (this.properties = res.body || []));

      this.imageCategoryService.query().subscribe((res: HttpResponse<IImageCategory[]>) => (this.imagecategories = res.body || []));
    });
  }

  updateForm(propertyImage: IPropertyImage): void {
    this.editForm.patchValue({
      id: propertyImage.id,
      url: propertyImage.url,
      creationDate: propertyImage.creationDate ? propertyImage.creationDate.format(DATE_TIME_FORMAT) : null,
      state: propertyImage.state,
      property: propertyImage.property,
      imageCategory: propertyImage.imageCategory,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const propertyImage = this.createFromForm();
    if (propertyImage.id !== undefined) {
      this.subscribeToSaveResponse(this.propertyImageService.update(propertyImage));
    } else {
      this.subscribeToSaveResponse(this.propertyImageService.create(propertyImage));
    }
  }

  private createFromForm(): IPropertyImage {
    return {
      ...new PropertyImage(),
      id: this.editForm.get(['id'])!.value,
      url: this.editForm.get(['url'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      state: this.editForm.get(['state'])!.value,
      property: this.editForm.get(['property'])!.value,
      imageCategory: this.editForm.get(['imageCategory'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPropertyImage>>): void {
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
