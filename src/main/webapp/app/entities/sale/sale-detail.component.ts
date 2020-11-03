import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISale } from 'app/shared/model/sale.model';

@Component({
  selector: 'jhi-sale-detail',
  templateUrl: './sale-detail.component.html',
})
export class SaleDetailComponent implements OnInit {
  sale: ISale | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sale }) => (this.sale = sale));
  }

  previousState(): void {
    window.history.back();
  }
}
