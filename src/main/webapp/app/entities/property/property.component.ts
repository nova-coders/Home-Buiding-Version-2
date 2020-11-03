import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProperty } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';
import { PropertyDeleteDialogComponent } from './property-delete-dialog.component';

@Component({
  selector: 'jhi-property',
  templateUrl: './property.component.html',
})
export class PropertyComponent implements OnInit, OnDestroy {
  properties?: IProperty[];
  eventSubscriber?: Subscription;

  constructor(protected propertyService: PropertyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.propertyService.query().subscribe((res: HttpResponse<IProperty[]>) => (this.properties = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProperties();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProperty): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProperties(): void {
    this.eventSubscriber = this.eventManager.subscribe('propertyListModification', () => this.loadAll());
  }

  delete(property: IProperty): void {
    const modalRef = this.modalService.open(PropertyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.property = property;
  }
}
