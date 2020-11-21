import { NgModule } from '@angular/core';
import { HomeBuildingSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { DownloadButtonComponent } from 'app/global-components/download-button/download-button.component';

@NgModule({
  imports: [HomeBuildingSharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, HasAnyAuthorityDirective, DownloadButtonComponent],
  exports: [
    HomeBuildingSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DownloadButtonComponent,
  ],
})
export class HomeBuildingSharedModule {}
