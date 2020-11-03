import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISupportTicketLog, SupportTicketLog } from 'app/shared/model/support-ticket-log.model';
import { SupportTicketLogService } from './support-ticket-log.service';
import { SupportTicketLogComponent } from './support-ticket-log.component';
import { SupportTicketLogDetailComponent } from './support-ticket-log-detail.component';
import { SupportTicketLogUpdateComponent } from './support-ticket-log-update.component';

@Injectable({ providedIn: 'root' })
export class SupportTicketLogResolve implements Resolve<ISupportTicketLog> {
  constructor(private service: SupportTicketLogService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupportTicketLog> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((supportTicketLog: HttpResponse<SupportTicketLog>) => {
          if (supportTicketLog.body) {
            return of(supportTicketLog.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SupportTicketLog());
  }
}

export const supportTicketLogRoute: Routes = [
  {
    path: '',
    component: SupportTicketLogComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.supportTicketLog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SupportTicketLogDetailComponent,
    resolve: {
      supportTicketLog: SupportTicketLogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.supportTicketLog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SupportTicketLogUpdateComponent,
    resolve: {
      supportTicketLog: SupportTicketLogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.supportTicketLog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SupportTicketLogUpdateComponent,
    resolve: {
      supportTicketLog: SupportTicketLogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.supportTicketLog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
