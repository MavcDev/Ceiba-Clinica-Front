import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caja-mensaje-error-modal',
  templateUrl: './caja-mensaje-error-modal.component.html',
  styles: ['']
})
export class CajaMensajeErrorModalComponent {
  titulo: string;
  mensaje: string;

  constructor(public activeModal: NgbActiveModal) { }
}
