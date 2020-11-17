import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from '../shared/shared.module';

import { accountState } from './auth.route';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LogInComponent } from './log-in/log-in.component';

@NgModule({
  imports: [HomeBuildingSharedModule, RouterModule.forChild(accountState), SignaturePadModule, NgxDropzoneModule],
  declarations: [LogInComponent],
})
export class AuthModule {}
