import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { HomeBuildingCoreModule } from 'app/core/core.module';
import { HomeBuildingAppRoutingModule } from './app-routing.module';
import { HomeBuildingHomeModule } from './home/home.module';
import { HomeBuildingEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { ServicePaymentModule } from 'app/layouts/service-payment/service-payment.module';

@NgModule({
  imports: [
    BrowserModule,
    HomeBuildingSharedModule,
    HomeBuildingCoreModule,
    HomeBuildingHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    HomeBuildingEntityModule,
    HomeBuildingAppRoutingModule,
    ServicePaymentModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
  exports: [],
})
export class HomeBuildingAppModule {}
