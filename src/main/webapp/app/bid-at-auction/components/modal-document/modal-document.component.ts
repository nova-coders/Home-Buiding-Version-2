import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-modal-document',
  templateUrl: './modal-document.component.html',
  styleUrls: ['./modal-document.component.scss'],
})
export class ModalDocumentComponent implements OnInit {
  @Input() title = 'Documento';
  @Input() baseg4File = '';
  @Input() btnName = '';
  constructor() {}

  ngOnInit(): void {}
  public setSrcIframe(): void {
    document.getElementById('cadastralPlanDocument')?.setAttribute('src', this.baseg4File);
  }
}
