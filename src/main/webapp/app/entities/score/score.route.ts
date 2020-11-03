import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IScore, Score } from 'app/shared/model/score.model';
import { ScoreService } from './score.service';
import { ScoreComponent } from './score.component';
import { ScoreDetailComponent } from './score-detail.component';
import { ScoreUpdateComponent } from './score-update.component';

@Injectable({ providedIn: 'root' })
export class ScoreResolve implements Resolve<IScore> {
  constructor(private service: ScoreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IScore> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((score: HttpResponse<Score>) => {
          if (score.body) {
            return of(score.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Score());
  }
}

export const scoreRoute: Routes = [
  {
    path: '',
    component: ScoreComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.score.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ScoreDetailComponent,
    resolve: {
      score: ScoreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.score.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ScoreUpdateComponent,
    resolve: {
      score: ScoreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.score.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ScoreUpdateComponent,
    resolve: {
      score: ScoreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.score.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
