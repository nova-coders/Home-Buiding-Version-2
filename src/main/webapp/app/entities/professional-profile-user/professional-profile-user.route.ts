import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfessionalProfileUser, ProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';
import { ProfessionalProfileUserService } from './professional-profile-user.service';
import { ProfessionalProfileUserComponent } from './professional-profile-user.component';
import { ProfessionalProfileUserDetailComponent } from './professional-profile-user-detail.component';
import { ProfessionalProfileUserUpdateComponent } from './professional-profile-user-update.component';

@Injectable({ providedIn: 'root' })
export class ProfessionalProfileUserResolve implements Resolve<IProfessionalProfileUser> {
  constructor(private service: ProfessionalProfileUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfessionalProfileUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((professionalProfileUser: HttpResponse<ProfessionalProfileUser>) => {
          if (professionalProfileUser.body) {
            return of(professionalProfileUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfessionalProfileUser());
  }
}

export const professionalProfileUserRoute: Routes = [
  {
    path: '',
    component: ProfessionalProfileUserComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.professionalProfileUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfessionalProfileUserDetailComponent,
    resolve: {
      professionalProfileUser: ProfessionalProfileUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.professionalProfileUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfessionalProfileUserUpdateComponent,
    resolve: {
      professionalProfileUser: ProfessionalProfileUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.professionalProfileUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfessionalProfileUserUpdateComponent,
    resolve: {
      professionalProfileUser: ProfessionalProfileUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.professionalProfileUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
