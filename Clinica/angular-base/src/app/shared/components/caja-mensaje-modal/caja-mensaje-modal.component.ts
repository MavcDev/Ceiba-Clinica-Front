import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caja-mensaje-modal',
  templateUrl: './caja-mensaje-modal.component.html',
  styles: ['']
})
export class CajaMensajeModalComponent {
  @ViewChild('cajaMensajeModal') cajaMensajeModal: ElementRef;
  titulo = 'Informacion';
  mensaje = '';

  constructor(private modalService: NgbModal) { }

  public abrir(titulo: string, mensaje: string) {
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.modalService.open(this.cajaMensajeModal, { ariaLabelledBy: 'modal-basic-title' });
  }
}
