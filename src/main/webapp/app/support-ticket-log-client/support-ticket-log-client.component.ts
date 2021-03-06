import { Component, OnInit } from '@angular/core';
import { ISupportTicket, SupportTicket } from 'app/shared/model/support-ticket.model';
import { Subscription } from 'rxjs';
import { SupportTicketService } from 'app/entities/support-ticket/support-ticket.service';
import { JhiEventManager } from 'ng-jhipster';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ISupportTicketLog } from 'app/shared/model/support-ticket-log.model';
import { SupportTicketLogService } from 'app/entities/support-ticket-log/support-ticket-log.service';
import { IUserAccount, UserAccount } from 'app/shared/model/user-account.model';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';

@Component({
  selector: 'jhi-support-ticket-log-client',
  templateUrl: './support-ticket-log-client.component.html',
  styleUrls: ['./support-ticket-log-client.component.scss'],
})
export class SupportTicketLogClientComponent implements OnInit {
  supportTicketLogs: ISupportTicketLog[] | [];
  supportTickets?: ISupportTicket[];
  eventSubscriber?: Subscription;
  startPage = 1;
  startPage2 = 1;
  hasTicket = false;
  ticketSelected: SupportTicket | undefined;
  ticketResolved = false;
  userAccount: IUserAccount | undefined;

  searchForm = this.formBuilder.group({
    startDate: [''],
    finalDate: [''],
    state: [''],
  });

  constructor(
    protected supportTicketLogService: SupportTicketLogService,
    protected supportTicketService: SupportTicketService,
    private servicePaymentService: ServicePaymentService,
    protected eventManager: JhiEventManager,
    private formBuilder: FormBuilder
  ) {
    this.supportTicketLogs = [];
  }

  loadAll(): void {
    this.supportTicketService
      .findClientTickets()
      .subscribe((res: HttpResponse<ISupportTicket[]>) => (this.supportTickets = res.body || []));
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.servicePaymentService.getUserAccount().subscribe(puserAccount => {
      let userAccount: any;
      userAccount = <UserAccount>puserAccount.body;
      this.userAccount = userAccount;
    });
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
    this.ticketResolved = supportTicket.state || false;
    this.hasTicket = true;
    this.ticketSelected = supportTicket;
    this.supportTicketLogService.findByTicketID(this.ticketSelected.id!).subscribe(data => {
      this.supportTicketLogs = data.body || [];
      console.log(this.supportTicketLogs);
    });
  }

  closeTicket(): void {
    this.ticketResolved = false;
    this.ticketSelected!.state = false;
    this.ticketSelected!.signOffUser = this.userAccount;
    this.supportTicketService.update(this.ticketSelected!).subscribe(data => {});
  }

  reOpenTicket(): void {
    this.ticketResolved = true;
    this.ticketSelected!.state = true;
    this.ticketSelected!.signOffUser = this.userAccount;
    this.supportTicketService.update(this.ticketSelected!).subscribe(data => {});
  }

  search(): void {
    this.supportTicketService.findClientTickets().subscribe((res: HttpResponse<ISupportTicket[]>) => {
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
