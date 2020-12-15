import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { ISupportTicket, SupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from './support-ticket.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from '../../shared/constants/input.constants';

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

  searchForm = this.formBuilder.group({
    startDate: [''],
    finalDate: [''],
    state: [''],
  });

  constructor(
    protected supportTicketService: SupportTicketService,
    protected eventManager: JhiEventManager,
    private formBuilder: FormBuilder
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

  search(): void {
    this.supportTicketService.query().subscribe((res: HttpResponse<ISupportTicket[]>) => {
      this.supportTickets = res.body || [];

      if (this.supportTickets != null) {
        let supportTicketsFiltered: SupportTicket[] = [];
        let finalDate = moment(this.searchForm.get(['finalDate'])!.value, DATE_TIME_FORMAT);
        let startDate = moment(this.searchForm.get(['startDate'])!.value, DATE_TIME_FORMAT);
        let hasDate = this.searchForm.get(['finalDate'])!.value != '' && this.searchForm.get(['startDate'])!.value != '';
        let hasState = this.searchForm.get(['state'])!.value != '';
        let state = this.searchForm.get(['state'])!.value == '1';

        if (hasDate && hasState) {
          for (let ind = 0; ind < this.supportTickets.length; ind++) {
            if (this.supportTickets[ind].creationDate?.isBetween(startDate, finalDate)) {
              if (this.supportTickets[ind].state == state) {
                supportTicketsFiltered.push(this.supportTickets[ind]);
              }
            }
          }
        } else if (hasDate) {
          for (let ind = 0; ind < this.supportTickets.length; ind++) {
            if (this.supportTickets[ind].creationDate?.isBetween(startDate, finalDate)) {
              supportTicketsFiltered.push(this.supportTickets[ind]);
            }
          }
        } else if (hasState) {
          for (let ind = 0; ind < this.supportTickets.length; ind++) {
            if (this.supportTickets[ind].state == state) {
              supportTicketsFiltered.push(this.supportTickets[ind]);
            }
          }
        }

        if (hasDate || hasState) {
          this.supportTickets = supportTicketsFiltered;
        }
      }
    });
  }
}
