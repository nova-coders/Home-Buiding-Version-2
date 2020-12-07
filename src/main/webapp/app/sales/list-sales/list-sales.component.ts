import { Component, OnInit } from '@angular/core';
import { Property } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property/property.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Province } from 'app/shared/model/province.model';
import { ProvinceService } from 'app/entities/province/province.service';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';
import { CantonService } from 'app/entities/canton/canton.service';
import { Canton } from 'app/shared/model/canton.model';

@Component({
  selector: 'jhi-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.scss'],
})
export class ListSalesComponent implements OnInit {
  public propertyList: Array<Property> = [];
  public provinceList: Array<Province> = [];
  public cantonList: Array<Canton> = [];
  public provinceService: ProvinceService;
  public currentProvinceId: number;
  public currentCantonId: number;
  propertyService: PropertyService;
  public cantonService: CantonService;
  public initPage: number = 1;
  constructor(
    service: PropertyService,
    private route: ActivatedRoute,
    private pService: ProvinceService,
    private seeAuctionService: SeeAuctionService,
    private cService: CantonService
  ) {
    this.propertyService = service;
    this.currentProvinceId = 1;
    this.currentCantonId = 1;
    this.provinceService = pService;
    this.currentProvinceId = 1;
    this.cantonService = cService;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      var mapBlock = document.querySelector('.map-div .col-md-8');
      if (mapBlock != null) {
        mapBlock.classList.add('col-12');
        mapBlock.classList.remove('col-md-8');
      }
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

  loadCantones(): void {
    if (this.currentProvinceId != null) {
      console.log('Load cantones from province #' + this.currentProvinceId);
      this.cantonService.findByProvince(this.currentProvinceId).subscribe(res => {
        this.cantonList = res.body as Array<Canton>;
      });
    }
  }
  filterProperty(): void {
    console.log('Filtering properties by canton!');
    this.propertyList = [];
    if (this.currentCantonId != null) {
      this.propertyService.getPropertiesOnSaleByCantonId(this.currentCantonId).subscribe(res => {
        this.propertyList = res.body as Array<Property>;

        for (let ind = 0; ind < this.propertyList.length; ind++) {
          this.seeAuctionService.getAuctionImgs(this.propertyList[ind].id as number).subscribe(response => {
            this.propertyList[ind].propertyImages = response;
          });
        }
      });
    } else {
      this.propertyService.getPropertiesOnSale().subscribe(res => {
        this.propertyList = res.body as Array<Property>;

        for (let ind = 0; ind < this.propertyList.length; ind++) {
          this.seeAuctionService.getAuctionImgs(this.propertyList[ind].id as number).subscribe(response => {
            this.propertyList[ind].propertyImages = response;
          });
        }
      });
    }
  }
}
