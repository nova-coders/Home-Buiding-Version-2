import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupportTicketLog } from 'app/shared/model/support-ticket-log.model';
import { SupportTicketLogService } from './support-ticket-log.service';
import { SupportTicketLogDeleteDialogComponent } from './support-ticket-log-delete-dialog.component';

@Component({
  selector: 'jhi-support-ticket-log',
  templateUrl: './support-ticket-log.component.html',
})
export class SupportTicketLogComponent implements OnInit, OnDestroy {
  supportTicketLogs?: ISupportTicketLog[];
  eventSubscriber?: Subscription;

  constructor(
    protected supportTicketLogService: SupportTicketLogService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.supportTicketLogService.query().subscribe((res: HttpResponse<ISupportTicketLog[]>) => (this.supportTicketLogs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSupportTicketLogs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISupportTicketLog): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSupportTicketLogs(): void {
    this.eventSubscriber = this.eventManager.subscribe('supportTicketLogListModification', () => this.loadAll());
  }

  delete(supportTicketLog: ISupportTicketLog): void {
    const modalRef = this.modalService.open(SupportTicketLogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supportTicketLog = supportTicketLog;
  }
}
