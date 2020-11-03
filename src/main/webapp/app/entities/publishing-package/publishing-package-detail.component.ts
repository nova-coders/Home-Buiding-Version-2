import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPublishingPackage } from 'app/shared/model/publishing-package.model';

@Component({
  selector: 'jhi-publishing-package-detail',
  templateUrl: './publishing-package-detail.component.html',
})
export class PublishingPackageDetailComponent implements OnInit {
  publishingPackage: IPublishingPackage | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ publishingPackage }) => (this.publishingPackage = publishingPackage));
  }

  previousState(): void {
    window.history.back();
  }
}
