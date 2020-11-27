import { Component, OnInit } from '@angular/core';
import { Property } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property/property.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Province } from 'app/shared/model/province.model';
import { ProvinceService } from 'app/entities/province/province.service';

@Component({
  selector: 'jhi-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.scss'],
})
export class ListSalesComponent implements OnInit {
  public propertyList: Array<Property> = [];
  public provinceList: Array<Province> = [];
  public provinceService: ProvinceService;
  public currentProvinceId: number;
  propertyService: PropertyService;
  constructor(service: PropertyService, private pService: ProvinceService) {
    this.propertyService = service;
    this.currentProvinceId = 1;
    this.provinceService = pService;
    this.propertyService.getPropertiesOnSale().subscribe(res => {
      console.log('Event fired!');
      this.propertyList = res.body as Array<Property>;
      console.log(this.propertyList);
    });

    //Obtención de provincias
    this.provinceService.getAll().subscribe(res => {
      this.provinceList = res.body as Array<Province>;
    });
  }
  ngOnInit(): void {}

  /* loadCurrentCantons(): void {

    var elementSlt = document.getElementById('sltProvincias');
    if(elementSlt != null){
      var currentProvince = elementSlt.value;

    }
    if (currentProvince != null) {
      this.currentProvinceId = Number.parseInt(currentProvince);
    }
  }
   */
}
