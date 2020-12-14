import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment';
import { ISupportTicketLog, SupportTicketLog } from 'app/shared/model/support-ticket-log.model';
import { SupportTicketLogService } from './support-ticket-log.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from 'app/entities/support-ticket/support-ticket.service';
import { User } from 'app/core/user/user.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-support-ticket-log',
  templateUrl: './support-ticket-log.component.html',
  styleUrls: ['./support-ticket-log.component.scss'],
})
export class SupportTicketLogComponent implements OnInit, OnDestroy {
  supportTicketLogs?: ISupportTicketLog[];
  supportTicketLog: any;
  eventSubscriber?: Subscription;
  ticketNumber = -1;
  ticketSelected: any;
  client: any;
  ticketResolved = false;

  annotationsForm = this.fb.group({
    troubleshooting_commentary: [],
    next_step_commentary: [],
  });

  constructor(
    private fb: FormBuilder,
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
    this.supportTicketLog = new SupportTicketLog();
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
    this.annotationsForm.patchValue({
      troubleshooting_commentary: '',
      next_step_commentary: '',
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  registerLog(): void {
    this.supportTicketLog.creationDate = moment();
    this.supportTicketLog.troubleshooting_commentary = this.annotationsForm.get(['troubleshooting_commentary'])!.value;
    this.supportTicketLog.troubleshooting_commentary = this.annotationsForm.get(['next_step_commentary'])!.value;
    console.log(this.supportTicketLog);
    this.supportTicketLogService.create(this.supportTicketLog).subscribe(data => {
      console.log(data);
    });
  }
}
