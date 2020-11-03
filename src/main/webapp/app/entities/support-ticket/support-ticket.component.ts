import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from './support-ticket.service';
import { SupportTicketDeleteDialogComponent } from './support-ticket-delete-dialog.component';

@Component({
  selector: 'jhi-support-ticket',
  templateUrl: './support-ticket.component.html',
})
export class SupportTicketComponent implements OnInit, OnDestroy {
  supportTickets?: ISupportTicket[];
  eventSubscriber?: Subscription;

  constructor(
    protected supportTicketService: SupportTicketService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.supportTicketService.query().subscribe((res: HttpResponse<ISupportTicket[]>) => (this.supportTickets = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSupportTickets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISupportTicket): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSupportTickets(): void {
    this.eventSubscriber = this.eventManager.subscribe('supportTicketListModification', () => this.loadAll());
  }

  delete(supportTicket: ISupportTicket): void {
    const modalRef = this.modalService.open(SupportTicketDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supportTicket = supportTicket;
  }
}
