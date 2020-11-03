import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPropertyImage } from 'app/shared/model/property-image.model';
import { PropertyImageService } from './property-image.service';
import { PropertyImageDeleteDialogComponent } from './property-image-delete-dialog.component';

@Component({
  selector: 'jhi-property-image',
  templateUrl: './property-image.component.html',
})
export class PropertyImageComponent implements OnInit, OnDestroy {
  propertyImages?: IPropertyImage[];
  eventSubscriber?: Subscription;

  constructor(
    protected propertyImageService: PropertyImageService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.propertyImageService.query().subscribe((res: HttpResponse<IPropertyImage[]>) => (this.propertyImages = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPropertyImages();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPropertyImage): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPropertyImages(): void {
    this.eventSubscriber = this.eventManager.subscribe('propertyImageListModification', () => this.loadAll());
  }

  delete(propertyImage: IPropertyImage): void {
    const modalRef = this.modalService.open(PropertyImageDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.propertyImage = propertyImage;
  }
}
