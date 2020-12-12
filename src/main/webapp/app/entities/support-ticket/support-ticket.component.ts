import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISupportTicket, SupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from './support-ticket.service';
import { IUserAccount, UserAccount } from '../../shared/model/user-account.model';
import { ServicePaymentService } from '../../service-payment/service-payment.service';

@Component({
  selector: 'jhi-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.scss'],
})
export class SupportTicketComponent implements OnInit, OnDestroy {
  supportTickets?: ISupportTicket[];
  eventSubscriber?: Subscription;
  startPage = 1;
  hasTicket = false;
  ticketSelected: SupportTicket | undefined;
  userAccount: IUserAccount | undefined;

  constructor(
    protected supportTicketService: SupportTicketService,
    protected eventManager: JhiEventManager,
    private servicePaymentService: ServicePaymentService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.supportTicketService.query().subscribe((res: HttpResponse<ISupportTicket[]>) => (this.supportTickets = res.body || []));
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
    this.hasTicket = true;
    this.ticketSelected = supportTicket;
  }

  closeTicket(): void {
    this.ticketSelected!.state = false;
    this.ticketSelected!.signOffUser = this.userAccount;
    this.supportTicketService.update(this.ticketSelected!).subscribe(data => {});
    window.scroll(0, 0);
  }

  reOpenTicket(): void {
    this.ticketSelected!.state = true;
    this.ticketSelected!.signOffUser = this.userAccount;
    this.supportTicketService.update(this.ticketSelected!).subscribe(data => {});
    window.scroll(0, 0);
  }
}
