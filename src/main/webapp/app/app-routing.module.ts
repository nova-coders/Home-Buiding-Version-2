import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ServicePaymentComponent } from 'app/service-payment/service-payment.component';
import { SeeAuctionComponent } from 'app/see-auction/see-auction.component';
import { ContractComponent } from 'app/contract/contract.component';
import { ShowMapComponent } from 'app/global-components/show-map/show-map.component';
import { BidAtAuctionComponent } from 'app/bid-at-auction/bid-at-auction.component';
import { ChatComponent } from 'app/chat/chat.component';
import { MyOffersComponent } from 'app/my-offers/my-offers.component';
import { ListSalesComponent } from 'app/sales/list-sales/list-sales.component.ts';
import { ListUserSalesComponent } from 'app/listusersales/list-user-sales.component';
import { PropertyUpdateComponent } from 'app/entities/property/property-update.component';
import { PropertyResolve } from 'app/entities/property/property.route';
import { ListProfessionalComponent } from 'app/professionals/list-professional/list-professional.component';
import { ViewProfessionalComponent } from 'app/professionals/view-professional/view-professional.component';
import { CreatePublishingPackageComponent } from 'app/publishing/create-publishing-package/create-publishing-package.component';
import { ListPublishingPackegeComponent } from 'app/publishing/list-publishing-packege/list-publishing-packege.component';
import { UpdatePublishingPackegeComponent } from 'app/publishing/update-publishing-packege/update-publishing-packege.component';
import { PostProfessionalUserComponent } from 'app/professionals/post-professional-user/post-professional-user.component';
import { HomeAdminComponent } from 'app/home-admin/home-admin.component';
import { UsersReportComponent } from './reports/users-report/users-report.component';
const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'servicepayment',
          component: ServicePaymentComponent,
        },
        {
          path: 'auth',
          loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        },
        {
          path: 'see-auction/:id',
          component: SeeAuctionComponent,
        },
        {
          path: 'document/:id',
          component: ContractComponent,
        },
        {
          path: 'show-map',
          component: ShowMapComponent,
        },
        {
          path: 'bit-at-auction/:id',
          component: BidAtAuctionComponent,
        },
        {
          path: 'sales/list',
          component: ListSalesComponent,
        },
        {
          path: 'chat',
          component: ChatComponent,
        },
        {
          path: 'mySales',
          component: ListUserSalesComponent,
        },
        {
          path: 'my-offers',
          component: MyOffersComponent,
        },
        {
          path: ':id/edit',
          component: PropertyUpdateComponent,
          resolve: {
            property: PropertyResolve,
          },
          data: {
            authorities: [Authority.USER],
            pageTitle: 'homeBuildingApp.property.home.title',
          },
          canActivate: [UserRouteAccessService],
        },
        {
          path: 'professionals',
          component: ListProfessionalComponent,
        },
        {
          path: 'viewProfessional/:id',
          component: ViewProfessionalComponent,
        },
        {
          path: 'reports/users',
          component: UsersReportComponent,
        },
        {
          path: 'createPublishingPackage',
          component: CreatePublishingPackageComponent,
        },
        {
          path: 'listPublishingPackage',
          component: ListPublishingPackegeComponent,
        },
        {
          path: 'updatePublishingPackage/:id',
          component: UpdatePublishingPackegeComponent,
        },
        {
          path: 'createProfessional',
          component: PostProfessionalUserComponent,
        },
        {
          path: 'homeAdmin',
          component: HomeAdminComponent,
        },
        ...LAYOUT_ROUTES,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class HomeBuildingAppRoutingModule {}
