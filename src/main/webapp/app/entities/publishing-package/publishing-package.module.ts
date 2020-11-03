import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { PublishingPackageComponent } from './publishing-package.component';
import { PublishingPackageDetailComponent } from './publishing-package-detail.component';
import { PublishingPackageUpdateComponent } from './publishing-package-update.component';
import { PublishingPackageDeleteDialogComponent } from './publishing-package-delete-dialog.component';
import { publishingPackageRoute } from './publishing-package.route';

@NgModule({
  imports: [HomeBuildingSharedModule, RouterModule.forChild(publishingPackageRoute)],
  declarations: [
    PublishingPackageComponent,
    PublishingPackageDetailComponent,
    PublishingPackageUpdateComponent,
    PublishingPackageDeleteDialogComponent,
  ],
  entryComponents: [PublishingPackageDeleteDialogComponent],
})
export class HomeBuildingPublishingPackageModule {}
