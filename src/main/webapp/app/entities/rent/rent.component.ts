import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRent } from 'app/shared/model/rent.model';
import { RentService } from './rent.service';
import { RentDeleteDialogComponent } from './rent-delete-dialog.component';

@Component({
  selector: 'jhi-rent',
  templateUrl: './rent.component.html',
})
export class RentComponent implements OnInit, OnDestroy {
  rents?: IRent[];
  eventSubscriber?: Subscription;

  constructor(protected rentService: RentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.rentService.query().subscribe((res: HttpResponse<IRent[]>) => (this.rents = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRents(): void {
    this.eventSubscriber = this.eventManager.subscribe('rentListModification', () => this.loadAll());
  }

  delete(rent: IRent): void {
    const modalRef = this.modalService.open(RentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rent = rent;
  }
}
