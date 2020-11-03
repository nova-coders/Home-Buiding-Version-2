import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISupportTicket, SupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from './support-ticket.service';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';

@Component({
  selector: 'jhi-support-ticket-update',
  templateUrl: './support-ticket-update.component.html',
})
export class SupportTicketUpdateComponent implements OnInit {
  isSaving = false;
  useraccounts: IUserAccount[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    message: [],
    creationDate: [],
    state: [],
    client: [],
    signOffUser: [],
  });

  constructor(
    protected supportTicketService: SupportTicketService,
    protected userAccountService: UserAccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supportTicket }) => {
      if (!supportTicket.id) {
        const today = moment().startOf('day');
        supportTicket.creationDate = today;
      }

      this.updateForm(supportTicket);

      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.useraccounts = res.body || []));
    });
  }

  updateForm(supportTicket: ISupportTicket): void {
    this.editForm.patchValue({
      id: supportTicket.id,
      title: supportTicket.title,
      message: supportTicket.message,
      creationDate: supportTicket.creationDate ? supportTicket.creationDate.format(DATE_TIME_FORMAT) : null,
      state: supportTicket.state,
      client: supportTicket.client,
      signOffUser: supportTicket.signOffUser,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supportTicket = this.createFromForm();
    if (supportTicket.id !== undefined) {
      this.subscribeToSaveResponse(this.supportTicketService.update(supportTicket));
    } else {
      this.subscribeToSaveResponse(this.supportTicketService.create(supportTicket));
    }
  }

  private createFromForm(): ISupportTicket {
    return {
      ...new SupportTicket(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      message: this.editForm.get(['message'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      state: this.editForm.get(['state'])!.value,
      client: this.editForm.get(['client'])!.value,
      signOffUser: this.editForm.get(['signOffUser'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupportTicket>>): void {
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

  trackById(index: number, item: IUserAccount): any {
    return item.id;
  }
}
