import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupportTicketLog } from 'app/shared/model/support-ticket-log.model';

@Component({
  selector: 'jhi-support-ticket-log-detail',
  templateUrl: './support-ticket-log-detail.component.html',
})
export class SupportTicketLogDetailComponent implements OnInit {
  supportTicketLog: ISupportTicketLog | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supportTicketLog }) => (this.supportTicketLog = supportTicketLog));
  }

  previousState(): void {
    window.history.back();
  }
}
