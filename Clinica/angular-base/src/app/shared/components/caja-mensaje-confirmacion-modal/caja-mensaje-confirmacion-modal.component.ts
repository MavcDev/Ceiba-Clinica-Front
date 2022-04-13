import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caja-mensaje-confirmacion-modal',
  templateUrl: './caja-mensaje-confirmacion-modal.component.html',
  styles: ['']
})
export class CajaMensajeConfirmacionModalComponent {

  @ViewChild('cajaMensajeConfirmacion') cajaMensajeConfirmacion: ElementRef;
  @Output() emitirEvento = new EventEmitter<boolean>();

  titulo = 'Mensaje de confirmación';
  mensaje = '';

  constructor(private modalService: NgbModal) { }

  abrir(titulo: string, mensaje: string) {
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.modalService.open(this.cajaMensajeConfirmacion, { ariaLabelledBy: 'modal-basic-title' }).result.then((data) => {
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
