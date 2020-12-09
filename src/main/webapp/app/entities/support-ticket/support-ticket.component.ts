import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISupportTicket, SupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from './support-ticket.service';

@Component({
  selector: 'jhi-support-ticket',
  templateUrl: './support-ticket.component.html',
  styles: ['.ticketItems:hover{ background: #EAF2F5 }'],
})
export class SupportTicketComponent implements OnInit, OnDestroy {
  supportTickets?: ISupportTicket[];
  eventSubscriber?: Subscription;
  startPage = 1;
  hasTicket = false;
  ticketSelected: SupportTicket | undefined;

  constructor(
    protected supportTicketService: SupportTicketService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.supportTicketService.query().subscribe((res: HttpResponse<ISupportTicket[]>) => (this.supportTickets = res.body || []));
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.loadAll();
    this.registerChangeInSupportTickets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  registerChangeInSupportTickets(): void {
    this.eventSubscriber = this.eventManager.subscribe('supportTicketListModification', () => this.loadAll());
  }

  showTicket(supportTicket: SupportTicket): void {
    this.hasTicket = true;
    this.ticketSelected = supportTicket;
  }
}
