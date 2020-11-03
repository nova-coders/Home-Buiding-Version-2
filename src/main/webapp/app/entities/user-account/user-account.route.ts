import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserAccount, UserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from './user-account.service';
import { UserAccountComponent } from './user-account.component';
import { UserAccountDetailComponent } from './user-account-detail.component';
import { UserAccountUpdateComponent } from './user-account-update.component';

@Injectable({ providedIn: 'root' })
export class UserAccountResolve implements Resolve<IUserAccount> {
  constructor(private service: UserAccountService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserAccount> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userAccount: HttpResponse<UserAccount>) => {
          if (userAccount.body) {
            return of(userAccount.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserAccount());
  }
}

export const userAccountRoute: Routes = [
  {
    path: '',
    component: UserAccountComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.userAccount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserAccountDetailComponent,
    resolve: {
      userAccount: UserAccountResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.userAccount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserAccountUpdateComponent,
    resolve: {
      userAccount: UserAccountResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.userAccount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserAccountUpdateComponent,
    resolve: {
      userAccount: UserAccountResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.userAccount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
