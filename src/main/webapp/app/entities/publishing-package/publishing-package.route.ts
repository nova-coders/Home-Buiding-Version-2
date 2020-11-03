import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPublishingPackage, PublishingPackage } from 'app/shared/model/publishing-package.model';
import { PublishingPackageService } from './publishing-package.service';
import { PublishingPackageComponent } from './publishing-package.component';
import { PublishingPackageDetailComponent } from './publishing-package-detail.component';
import { PublishingPackageUpdateComponent } from './publishing-package-update.component';

@Injectable({ providedIn: 'root' })
export class PublishingPackageResolve implements Resolve<IPublishingPackage> {
  constructor(private service: PublishingPackageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPublishingPackage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((publishingPackage: HttpResponse<PublishingPackage>) => {
          if (publishingPackage.body) {
            return of(publishingPackage.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PublishingPackage());
  }
}

export const publishingPackageRoute: Routes = [
  {
    path: '',
    component: PublishingPackageComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.publishingPackage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PublishingPackageDetailComponent,
    resolve: {
      publishingPackage: PublishingPackageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.publishingPackage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PublishingPackageUpdateComponent,
    resolve: {
      publishingPackage: PublishingPackageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.publishingPackage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PublishingPackageUpdateComponent,
    resolve: {
      publishingPackage: PublishingPackageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.publishingPackage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
