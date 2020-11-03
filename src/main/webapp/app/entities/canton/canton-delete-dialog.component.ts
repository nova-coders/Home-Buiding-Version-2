import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICanton } from 'app/shared/model/canton.model';
import { CantonService } from './canton.service';

@Component({
  templateUrl: './canton-delete-dialog.component.html',
})
export class CantonDeleteDialogComponent {
  canton?: ICanton;

  constructor(protected cantonService: CantonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cantonService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cantonListModification');
      this.activeModal.close();
    });
  }
}
