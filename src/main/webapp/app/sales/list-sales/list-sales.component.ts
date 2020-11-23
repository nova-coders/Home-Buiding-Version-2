import { Component, OnInit } from '@angular/core';
import { Property } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property/property.service';

@Component({
  selector: 'jhi-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.scss'],
})
export class ListSalesComponent implements OnInit {
  public propertyList: Array<Property> = [];

  propertyService: PropertyService;
  constructor(service: PropertyService) {
    this.propertyService = service;
  }

  ngOnInit(): void {
    this.propertyService.getPropertiesOnSale().subscribe(res => {
      this.propertyList = res.body as Array<Property>;
      console.log(this.propertyList);
    });
  }
}
