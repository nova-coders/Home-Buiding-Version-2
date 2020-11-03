import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPropertyImage } from 'app/shared/model/property-image.model';
import { PropertyImageService } from './property-image.service';

@Component({
  templateUrl: './property-image-delete-dialog.component.html',
})
export class PropertyImageDeleteDialogComponent {
  propertyImage?: IPropertyImage;

  constructor(
    protected propertyImageService: PropertyImageService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.propertyImageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('propertyImageListModification');
      this.activeModal.close();
    });
  }
}
