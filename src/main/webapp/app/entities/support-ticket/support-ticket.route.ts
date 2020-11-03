import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISupportTicket, SupportTicket } from 'app/shared/model/support-ticket.model';
import { SupportTicketService } from './support-ticket.service';
import { SupportTicketComponent } from './support-ticket.component';
import { SupportTicketDetailComponent } from './support-ticket-detail.component';
import { SupportTicketUpdateComponent } from './support-ticket-update.component';

@Injectable({ providedIn: 'root' })
export class SupportTicketResolve implements Resolve<ISupportTicket> {
  constructor(private service: SupportTicketService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupportTicket> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((supportTicket: HttpResponse<SupportTicket>) => {
          if (supportTicket.body) {
            return of(supportTicket.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SupportTicket());
  }
}

export const supportTicketRoute: Routes = [
  {
    path: '',
    component: SupportTicketComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.supportTicket.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SupportTicketDetailComponent,
    resolve: {
      supportTicket: SupportTicketResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.supportTicket.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SupportTicketUpdateComponent,
    resolve: {
      supportTicket: SupportTicketResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.supportTicket.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SupportTicketUpdateComponent,
    resolve: {
      supportTicket: SupportTicketResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'homeBuildingApp.supportTicket.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
