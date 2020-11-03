import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPublishingPackage } from 'app/shared/model/publishing-package.model';
import { PublishingPackageService } from './publishing-package.service';

@Component({
  templateUrl: './publishing-package-delete-dialog.component.html',
})
export class PublishingPackageDeleteDialogComponent {
  publishingPackage?: IPublishingPackage;

  constructor(
    protected publishingPackageService: PublishingPackageService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.publishingPackageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('publishingPackageListModification');
      this.activeModal.close();
    });
  }
}
