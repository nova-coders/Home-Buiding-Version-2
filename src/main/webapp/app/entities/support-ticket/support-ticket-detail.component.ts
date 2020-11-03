import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupportTicket } from 'app/shared/model/support-ticket.model';

@Component({
  selector: 'jhi-support-ticket-detail',
  templateUrl: './support-ticket-detail.component.html',
})
export class SupportTicketDetailComponent implements OnInit {
  supportTicket: ISupportTicket | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supportTicket }) => (this.supportTicket = supportTicket));
  }

  previousState(): void {
    window.history.back();
  }
}
