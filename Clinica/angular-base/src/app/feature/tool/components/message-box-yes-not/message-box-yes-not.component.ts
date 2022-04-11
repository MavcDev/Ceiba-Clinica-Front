import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-box-yes-not',
  templateUrl: './message-box-yes-not.component.html',
  styleUrls: ['./message-box-yes-not.component.css']
})
export class MessageBoxYesNotComponent implements OnInit {

  @ViewChild('msgBoxModalYesNot') msgBoxModalYesNot: ElementRef;
  @Output() msgBoxEvent = new EventEmitter<boolean>();

  titulo = 'Mensaje de confirmación';
  mensaje = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public open(titulo: string, mensaje: string){
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.modalService.open(this.msgBoxModalYesNot, {ariaLabelledBy: 'modal-basic-title'}).result.then((data) => {
      this.sendEvent(data);
    });
  }

  sendEvent(data){
    let isYes = false;
    if (data === 'yes') {
      isYes = true;
    }
    this.msgBoxEvent.emit(isYes);
  }
}
