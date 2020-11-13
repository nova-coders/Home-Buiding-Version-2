import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'money-type',
        loadChildren: () => import('./money-type/money-type.module').then(m => m.HomeBuildingMoneyTypeModule),
      },
      {
        path: 'user-account',
        loadChildren: () => import('./user-account/user-account.module').then(m => m.HomeBuildingUserAccountModule),
      },
      {
        path: 'professional-profile-user',
        loadChildren: () =>
          import('./professional-profile-user/professional-profile-user.module').then(m => m.HomeBuildingProfessionalProfileUserModule),
      },
      {
        path: 'support-ticket',
        loadChildren: () => import('./support-ticket/support-ticket.module').then(m => m.HomeBuildingSupportTicketModule),
      },
      {
        path: 'support-ticket-log',
        loadChildren: () => import('./support-ticket-log/support-ticket-log.module').then(m => m.HomeBuildingSupportTicketLogModule),
      },
      {
        path: 'canton',
        loadChildren: () => import('./canton/canton.module').then(m => m.HomeBuildingCantonModule),
      },
      {
        path: 'province',
        loadChildren: () => import('./province/province.module').then(m => m.HomeBuildingProvinceModule),
      },
      {
        path: 'document',
        loadChildren: () => import('./document/document.module').then(m => m.HomeBuildingDocumentModule),
      },
      {
        path: 'property',
        loadChildren: () => import('./property/property.module').then(m => m.HomeBuildingPropertyModule),
      },
      {
        path: 'property-category',
        loadChildren: () => import('./property-category/property-category.module').then(m => m.HomeBuildingPropertyCategoryModule),
      },
      {
        path: 'publishing-package',
        loadChildren: () => import('./publishing-package/publishing-package.module').then(m => m.HomeBuildingPublishingPackageModule),
      },
      {
        path: 'score',
        loadChildren: () => import('./score/score.module').then(m => m.HomeBuildingScoreModule),
      },
      {
        path: 'property-image',
        loadChildren: () => import('./property-image/property-image.module').then(m => m.HomeBuildingPropertyImageModule),
      },
      {
        path: 'image-category',
        loadChildren: () => import('./image-category/image-category.module').then(m => m.HomeBuildingImageCategoryModule),
      },
      {
        path: 'sale',
        loadChildren: () => import('./sale/sale.module').then(m => m.HomeBuildingSaleModule),
      },
      {
        path: 'rent',
        loadChildren: () => import('./rent/rent.module').then(m => m.HomeBuildingRentModule),
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.HomeBuildingOfferModule),
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.HomeBuildingRoleModule),
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.HomeBuildingNotificationModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class HomeBuildingEntityModule {}
