import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { PropertyComponent } from './property.component';
import { PropertyDetailComponent } from './property-detail.component';
import { PropertyUpdateComponent } from './property-update.component';
import { PropertyDeleteDialogComponent } from './property-delete-dialog.component';
import { propertyRoute } from './property.route';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    HomeBuildingSharedModule,
    RouterModule.forChild(propertyRoute),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDw6tRPHNHrpOWsx9ZtYcThtd2ph1-dQ4E',
    }),
  ],
  declarations: [PropertyComponent, PropertyDetailComponent, PropertyUpdateComponent, PropertyDeleteDialogComponent],
  entryComponents: [PropertyDeleteDialogComponent],
})
export class HomeBuildingPropertyModule {}
