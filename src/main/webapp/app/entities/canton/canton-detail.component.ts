import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICanton } from 'app/shared/model/canton.model';

@Component({
  selector: 'jhi-canton-detail',
  templateUrl: './canton-detail.component.html',
})
export class CantonDetailComponent implements OnInit {
  canton: ICanton | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ canton }) => (this.canton = canton));
  }

  previousState(): void {
    window.history.back();
  }
}
