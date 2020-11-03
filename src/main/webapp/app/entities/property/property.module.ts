import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { PropertyComponent } from './property.component';
import { PropertyDetailComponent } from './property-detail.component';
import { PropertyUpdateComponent } from './property-update.component';
import { PropertyDeleteDialogComponent } from './property-delete-dialog.component';
import { propertyRoute } from './property.route';

@NgModule({
  imports: [HomeBuildingSharedModule, RouterModule.forChild(propertyRoute)],
  declarations: [PropertyComponent, PropertyDetailComponent, PropertyUpdateComponent, PropertyDeleteDialogComponent],
  entryComponents: [PropertyDeleteDialogComponent],
})
export class HomeBuildingPropertyModule {}
