import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  @ViewChild('msgBoxModal') msgBoxModal: any;

  titulo = 'Informacion';
  mensaje = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  public open(titulo: string, mensaje: string){
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.modalService.open(this.msgBoxModal, {ariaLabelledBy: 'modal-basic-title'});
  }
}
