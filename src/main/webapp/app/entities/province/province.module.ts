import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { ProvinceComponent } from './province.component';
import { ProvinceDetailComponent } from './province-detail.component';
import { ProvinceUpdateComponent } from './province-update.component';
import { ProvinceDeleteDialogComponent } from './province-delete-dialog.component';
import { provinceRoute } from './province.route';

@NgModule({
  imports: [HomeBuildingSharedModule, RouterModule.forChild(provinceRoute)],
  declarations: [ProvinceComponent, ProvinceDetailComponent, ProvinceUpdateComponent, ProvinceDeleteDialogComponent],
  entryComponents: [ProvinceDeleteDialogComponent],
})
export class HomeBuildingProvinceModule {}
