import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImageCategory } from 'app/shared/model/image-category.model';

@Component({
  selector: 'jhi-image-category-detail',
  templateUrl: './image-category-detail.component.html',
})
export class ImageCategoryDetailComponent implements OnInit {
  imageCategory: IImageCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ imageCategory }) => (this.imageCategory = imageCategory));
  }

  previousState(): void {
    window.history.back();
  }
}
