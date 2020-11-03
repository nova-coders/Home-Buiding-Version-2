import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IScore, Score } from 'app/shared/model/score.model';
import { ScoreService } from './score.service';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { IRent } from 'app/shared/model/rent.model';
import { RentService } from 'app/entities/rent/rent.service';

type SelectableEntity = IUserAccount | IRent;

@Component({
  selector: 'jhi-score-update',
  templateUrl: './score-update.component.html',
})
export class ScoreUpdateComponent implements OnInit {
  isSaving = false;
  useraccounts: IUserAccount[] = [];
  rents: IRent[] = [];

  editForm = this.fb.group({
    id: [],
    rating: [],
    commentary: [],
    creationDate: [],
    state: [],
    userAccount: [],
    rent: [],
  });

  constructor(
    protected scoreService: ScoreService,
    protected userAccountService: UserAccountService,
    protected rentService: RentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ score }) => {
      if (!score.id) {
        const today = moment().startOf('day');
        score.creationDate = today;
      }

      this.updateForm(score);

      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.useraccounts = res.body || []));

      this.rentService.query().subscribe((res: HttpResponse<IRent[]>) => (this.rents = res.body || []));
    });
  }

  updateForm(score: IScore): void {
    this.editForm.patchValue({
      id: score.id,
      rating: score.rating,
      commentary: score.commentary,
      creationDate: score.creationDate ? score.creationDate.format(DATE_TIME_FORMAT) : null,
      state: score.state,
      userAccount: score.userAccount,
      rent: score.rent,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const score = this.createFromForm();
    if (score.id !== undefined) {
      this.subscribeToSaveResponse(this.scoreService.update(score));
    } else {
      this.subscribeToSaveResponse(this.scoreService.create(score));
    }
  }

  private createFromForm(): IScore {
    return {
      ...new Score(),
      id: this.editForm.get(['id'])!.value,
      rating: this.editForm.get(['rating'])!.value,
      commentary: this.editForm.get(['commentary'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      state: this.editForm.get(['state'])!.value,
      userAccount: this.editForm.get(['userAccount'])!.value,
      rent: this.editForm.get(['rent'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IScore>>): void {
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
