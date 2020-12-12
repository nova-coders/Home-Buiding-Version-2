import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { IPublishingPackage } from '../../shared/model/publishing-package.model';
import { PublishingPackageService } from '../../entities/publishing-package/publishing-package.service';

@Component({
  selector: 'jhi-list-publishing-packege',
  templateUrl: './list-publishing-packege.component.html',
  styleUrls: ['./list-publishing-packege.component.scss'],
})
export class ListPublishingPackegeComponent implements OnInit {
  publishingPackages?: IPublishingPackage[];
  public cantPackage = 0;
  constructor(protected publishingPackageService: PublishingPackageService) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.loadAll();
  }

  loadAll(): void {
    this.publishingPackageService.query().subscribe((res: HttpResponse<IPublishingPackage[]>) => {
      this.publishingPackages = res.body || [];
      for (let i = 0; i < this.publishingPackages.length; i++) {
        if (this.publishingPackages[i].state) {
          this.cantPackage++;
        }
      }
    });
  }
}
