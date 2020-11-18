import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'app/shared/model/offer.model';
import { UserAccount } from 'app/shared/model/user-account.model';
@Component({
  selector: 'jhi-card-offer',
  templateUrl: './card-offer.component.html',
  styleUrls: ['./card-offer.component.scss'],
})
export class CardOfferComponent implements OnInit {
  @Input() buyerName: string | undefined = 'Nombre del comprador';
  @Input() amount: string | undefined = 'Monto de la oferta';
  @Input() buyerImage: string | undefined = 'Imagen del comprador';
  @Input() buyerMessage: string | undefined = 'Mensaje del comprador';

  constructor() {}

  ngOnInit(): void {}
}
