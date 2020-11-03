import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IScore } from 'app/shared/model/score.model';
import { ScoreService } from './score.service';

@Component({
  templateUrl: './score-delete-dialog.component.html',
})
export class ScoreDeleteDialogComponent {
  score?: IScore;

  constructor(protected scoreService: ScoreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.scoreService.delete(id).subscribe(() => {
      this.eventManager.broadcast('scoreListModification');
      this.activeModal.close();
    });
  }
}
