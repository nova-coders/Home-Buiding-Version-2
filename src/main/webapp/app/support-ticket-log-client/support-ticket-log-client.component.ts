import { Component, OnInit } from '@angular/core';
import { ISupportTicket, SupportTicket } from 'app/shared/model/support-ticket.model';
import { Subscription } from 'rxjs';
import { SupportTicketService } from 'app/entities/support-ticket/support-ticket.service';
import { JhiEventManager } from 'ng-jhipster';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

@Component({
  selector: 'jhi-support-ticket-log-client',
  templateUrl: './support-ticket-log-client.component.html',
  styleUrls: ['./support-ticket-log-client.component.scss'],
})
export class SupportTicketLogClientComponent implements OnInit {
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
    this.supportTicketService
      .findClientTickets()
      .subscribe((res: HttpResponse<ISupportTicket[]>) => (this.supportTickets = res.body || []));
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
