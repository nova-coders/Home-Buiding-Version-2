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
        ...LAYOUT_ROUTES,
      ],
      { enableTracing: DEBUG_INFO_ENABLED, useHash: true }
    ),
  ],
  exports: [RouterModule],
})
export class HomeBuildingAppRoutingModule {}
