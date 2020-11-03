import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMoneyType } from 'app/shared/model/money-type.model';
import { MoneyTypeService } from './money-type.service';
import { MoneyTypeDeleteDialogComponent } from './money-type-delete-dialog.component';

@Component({
  selector: 'jhi-money-type',
  templateUrl: './money-type.component.html',
})
export class MoneyTypeComponent implements OnInit, OnDestroy {
  moneyTypes?: IMoneyType[];
  eventSubscriber?: Subscription;

  constructor(protected moneyTypeService: MoneyTypeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.moneyTypeService.query().subscribe((res: HttpResponse<IMoneyType[]>) => (this.moneyTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMoneyTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMoneyType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMoneyTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('moneyTypeListModification', () => this.loadAll());
  }

  delete(moneyType: IMoneyType): void {
    const modalRef = this.modalService.open(MoneyTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.moneyType = moneyType;
  }
}
