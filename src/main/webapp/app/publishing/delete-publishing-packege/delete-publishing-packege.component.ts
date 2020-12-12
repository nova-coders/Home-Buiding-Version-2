import { Component, Input, OnInit } from '@angular/core';
import { PublishingPackageService } from 'app/entities/publishing-package/publishing-package.service';
import { PublishingPackage } from 'app/shared/model/publishing-package.model';

@Component({
  selector: 'jhi-delete-publishing-packege',
  templateUrl: './delete-publishing-packege.component.html',
  styleUrls: ['./delete-publishing-packege.component.scss'],
})
export class DeletePublishingPackegeComponent implements OnInit {
  @Input() publishingPackage: PublishingPackage;
  @Input() idModal: string;
  @Input() idModalLabel: string;
  public isDelete = false;
  constructor(private publishingPackageService: PublishingPackageService) {
    this.publishingPackage = new PublishingPackage();
    this.idModal = 'modal';
    this.idModalLabel = 'modalLabel';
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }
  public deletePackage(): void {
    this.publishingPackage.state = false;
    window.scroll(0, 0);
    this.publishingPackageService.update(this.publishingPackage).subscribe(response => {
      this.isDelete = true;
    });
  }
}
