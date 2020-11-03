import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPropertyCategory, PropertyCategory } from 'app/shared/model/property-category.model';
import { PropertyCategoryService } from './property-category.service';
import { PropertyCategoryComponent } from './property-category.component';
import { PropertyCategoryDetailComponent } from './property-category-detail.component';
import { PropertyCategoryUpdateComponent } from './property-category-update.component';

@Injectable({ providedIn: 'root' })
export class PropertyCategoryResolve implements Resolve<IPropertyCategory> {
  constructor(private service: PropertyCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPropertyCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((propertyCategory: HttpResponse<PropertyCategory>) => {
          if (propertyCategory.body) {
            return of(propertyCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PropertyCategory());
  }
}

export const propertyCategoryRoute: Routes = [
  {
    path: '',
    component: PropertyCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.propertyCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PropertyCategoryDetailComponent,
    resolve: {
      propertyCategory: PropertyCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.propertyCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PropertyCategoryUpdateComponent,
    resolve: {
      propertyCategory: PropertyCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.propertyCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PropertyCategoryUpdateComponent,
    resolve: {
      propertyCategory: PropertyCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.propertyCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
