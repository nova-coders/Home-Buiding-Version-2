import { Component, OnInit } from '@angular/core';
import { Property } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property/property.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Province } from 'app/shared/model/province.model';
import { ProvinceService } from 'app/entities/province/province.service';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';

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
  constructor(
    service: PropertyService,
    private route: ActivatedRoute,
    private pService: ProvinceService,
    private seeAuctionService: SeeAuctionService
  ) {
    this.propertyService = service;
    this.provinceService = pService;
    this.currentProvinceId = 1;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //Obtención de propiedades
      this.propertyService.getPropertiesOnSale().subscribe(res => {
        this.propertyList = res.body as Array<Property>;

        for (let ind = 0; ind < this.propertyList.length; ind++) {
          this.seeAuctionService.getAuctionImgs(this.propertyList[ind].id as number).subscribe(response => {
            this.propertyList[ind].propertyImages = response;
          });
        }
      });

      //Obtención de provincias
      this.provinceService.getAll().subscribe(res => {
        this.provinceList = res.body as Array<Province>;
      });
    });
  }
}
