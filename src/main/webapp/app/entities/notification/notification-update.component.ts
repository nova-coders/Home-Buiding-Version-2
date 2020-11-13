import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { INotification, Notification } from 'app/shared/model/notification.model';
import { NotificationService } from './notification.service';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';

@Component({
  selector: 'jhi-notification-update',
  templateUrl: './notification-update.component.html',
})
export class NotificationUpdateComponent implements OnInit {
  isSaving = false;
  useraccounts: IUserAccount[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    message: [],
    state: [],
    type: [],
    creationDate: [],
    transmitter: [],
    receptor: [],
  });

  constructor(
    protected notificationService: NotificationService,
    protected userAccountService: UserAccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notification }) => {
      if (!notification.id) {
        const today = moment().startOf('day');
        notification.creationDate = today;
      }

      this.updateForm(notification);

      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.useraccounts = res.body || []));
    });
  }

  updateForm(notification: INotification): void {
    this.editForm.patchValue({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      state: notification.state,
      type: notification.type,
      creationDate: notification.creationDate ? notification.creationDate.format(DATE_TIME_FORMAT) : null,
      transmitter: notification.transmitter,
      receptor: notification.receptor,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notification = this.createFromForm();
    if (notification.id !== undefined) {
      this.subscribeToSaveResponse(this.notificationService.update(notification));
    } else {
      this.subscribeToSaveResponse(this.notificationService.create(notification));
    }
  }

  private createFromForm(): INotification {
    return {
      ...new Notification(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      message: this.editForm.get(['message'])!.value,
      state: this.editForm.get(['state'])!.value,
      type: this.editForm.get(['type'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      transmitter: this.editForm.get(['transmitter'])!.value,
      receptor: this.editForm.get(['receptor'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>): void {
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
