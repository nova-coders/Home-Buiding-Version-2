import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupportTicketLog } from 'app/shared/model/support-ticket-log.model';
import { SupportTicketLogService } from './support-ticket-log.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from 'app/entities/support-ticket/support-ticket.service';
import { UserAccount } from 'app/shared/model/user-account.model';
import { User } from 'app/core/user/user.model';

@Component({
  selector: 'jhi-support-ticket-log',
  templateUrl: './support-ticket-log.component.html',
  styleUrls: ['./support-ticket-log.component.scss'],
})
export class SupportTicketLogComponent implements OnInit, OnDestroy {
  supportTicketLogs?: ISupportTicketLog[];
  eventSubscriber?: Subscription;
  ticketNumber = -1;
  ticketSelected: any;
  client: any;
  ticketResolved = false;

  constructor(
    protected supportTicketLogService: SupportTicketLogService,
    private supportTicketService: SupportTicketService,
    protected eventManager: JhiEventManager,
    private router: Router,
    private route: ActivatedRoute,
    protected modalService: NgbModal
  ) {
    this.ticketNumber = -1;
    this.ticketSelected = new SupportTicket();
    this.client = new User();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.ticketNumber = params['id'];
      this.supportTicketService.find(this.ticketNumber).subscribe(data => {
        this.ticketSelected = data.body;
        this.ticketResolved = this.ticketSelected.state;
        this.client = this.ticketSelected.client.user;
        console.log(this.client);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
}
