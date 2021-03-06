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
import { ChartsModule } from 'ng2-charts';
/* eslint-disable */
import { ShowMapComponent } from './global-components/show-map/show-map.component';
import { BidAtAuctionComponent } from './bid-at-auction/bid-at-auction.component';
import { ModalDocumentComponent } from './bid-at-auction/components/modal-document/modal-document.component';
import { ModalBidComponent } from './bid-at-auction/components/modal-bid/modal-bid.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChatComponent } from './chat/chat.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { ListSalesComponent } from './sales/list-sales/list-sales.component';
import { ListUserSalesComponent } from 'app/listusersales/list-user-sales.component';
import { ModalconfirmComponent } from 'app/see-auction/components/modalconfirm/modalconfirm.component';
import { DeleteAuctionComponent } from './see-auction/components/delete-auction/delete-auction.component';
import { ListProfessionalComponent } from './professionals/list-professional/list-professional.component';
import { ViewProfessionalComponent } from './professionals/view-professional/view-professional.component';
import { UsersReportComponent } from './reports/users-report/users-report.component';
import { CreatePublishingPackageComponent } from './publishing/create-publishing-package/create-publishing-package.component';
import { ListPublishingPackegeComponent } from './publishing/list-publishing-packege/list-publishing-packege.component';
import { UpdatePublishingPackegeComponent } from './publishing/update-publishing-packege/update-publishing-packege.component';
import { DeletePublishingPackegeComponent } from './publishing/delete-publishing-packege/delete-publishing-packege.component';
import { PostProfessionalUserComponent } from './professionals/post-professional-user/post-professional-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ReportAuctionComponent } from './report-auction/report-auction.component';
import { PieChartAuctionComponent } from './report-auction/components/pie-chart-auction/pie-chart-auction.component';
import { BarChartAuctionComponent } from './report-auction/components/bar-chart-auction/bar-chart-auction.component';
import { ReportTableComponent } from './report-auction/components/report-table/report-table.component';
import { SearchAuctionComponent } from './report-auction/components/search-auction/search-auction.component';
import { AuctionDetailsComponent } from './report-auction/components/auction-details/auction-details.component';
import { SupportTicketLogClientComponent } from './support-ticket-log-client/support-ticket-log-client.component';

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
    ChartsModule,
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
    ModalBidComponent,
    NotificationsComponent,
    ChatComponent,
    MyOffersComponent,
    ListSalesComponent,
    ListUserSalesComponent,
    ModalconfirmComponent,
    DeleteAuctionComponent,
    ListProfessionalComponent,
    ViewProfessionalComponent,
    UsersReportComponent,
    CreatePublishingPackageComponent,
    ListPublishingPackegeComponent,
    UpdatePublishingPackegeComponent,
    DeletePublishingPackegeComponent,
    PostProfessionalUserComponent,
    HomeAdminComponent,
    ReportAuctionComponent,
    PieChartAuctionComponent,
    BarChartAuctionComponent,
    ReportTableComponent,
    SearchAuctionComponent,
    AuctionDetailsComponent,
    SupportTicketLogClientComponent,
  ],
  bootstrap: [MainComponent],
  exports: [ChatComponent],
})
export class HomeBuildingAppModule {}
