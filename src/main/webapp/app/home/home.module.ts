import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { ServicePaymentModule } from 'app/layouts/service-payment/service-payment.module';

@NgModule({
  imports: [HomeBuildingSharedModule, RouterModule.forChild([HOME_ROUTE]), ServicePaymentModule],
  declarations: [HomeComponent],
})
export class HomeBuildingHomeModule {
  constructor() {}
}
