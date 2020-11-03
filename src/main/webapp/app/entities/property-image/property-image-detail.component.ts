import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPropertyImage } from 'app/shared/model/property-image.model';

@Component({
  selector: 'jhi-property-image-detail',
  templateUrl: './property-image-detail.component.html',
})
export class PropertyImageDetailComponent implements OnInit {
  propertyImage: IPropertyImage | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ propertyImage }) => (this.propertyImage = propertyImage));
  }

  previousState(): void {
    window.history.back();
  }
}
