import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IScore } from 'app/shared/model/score.model';

@Component({
  selector: 'jhi-score-detail',
  templateUrl: './score-detail.component.html',
})
export class ScoreDetailComponent implements OnInit {
  score: IScore | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ score }) => (this.score = score));
  }

  previousState(): void {
    window.history.back();
  }
}
