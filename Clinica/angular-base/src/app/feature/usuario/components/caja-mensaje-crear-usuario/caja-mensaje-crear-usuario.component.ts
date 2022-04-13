import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caja-mensaje-crear-usuario',
  templateUrl: './caja-mensaje-crear-usuario.component.html',
  styles: ['']
})
export class CajaMensajeCrearUsuarioComponent {

  @ViewChild('cajamensajecrearusuario') cajaMensajeCrear: ElementRef;
  @Output() emitirEvento = new EventEmitter<boolean>();

  identificacion: string;

  constructor(private modalService: NgbModal) { }

  public abrir(identifciacion: string) {
    this.identificacion = identifciacion;
    this.modalService.open(this.cajaMensajeCrear, { ariaLabelledBy: 'modal-basic-title' }).result.then((data) => {
      this.enviarConfirmacion(data);
    });
  }

  enviarConfirmacion(data) {
    let isYes = false;
    if (data === 'yes') {
      isYes = true;
    }
    this.emitirEvento.emit(isYes);
  }
}
