import { Component, OnInit } from '@angular/core';
import { Property } from 'app/shared/model/property.model';

@Component({
  selector: 'jhi-property-block',
  templateUrl: './property-block.component.html',
  styleUrls: ['./property-block.component.scss'],
})
export class PropertyBlockComponent implements OnInit {
  public property: Property;
  constructor(public prop: Property) {
    this.property = prop;
  }

  ngOnInit(): void {}
}
