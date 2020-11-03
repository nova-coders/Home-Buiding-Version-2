import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProperty } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';

@Component({
  templateUrl: './property-delete-dialog.component.html',
})
export class PropertyDeleteDialogComponent {
  property?: IProperty;

  constructor(protected propertyService: PropertyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.propertyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('propertyListModification');
      this.activeModal.close();
    });
  }
}
