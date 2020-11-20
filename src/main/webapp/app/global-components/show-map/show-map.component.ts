import { Component, OnInit } from '@angular/core';
import { ShowMapService } from 'app/global-services/show-map.service';
import { HttpResponse } from '@angular/common/http';
import { IProperty, Property } from 'app/shared/model/property.model';
import { ISale } from 'app/shared/model/sale.model';
import { PropertyService } from 'app/entities/property/property.service';
import { ProvinceService } from 'app/entities/province/province.service';
import { IProvince, Province } from 'app/shared/model/province.model';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'app/shared/model/offer.model';

@Component({
  selector: 'jhi-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.scss'],
})
export class ShowMapComponent implements OnInit {
  lat = 9.9280694;
  lng = -84.0907246;
  zoom = 15;
  properties: IProperty[] = [];
  sales: ISale[] = [];
  oMarker?: Marker;
  markers = [];

  constructor(
    protected showMapService: ShowMapService,
    protected propertyService: PropertyService,
    protected provinceService: ProvinceService,
    protected activatedRoute: ActivatedRoute
  ) {}
  loadAll(): void {
    this.propertyService.query().subscribe((res: HttpResponse<IProperty[]>) => (this.properties = res.body || []));
    // @ts-ignore
    for (let i = 0; i <= this.properties.length; i++) {
      let marker = new Marker();
      // @ts-ignore
      marker.property = this.properties[i];
      // @ts-ignore
      marker.icon = this.obtainIcon(this.properties[i].canton.province.id);
      // @ts-ignore
      this.markers.push(marker);
    }
  }

  ngOnInit(): void {
    this.loadAll();
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
  public property?: Property;
  constructor() {}
}
