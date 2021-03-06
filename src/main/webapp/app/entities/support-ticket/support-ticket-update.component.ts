import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { ISupportTicket, SupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from './support-ticket.service';
import { IUserAccount, UserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { ServicePaymentService } from '../../service-payment/service-payment.service';

@Component({
  selector: 'jhi-support-ticket-update',
  templateUrl: './support-ticket-update.component.html',
})
export class SupportTicketUpdateComponent implements OnInit {
  isSaving = false;
  loggedUserAccount = new UserAccount();
  success = false;
  error = false;

  editForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(23)]],
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
    window.scroll(0, 0);
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
    this.success = false;
    this.isSaving = true;
    this.error = false;
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
    this.success = true;
  }

  protected onSaveError(): void {
    this.isSaving = false;
    this.error = true;
  }

  trackById(index: number, item: IUserAccount): any {
    return item.id;
  }
}
