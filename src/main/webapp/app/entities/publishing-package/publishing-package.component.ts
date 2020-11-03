import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPublishingPackage } from 'app/shared/model/publishing-package.model';
import { PublishingPackageService } from './publishing-package.service';
import { PublishingPackageDeleteDialogComponent } from './publishing-package-delete-dialog.component';

@Component({
  selector: 'jhi-publishing-package',
  templateUrl: './publishing-package.component.html',
})
export class PublishingPackageComponent implements OnInit, OnDestroy {
  publishingPackages?: IPublishingPackage[];
  eventSubscriber?: Subscription;

  constructor(
    protected publishingPackageService: PublishingPackageService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.publishingPackageService
      .query()
      .subscribe((res: HttpResponse<IPublishingPackage[]>) => (this.publishingPackages = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPublishingPackages();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPublishingPackage): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPublishingPackages(): void {
    this.eventSubscriber = this.eventManager.subscribe('publishingPackageListModification', () => this.loadAll());
  }

  delete(publishingPackage: IPublishingPackage): void {
    const modalRef = this.modalService.open(PublishingPackageDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.publishingPackage = publishingPackage;
  }
}
