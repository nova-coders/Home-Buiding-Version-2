import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IImageCategory } from 'app/shared/model/image-category.model';
import { ImageCategoryService } from './image-category.service';
import { ImageCategoryDeleteDialogComponent } from './image-category-delete-dialog.component';

@Component({
  selector: 'jhi-image-category',
  templateUrl: './image-category.component.html',
})
export class ImageCategoryComponent implements OnInit, OnDestroy {
  imageCategories?: IImageCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected imageCategoryService: ImageCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.imageCategoryService.query().subscribe((res: HttpResponse<IImageCategory[]>) => (this.imageCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInImageCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IImageCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInImageCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('imageCategoryListModification', () => this.loadAll());
  }

  delete(imageCategory: IImageCategory): void {
    const modalRef = this.modalService.open(ImageCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.imageCategory = imageCategory;
  }
}
