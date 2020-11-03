import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICanton } from 'app/shared/model/canton.model';
import { CantonService } from './canton.service';
import { CantonDeleteDialogComponent } from './canton-delete-dialog.component';

@Component({
  selector: 'jhi-canton',
  templateUrl: './canton.component.html',
})
export class CantonComponent implements OnInit, OnDestroy {
  cantons?: ICanton[];
  eventSubscriber?: Subscription;

  constructor(protected cantonService: CantonService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cantonService.query().subscribe((res: HttpResponse<ICanton[]>) => (this.cantons = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCantons();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICanton): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCantons(): void {
    this.eventSubscriber = this.eventManager.subscribe('cantonListModification', () => this.loadAll());
  }

  delete(canton: ICanton): void {
    const modalRef = this.modalService.open(CantonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.canton = canton;
  }
}
