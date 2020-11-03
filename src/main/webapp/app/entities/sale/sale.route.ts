import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISale, Sale } from 'app/shared/model/sale.model';
import { SaleService } from './sale.service';
import { SaleComponent } from './sale.component';
import { SaleDetailComponent } from './sale-detail.component';
import { SaleUpdateComponent } from './sale-update.component';

@Injectable({ providedIn: 'root' })
export class SaleResolve implements Resolve<ISale> {
  constructor(private service: SaleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISale> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sale: HttpResponse<Sale>) => {
          if (sale.body) {
            return of(sale.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Sale());
  }
}

export const saleRoute: Routes = [
  {
    path: '',
    component: SaleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.sale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SaleDetailComponent,
    resolve: {
      sale: SaleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.sale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SaleUpdateComponent,
    resolve: {
      sale: SaleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.sale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SaleUpdateComponent,
    resolve: {
      sale: SaleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.sale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
