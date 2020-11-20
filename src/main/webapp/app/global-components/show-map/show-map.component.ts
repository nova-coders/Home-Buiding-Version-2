import { Component, OnInit } from '@angular/core';
import { ShowMapService } from 'app/global-services/show-map.service';
import { HttpResponse } from '@angular/common/http';
import { IProperty, Property } from 'app/shared/model/property.model';
import { ISale } from 'app/shared/model/sale.model';
import { PropertyService } from 'app/entities/property/property.service';
import { ProvinceService } from 'app/entities/province/province.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.scss'],
})
export class ShowMapComponent implements OnInit {
  lat = 9.9280694;
  lng = -84.0907246;
  zoom = 15;
  //oMarker?: Marker;
  markers = [];

  constructor(
    protected showMapService: ShowMapService,
    protected propertyService: PropertyService,
    protected provinceService: ProvinceService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }
  loadAll(): void {
    let myProperties;
    this.showMapService.query().subscribe((res: HttpResponse<any>) => res.body || []);
    this.showMapService.getByProvince().subscribe(response => {
      myProperties = response.body as Property;

      console.log(myProperties);
      // @ts-ignore
      for (let i = 0; i <= myProperties.length; i++) {
        let marker = new Marker();
        // @ts-ignore
        marker.property = myProperties[i];
        marker.lat = Number(myProperties[i].latitude);
        marker.lng = Number(myProperties[i].longitude);
        // @ts-ignore
        marker.icon = this.obtainIcon(myProperties[i].canton.province.id);
        // @ts-ignore
        this.markers.push(marker);
      }
    });
  }
  public obtainIcon(province: number): string {
    let iconChosen = '';
    switch (province) {
      case 1:
        iconChosen = '../../../content/images/marker-icon/marker-san-jose.png';
        break;
      case 2:
        iconChosen = '../../../content/images/marker-icon/marker-alajuela.png';
        break;
      case 3:
        iconChosen = '../../../content/images/marker-icon/marker-limon.png';
        break;
      case 4:
        iconChosen = '../../../content/images/marker-icon/marker-puntarenas.png';
        break;
      case 5:
        iconChosen = '../../../content/images/marker-icon/marker-cartago.png';
        break;
      case 6:
        iconChosen = '../../../content/images/marker-icon/marker-heredia.png';
        break;
      case 7:
        iconChosen = '../../../content/images/marker-icon/marker-guanacaste.png';
        break;
    }
    return iconChosen;
  }
}

export class Marker {
  public icon?: string;
  public lat?: number;
  public lng?: number;
  public property?: IProperty;

  constructor() {}
}
