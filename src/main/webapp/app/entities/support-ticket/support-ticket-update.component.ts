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
import { IUserAccount, UserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { ServicePaymentService } from '../../service-payment/service-payment.service';
import { User } from '../../core/user/user.model';

@Component({
  selector: 'jhi-support-ticket-update',
  templateUrl: './support-ticket-update.component.html',
})
export class SupportTicketUpdateComponent implements OnInit {
  isSaving = false;
  loggedUserAccount = new UserAccount();

  editForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    message: ['', [Validators.required, Validators.maxLength(255)]],
  });

  constructor(
    protected supportTicketService: SupportTicketService,
    protected userAccountService: UserAccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private servicePaymentService: ServicePaymentService
  ) {}

  ngOnInit(): void {
    this.servicePaymentService.getUserAccount().subscribe(response => {
      this.loggedUserAccount = <UserAccount>response.body;

      this.activatedRoute.data.subscribe(({ supportTicket }) => {
        if (!supportTicket.id) {
          const today = moment().startOf('day');
          supportTicket.creationDate = today;
        }

        this.updateForm(supportTicket);
      });
    });
  }

  updateForm(supportTicket: ISupportTicket): void {
    this.editForm.patchValue({
      title: supportTicket.title,
      message: supportTicket.message,
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
      title: this.editForm.get(['title'])!.value,
      message: this.editForm.get(['message'])!.value,
      creationDate: moment(),
      state: true,
      client: this.loggedUserAccount,
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
