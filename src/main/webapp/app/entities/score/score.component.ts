import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IScore } from 'app/shared/model/score.model';
import { ScoreService } from './score.service';
import { ScoreDeleteDialogComponent } from './score-delete-dialog.component';

@Component({
  selector: 'jhi-score',
  templateUrl: './score.component.html',
})
export class ScoreComponent implements OnInit, OnDestroy {
  scores?: IScore[];
  eventSubscriber?: Subscription;

  constructor(protected scoreService: ScoreService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.scoreService.query().subscribe((res: HttpResponse<IScore[]>) => (this.scores = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInScores();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IScore): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInScores(): void {
    this.eventSubscriber = this.eventManager.subscribe('scoreListModification', () => this.loadAll());
  }

  delete(score: IScore): void {
    const modalRef = this.modalService.open(ScoreDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.score = score;
  }
}
