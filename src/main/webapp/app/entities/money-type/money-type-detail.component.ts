import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMoneyType } from 'app/shared/model/money-type.model';

@Component({
  selector: 'jhi-money-type-detail',
  templateUrl: './money-type-detail.component.html',
})
export class MoneyTypeDetailComponent implements OnInit {
  moneyType: IMoneyType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ moneyType }) => (this.moneyType = moneyType));
  }

  previousState(): void {
    window.history.back();
  }
}
