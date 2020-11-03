import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMoneyType, MoneyType } from 'app/shared/model/money-type.model';
import { MoneyTypeService } from './money-type.service';
import { MoneyTypeComponent } from './money-type.component';
import { MoneyTypeDetailComponent } from './money-type-detail.component';
import { MoneyTypeUpdateComponent } from './money-type-update.component';

@Injectable({ providedIn: 'root' })
export class MoneyTypeResolve implements Resolve<IMoneyType> {
  constructor(private service: MoneyTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMoneyType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((moneyType: HttpResponse<MoneyType>) => {
          if (moneyType.body) {
            return of(moneyType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MoneyType());
  }
}

export const moneyTypeRoute: Routes = [
  {
    path: '',
    component: MoneyTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.moneyType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MoneyTypeDetailComponent,
    resolve: {
      moneyType: MoneyTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.moneyType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MoneyTypeUpdateComponent,
    resolve: {
      moneyType: MoneyTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.moneyType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MoneyTypeUpdateComponent,
    resolve: {
      moneyType: MoneyTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.moneyType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
