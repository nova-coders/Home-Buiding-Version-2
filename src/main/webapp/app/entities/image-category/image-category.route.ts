import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IImageCategory, ImageCategory } from 'app/shared/model/image-category.model';
import { ImageCategoryService } from './image-category.service';
import { ImageCategoryComponent } from './image-category.component';
import { ImageCategoryDetailComponent } from './image-category-detail.component';
import { ImageCategoryUpdateComponent } from './image-category-update.component';

@Injectable({ providedIn: 'root' })
export class ImageCategoryResolve implements Resolve<IImageCategory> {
  constructor(private service: ImageCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IImageCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((imageCategory: HttpResponse<ImageCategory>) => {
          if (imageCategory.body) {
            return of(imageCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ImageCategory());
  }
}

export const imageCategoryRoute: Routes = [
  {
    path: '',
    component: ImageCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.imageCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ImageCategoryDetailComponent,
    resolve: {
      imageCategory: ImageCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.imageCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ImageCategoryUpdateComponent,
    resolve: {
      imageCategory: ImageCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.imageCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ImageCategoryUpdateComponent,
    resolve: {
      imageCategory: ImageCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.imageCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
