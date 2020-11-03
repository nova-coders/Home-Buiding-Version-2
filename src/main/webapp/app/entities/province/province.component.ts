import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProvince } from 'app/shared/model/province.model';
import { ProvinceService } from './province.service';
import { ProvinceDeleteDialogComponent } from './province-delete-dialog.component';

@Component({
  selector: 'jhi-province',
  templateUrl: './province.component.html',
})
export class ProvinceComponent implements OnInit, OnDestroy {
  provinces?: IProvince[];
  eventSubscriber?: Subscription;

  constructor(protected provinceService: ProvinceService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.provinceService.query().subscribe((res: HttpResponse<IProvince[]>) => (this.provinces = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProvinces();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProvince): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProvinces(): void {
    this.eventSubscriber = this.eventManager.subscribe('provinceListModification', () => this.loadAll());
  }

  delete(province: IProvince): void {
    const modalRef = this.modalService.open(ProvinceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.province = province;
  }
}
