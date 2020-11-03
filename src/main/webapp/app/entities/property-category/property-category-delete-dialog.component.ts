import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPropertyCategory } from 'app/shared/model/property-category.model';
import { PropertyCategoryService } from './property-category.service';

@Component({
  templateUrl: './property-category-delete-dialog.component.html',
})
export class PropertyCategoryDeleteDialogComponent {
  propertyCategory?: IPropertyCategory;

  constructor(
    protected propertyCategoryService: PropertyCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.propertyCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('propertyCategoryListModification');
      this.activeModal.close();
    });
  }
}
