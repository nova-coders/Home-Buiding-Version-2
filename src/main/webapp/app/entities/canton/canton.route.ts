import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICanton, Canton } from 'app/shared/model/canton.model';
import { CantonService } from './canton.service';
import { CantonComponent } from './canton.component';
import { CantonDetailComponent } from './canton-detail.component';
import { CantonUpdateComponent } from './canton-update.component';

@Injectable({ providedIn: 'root' })
export class CantonResolve implements Resolve<ICanton> {
  constructor(private service: CantonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICanton> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((canton: HttpResponse<Canton>) => {
          if (canton.body) {
            return of(canton.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Canton());
  }
}

export const cantonRoute: Routes = [
  {
    path: '',
    component: CantonComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.canton.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CantonDetailComponent,
    resolve: {
      canton: CantonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.canton.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CantonUpdateComponent,
    resolve: {
      canton: CantonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.canton.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CantonUpdateComponent,
    resolve: {
      canton: CantonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.canton.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
