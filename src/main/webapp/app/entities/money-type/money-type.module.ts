import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { MoneyTypeComponent } from './money-type.component';
import { MoneyTypeDetailComponent } from './money-type-detail.component';
import { MoneyTypeUpdateComponent } from './money-type-update.component';
import { MoneyTypeDeleteDialogComponent } from './money-type-delete-dialog.component';
import { moneyTypeRoute } from './money-type.route';

@NgModule({
  imports: [HomeBuildingSharedModule, RouterModule.forChild(moneyTypeRoute)],
  declarations: [MoneyTypeComponent, MoneyTypeDetailComponent, MoneyTypeUpdateComponent, MoneyTypeDeleteDialogComponent],
  entryComponents: [MoneyTypeDeleteDialogComponent],
})
export class HomeBuildingMoneyTypeModule {}
