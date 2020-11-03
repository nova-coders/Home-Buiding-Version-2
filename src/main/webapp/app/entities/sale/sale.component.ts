import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISale } from 'app/shared/model/sale.model';
import { SaleService } from './sale.service';
import { SaleDeleteDialogComponent } from './sale-delete-dialog.component';

@Component({
  selector: 'jhi-sale',
  templateUrl: './sale.component.html',
})
export class SaleComponent implements OnInit, OnDestroy {
  sales?: ISale[];
  eventSubscriber?: Subscription;

  constructor(protected saleService: SaleService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.saleService.query().subscribe((res: HttpResponse<ISale[]>) => (this.sales = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSales();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISale): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSales(): void {
    this.eventSubscriber = this.eventManager.subscribe('saleListModification', () => this.loadAll());
  }

  delete(sale: ISale): void {
    const modalRef = this.modalService.open(SaleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sale = sale;
  }
}
