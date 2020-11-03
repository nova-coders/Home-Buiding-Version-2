import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPropertyCategory } from 'app/shared/model/property-category.model';
import { PropertyCategoryService } from './property-category.service';
import { PropertyCategoryDeleteDialogComponent } from './property-category-delete-dialog.component';

@Component({
  selector: 'jhi-property-category',
  templateUrl: './property-category.component.html',
})
export class PropertyCategoryComponent implements OnInit, OnDestroy {
  propertyCategories?: IPropertyCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected propertyCategoryService: PropertyCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.propertyCategoryService.query().subscribe((res: HttpResponse<IPropertyCategory[]>) => (this.propertyCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPropertyCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPropertyCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPropertyCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('propertyCategoryListModification', () => this.loadAll());
  }

  delete(propertyCategory: IPropertyCategory): void {
    const modalRef = this.modalService.open(PropertyCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.propertyCategory = propertyCategory;
  }
}
