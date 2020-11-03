import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPropertyCategory } from 'app/shared/model/property-category.model';

@Component({
  selector: 'jhi-property-category-detail',
  templateUrl: './property-category-detail.component.html',
})
export class PropertyCategoryDetailComponent implements OnInit {
  propertyCategory: IPropertyCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ propertyCategory }) => (this.propertyCategory = propertyCategory));
  }

  previousState(): void {
    window.history.back();
  }
}
