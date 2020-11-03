import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from './support-ticket.service';

@Component({
  templateUrl: './support-ticket-delete-dialog.component.html',
})
export class SupportTicketDeleteDialogComponent {
  supportTicket?: ISupportTicket;

  constructor(
    protected supportTicketService: SupportTicketService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.supportTicketService.delete(id).subscribe(() => {
      this.eventManager.broadcast('supportTicketListModification');
      this.activeModal.close();
    });
  }
}
