import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { ProfessionalProfileUserComponent } from './professional-profile-user.component';
import { ProfessionalProfileUserDetailComponent } from './professional-profile-user-detail.component';
import { ProfessionalProfileUserUpdateComponent } from './professional-profile-user-update.component';
import { ProfessionalProfileUserDeleteDialogComponent } from './professional-profile-user-delete-dialog.component';
import { professionalProfileUserRoute } from './professional-profile-user.route';

@NgModule({
  imports: [HomeBuildingSharedModule, RouterModule.forChild(professionalProfileUserRoute)],
  declarations: [
    ProfessionalProfileUserComponent,
    ProfessionalProfileUserDetailComponent,
    ProfessionalProfileUserUpdateComponent,
    ProfessionalProfileUserDeleteDialogComponent,
  ],
  entryComponents: [ProfessionalProfileUserDeleteDialogComponent],
})
export class HomeBuildingProfessionalProfileUserModule {}
