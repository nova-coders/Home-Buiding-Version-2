import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISupportTicketLog, SupportTicketLog } from 'app/shared/model/support-ticket-log.model';
import { SupportTicketLogService } from './support-ticket-log.service';
import { ISupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from 'app/entities/support-ticket/support-ticket.service';

@Component({
  selector: 'jhi-support-ticket-log-update',
  templateUrl: './support-ticket-log-update.component.html',
})
export class SupportTicketLogUpdateComponent implements OnInit {
  isSaving = false;
  supporttickets: ISupportTicket[] = [];

  editForm = this.fb.group({
    id: [],
    troubleshootingCommentary: [],
    nextStepCommentary: [],
    creationDate: [],
    supportTicket: [],
  });

  constructor(
    protected supportTicketLogService: SupportTicketLogService,
    protected supportTicketService: SupportTicketService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supportTicketLog }) => {
      if (!supportTicketLog.id) {
        const today = moment().startOf('day');
        supportTicketLog.creationDate = today;
      }

      this.updateForm(supportTicketLog);

      this.supportTicketService.query().subscribe((res: HttpResponse<ISupportTicket[]>) => (this.supporttickets = res.body || []));
    });
  }

  updateForm(supportTicketLog: ISupportTicketLog): void {
    this.editForm.patchValue({
      id: supportTicketLog.id,
      troubleshootingCommentary: supportTicketLog.troubleshootingCommentary,
      nextStepCommentary: supportTicketLog.nextStepCommentary,
      creationDate: supportTicketLog.creationDate ? supportTicketLog.creationDate.format(DATE_TIME_FORMAT) : null,
      supportTicket: supportTicketLog.supportTicket,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supportTicketLog = this.createFromForm();
    if (supportTicketLog.id !== undefined) {
      this.subscribeToSaveResponse(this.supportTicketLogService.update(supportTicketLog));
    } else {
      this.subscribeToSaveResponse(this.supportTicketLogService.create(supportTicketLog));
    }
  }

  private createFromForm(): ISupportTicketLog {
    return {
      ...new SupportTicketLog(),
      id: this.editForm.get(['id'])!.value,
      troubleshootingCommentary: this.editForm.get(['troubleshootingCommentary'])!.value,
      nextStepCommentary: this.editForm.get(['nextStepCommentary'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      supportTicket: this.editForm.get(['supportTicket'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupportTicketLog>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISupportTicket): any {
    return item.id;
  }
}
