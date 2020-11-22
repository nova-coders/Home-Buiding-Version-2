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
  markers: any;

  constructor(
    protected showMapService: ShowMapService,
    protected propertyService: PropertyService,
    protected provinceService: ProvinceService,
    protected activatedRoute: ActivatedRoute
  ) {
    this.markers = [];
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    let myProperties;
    this.propertyService.getBySale().subscribe((res: any) => {
      myProperties = res.body;

      console.log(myProperties);
      for (let i = 0; i < myProperties.length; i++) {
        let marker = {
          id: i,
          property: myProperties[i],
          lat: Number(myProperties[i].latitude),
          lng: Number(myProperties[i].longitude),
          icon: this.obtainIcon(myProperties[i].canton.province.id),
        };
        this.markers.push(marker);
      }
    });
  }

  loadByProvince(indexProvince: number): void {
    this.markers = [];
    let myProperties;
    this.propertyService.getBySale().subscribe((res: any) => {
      myProperties = res.body;

      console.log(myProperties);
      for (let i = 0; i < myProperties.length; i++) {
        if (myProperties[i].canton.province.id == indexProvince) {
          let marker = {
            id: i,
            property: myProperties[i],
            lat: Number(myProperties[i].latitude),
            lng: Number(myProperties[i].longitude),
            icon: this.obtainIcon(myProperties[i].canton.province.id),
          };
          this.markers.push(marker);
        }
      }
    });
  }

  loadByCanton(indexCanton: number): void {
    this.markers = [];
    let myProperties;
    this.propertyService.getBySale().subscribe((res: any) => {
      myProperties = res.body;
      console.log(myProperties);
      for (let i = 0; i < myProperties.length; i++) {
        if (myProperties[i].canton.id === indexCanton) {
          let marker = {
            id: i,
            property: myProperties[i],
            lat: Number(myProperties[i].latitude),
            lng: Number(myProperties[i].longitude),
            icon: this.obtainIcon(myProperties[i].canton.province.id),
          };
          this.markers.push(marker);
        }
      }
    });
  }

  loadByCategory(indexCategory: number): void {
    this.markers = [];
    let myProperties;
    this.propertyService.getBySale().subscribe((res: any) => {
      myProperties = res.body;
      console.log(myProperties);
      for (let i = 0; i < myProperties.length; i++) {
        if (myProperties[i].propertyCategory === indexCategory) {
          let marker = {
            id: i,
            property: myProperties[i],
            lat: Number(myProperties[i].latitude),
            lng: Number(myProperties[i].longitude),
            icon: this.obtainIcon(myProperties[i].canton.province.id),
          };
          this.markers.push(marker);
        }
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
