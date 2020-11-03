import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOffer, Offer } from 'app/shared/model/offer.model';
import { OfferService } from './offer.service';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { ISale } from 'app/shared/model/sale.model';
import { SaleService } from 'app/entities/sale/sale.service';

type SelectableEntity = IUserAccount | ISale;

@Component({
  selector: 'jhi-offer-update',
  templateUrl: './offer-update.component.html',
})
export class OfferUpdateComponent implements OnInit {
  isSaving = false;
  useraccounts: IUserAccount[] = [];
  sales: ISale[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    commentary: [],
    amount: [],
    state: [],
    userAccount: [],
    sale: [],
  });

  constructor(
    protected offerService: OfferService,
    protected userAccountService: UserAccountService,
    protected saleService: SaleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offer }) => {
      if (!offer.id) {
        const today = moment().startOf('day');
        offer.date = today;
      }

      this.updateForm(offer);

      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.useraccounts = res.body || []));

      this.saleService.query().subscribe((res: HttpResponse<ISale[]>) => (this.sales = res.body || []));
    });
  }

  updateForm(offer: IOffer): void {
    this.editForm.patchValue({
      id: offer.id,
      date: offer.date ? offer.date.format(DATE_TIME_FORMAT) : null,
      commentary: offer.commentary,
      amount: offer.amount,
      state: offer.state,
      userAccount: offer.userAccount,
      sale: offer.sale,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offer = this.createFromForm();
    if (offer.id !== undefined) {
      this.subscribeToSaveResponse(this.offerService.update(offer));
    } else {
      this.subscribeToSaveResponse(this.offerService.create(offer));
    }
  }

  private createFromForm(): IOffer {
    return {
      ...new Offer(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      commentary: this.editForm.get(['commentary'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      state: this.editForm.get(['state'])!.value,
      userAccount: this.editForm.get(['userAccount'])!.value,
      sale: this.editForm.get(['sale'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOffer>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
