import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISupportTicketLog } from 'app/shared/model/support-ticket-log.model';
import { SupportTicketLogService } from './support-ticket-log.service';

@Component({
  templateUrl: './support-ticket-log-delete-dialog.component.html',
})
export class SupportTicketLogDeleteDialogComponent {
  supportTicketLog?: ISupportTicketLog;

  constructor(
    protected supportTicketLogService: SupportTicketLogService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.supportTicketLogService.delete(id).subscribe(() => {
      this.eventManager.broadcast('supportTicketLogListModification');
      this.activeModal.close();
    });
  }
}
