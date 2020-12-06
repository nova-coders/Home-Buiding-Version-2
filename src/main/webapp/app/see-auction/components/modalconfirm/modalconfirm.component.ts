import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'jhi-modalconfirm',
  templateUrl: './modalconfirm.component.html',
  styleUrls: ['./modalconfirm.component.scss'],
})
export class ModalconfirmComponent implements OnInit {
  @Input() title = 'Mensaje de confirmación';
  @Input() message = '¿Seguro que dese realizar la acción?';
  @Input() btnAceptStyle = 'btn btn-secondary';
  @Input() btnCancelStyle = 'btn btn-primary';
  @Input() btnAceptName = 'Aceptar';
  @Input() btnName = 'Confirmar';
  @Input() btnCancelName = 'Cancelar';
  @Output() acept = new EventEmitter<any>();

  constructor() {}
  public ngOnInit() {}
  public aceptFunction() {
    this.acept.emit(true);
  }
  public cancelFunction() {
    this.acept.emit(false);
  }
}
