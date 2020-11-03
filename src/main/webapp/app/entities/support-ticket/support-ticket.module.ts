import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { SupportTicketComponent } from './support-ticket.component';
import { SupportTicketDetailComponent } from './support-ticket-detail.component';
import { SupportTicketUpdateComponent } from './support-ticket-update.component';
import { SupportTicketDeleteDialogComponent } from './support-ticket-delete-dialog.component';
import { supportTicketRoute } from './support-ticket.route';

@NgModule({
  imports: [HomeBuildingSharedModule, RouterModule.forChild(supportTicketRoute)],
  declarations: [SupportTicketComponent, SupportTicketDetailComponent, SupportTicketUpdateComponent, SupportTicketDeleteDialogComponent],
  entryComponents: [SupportTicketDeleteDialogComponent],
})
export class HomeBuildingSupportTicketModule {}
