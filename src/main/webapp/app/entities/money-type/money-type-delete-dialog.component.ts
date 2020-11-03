import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMoneyType } from 'app/shared/model/money-type.model';
import { MoneyTypeService } from './money-type.service';

@Component({
  templateUrl: './money-type-delete-dialog.component.html',
})
export class MoneyTypeDeleteDialogComponent {
  moneyType?: IMoneyType;

  constructor(protected moneyTypeService: MoneyTypeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.moneyTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('moneyTypeListModification');
      this.activeModal.close();
    });
  }
}
