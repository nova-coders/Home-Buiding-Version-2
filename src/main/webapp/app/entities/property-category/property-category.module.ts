import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { PropertyCategoryComponent } from './property-category.component';
import { PropertyCategoryDetailComponent } from './property-category-detail.component';
import { PropertyCategoryUpdateComponent } from './property-category-update.component';
import { PropertyCategoryDeleteDialogComponent } from './property-category-delete-dialog.component';
import { propertyCategoryRoute } from './property-category.route';

@NgModule({
  imports: [HomeBuildingSharedModule, RouterModule.forChild(propertyCategoryRoute)],
  declarations: [
    PropertyCategoryComponent,
    PropertyCategoryDetailComponent,
    PropertyCategoryUpdateComponent,
    PropertyCategoryDeleteDialogComponent,
  ],
  entryComponents: [PropertyCategoryDeleteDialogComponent],
})
export class HomeBuildingPropertyCategoryModule {}
