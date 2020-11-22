import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { HomeBuildingSharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeBuildingSharedModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0WA_0aYc0LYjQizsUml91CIAKUtQnoyQ',
      libraries: ['places'],
    }),
  ],
})
export class ShowMapModule {}
