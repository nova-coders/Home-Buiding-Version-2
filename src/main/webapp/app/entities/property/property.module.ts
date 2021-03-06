import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBuildingSharedModule } from 'app/shared/shared.module';
import { PropertyComponent } from './property.component';
import { PropertyDetailComponent } from './property-detail.component';
import { PropertyUpdateComponent } from './property-update.component';
import { PropertyDeleteDialogComponent } from './property-delete-dialog.component';
import { propertyRoute } from './property.route';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  imports: [
    HomeBuildingSharedModule,
    RouterModule.forChild(propertyRoute),
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0WA_0aYc0LYjQizsUml91CIAKUtQnoyQ',
      libraries: ['places'],
    }),
    NgxDropzoneModule,
    CurrencyMaskModule,
    DigitOnlyModule,
  ],
  declarations: [PropertyComponent, PropertyDetailComponent, PropertyUpdateComponent, PropertyDeleteDialogComponent],
  entryComponents: [PropertyDeleteDialogComponent],
})
export class HomeBuildingPropertyModule {}
