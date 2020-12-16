import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'jhi-search-auction',
  templateUrl: './search-auction.component.html',
  styleUrls: ['./search-auction.component.scss'],
})
export class SearchAuctionComponent implements OnInit {
  @Input() criterio = 'id';
  @Input() date: any = [];
  @Output() datefilter = new EventEmitter<never[]>();
  public text = '';

  constructor() {}

  public ngOnInit() {}

  public search(): void {
    this.datefilter.emit(this.date.filter(this.calback, this));
  }

  public calback(element: any, index: any, array: any) {
    if (isNaN(element[`${this.criterio}`])) {
      console.log(element[`${this.criterio}`].trim().toLowerCase().indexOf(this.text.trim().toLowerCase()) > -1);
      return element[`${this.criterio}`].trim().toLowerCase().indexOf(this.text.trim().toLowerCase()) > -1;
    } else {
      return element[`${this.criterio}`] + '' === this.text;
    }
  }
}
