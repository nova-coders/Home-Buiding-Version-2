import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { PropertyImageComponent } from './property-image.component';
import { PropertyImageDetailComponent } from './property-image-detail.component';
import { PropertyImageUpdateComponent } from './property-image-update.component';
import { PropertyImageDeleteDialogComponent } from './property-image-delete-dialog.component';
import { propertyImageRoute } from './property-image.route';

@NgModule({
  imports: [HomeBuildingSharedModule, RouterModule.forChild(propertyImageRoute)],
  declarations: [PropertyImageComponent, PropertyImageDetailComponent, PropertyImageUpdateComponent, PropertyImageDeleteDialogComponent],
  entryComponents: [PropertyImageDeleteDialogComponent],
})
export class HomeBuildingPropertyImageModule {}
