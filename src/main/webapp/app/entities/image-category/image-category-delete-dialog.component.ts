import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImageCategory } from 'app/shared/model/image-category.model';
import { ImageCategoryService } from './image-category.service';

@Component({
  templateUrl: './image-category-delete-dialog.component.html',
})
export class ImageCategoryDeleteDialogComponent {
  imageCategory?: IImageCategory;

  constructor(
    protected imageCategoryService: ImageCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.imageCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('imageCategoryListModification');
      this.activeModal.close();
    });
  }
}
