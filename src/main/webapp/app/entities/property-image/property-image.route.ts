import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPropertyImage, PropertyImage } from 'app/shared/model/property-image.model';
import { PropertyImageService } from './property-image.service';
import { PropertyImageComponent } from './property-image.component';
import { PropertyImageDetailComponent } from './property-image-detail.component';
import { PropertyImageUpdateComponent } from './property-image-update.component';

@Injectable({ providedIn: 'root' })
export class PropertyImageResolve implements Resolve<IPropertyImage> {
  constructor(private service: PropertyImageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPropertyImage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((propertyImage: HttpResponse<PropertyImage>) => {
          if (propertyImage.body) {
            return of(propertyImage.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PropertyImage());
  }
}

export const propertyImageRoute: Routes = [
  {
    path: '',
    component: PropertyImageComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.propertyImage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PropertyImageDetailComponent,
    resolve: {
      propertyImage: PropertyImageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.propertyImage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PropertyImageUpdateComponent,
    resolve: {
      propertyImage: PropertyImageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.propertyImage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PropertyImageUpdateComponent,
    resolve: {
      propertyImage: PropertyImageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.propertyImage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
