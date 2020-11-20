import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'app/shared/model/offer.model';

@Component({
  selector: 'jhi-modal-bid',
  templateUrl: './modal-bid.component.html',
  styleUrls: ['./modal-bid.component.scss'],
})
export class ModalBidComponent implements OnInit {
  @Input() maximumBid = 0;
  public offer: Offer;
  public hasError = false;
  constructor() {
    this.offer = new Offer();
  }

  ngOnInit(): void {}
  public offerProperty(): void {}
}
