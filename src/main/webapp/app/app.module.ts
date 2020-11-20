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
/* eslint-disable */
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { PropertyBlockComponent } from './html-components/property-block/property-block.component';
import { ServicePaymentComponent } from './service-payment/service-payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { SeeAuctionComponent } from './see-auction/see-auction.component';
import { CardOfferComponent } from './see-auction/components/card-offer/card-offer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularImageViewerModule } from 'angular-x-image-viewer';
import { ImageViewerComponent } from './see-auction/components/image-viewer/image-viewer.component';
import { ContractComponent } from './contract/contract.component';
/* eslint-disable */
import { ShowMapComponent } from './global-components/show-map/show-map.component';
import { BidAtAuctionComponent } from './bid-at-auction/bid-at-auction.component';
import { ModalDocumentComponent } from './bid-at-auction/components/modal-document/modal-document.component';

@NgModule({
  imports: [
    GooglePlaceModule,
    BrowserModule,
    HomeBuildingSharedModule,
    HomeBuildingCoreModule,
    HomeBuildingHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    HomeBuildingEntityModule,
    HomeBuildingAppRoutingModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0WA_0aYc0LYjQizsUml91CIAKUtQnoyQ',
      libraries: ['places'],
    }),
    NgxPayPalModule,
    NgxPaginationModule,
    AngularImageViewerModule,
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    PropertyBlockComponent,
    ServicePaymentComponent,
    SeeAuctionComponent,
    CardOfferComponent,
    ImageViewerComponent,
    ContractComponent,
    ShowMapComponent,
    BidAtAuctionComponent,
    ModalDocumentComponent,
  ],
  bootstrap: [MainComponent],
})
export class HomeBuildingAppModule {}
