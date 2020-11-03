import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProperty, Property } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';
import { PropertyComponent } from './property.component';
import { PropertyDetailComponent } from './property-detail.component';
import { PropertyUpdateComponent } from './property-update.component';

@Injectable({ providedIn: 'root' })
export class PropertyResolve implements Resolve<IProperty> {
  constructor(private service: PropertyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProperty> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((property: HttpResponse<Property>) => {
          if (property.body) {
            return of(property.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Property());
  }
}

export const propertyRoute: Routes = [
  {
    path: '',
    component: PropertyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.property.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PropertyDetailComponent,
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
    path: 'new',
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
];
