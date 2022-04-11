import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageBoxComponent } from 'src/app/feature/tool/components/message-box/message-box.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../shared/service/usuario.service';

const MINIMA_LONGITUD_IDENTIFICACION = 6;
const MAXIMA_LONGITUD_IDENTIFICACION = 11;
const PATRON_SOLO_NUMERO_IDENTIFICACION = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
const REDIRIGIR = 'redirigir';
const TITULO_MENSAJE_ERROR = 'Error';

const NOT_FOUND = 404;

const REDIRIGIR_CREAR_SOLICITUD_URL = 'solicitudcita/crear';
const REDIRIGIR_CREAR_USUARIO_URL = '/usuario/crear';

@Component({
  selector: 'app-buscar-identificacion',
  templateUrl: './buscar-identificacion.component.html',
  styleUrls: ['./buscar-identificacion.component.css']
})
export class BuscarIdentificacionComponent implements OnInit {

  @ViewChild(MessageBoxComponent) mesageBox: MessageBoxComponent;
  @ViewChild('msgBoxModalCrear') msgBoxModalCrear: ElementRef;

  usuarioForm: FormGroup;
  tituloMensaje: string;
  mensaje: string;

  constructor(private usuarioServices: UsuarioService, private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.construirFormulario();
  }

  construirFormulario() {
    this.usuarioForm = new FormGroup({
      identificacion: new FormControl(null, [
        Validators.required,
        Validators.minLength(MINIMA_LONGITUD_IDENTIFICACION),
        Validators.maxLength(MAXIMA_LONGITUD_IDENTIFICACION),
        Validators.pattern(PATRON_SOLO_NUMERO_IDENTIFICACION)
      ])
    });
  }

  buscar() {
    const identificacion = this.usuarioForm.value.identificacion;
    this.usuarioServices.consultar(identificacion).subscribe(
      {
        next: (response) => this.guardarYRedirigir(response),
        error: (error) => this.mostrarMensajePorExepcionBuscar(error, identificacion),
      });
  }

  guardarYRedirigir(respuestConsultar) {
    this.guardarSessionUsuario(respuestConsultar);
    this.redirigirACrearSolicitud(respuestConsultar.identificacion);
  }

  mostrarMensajePorExepcionBuscar(excepcion, identificacion) {
    if (excepcion.status === NOT_FOUND) {
      this.mostrarMensajeCrear(identificacion);
      return;
    }
    this.mostrarCajaTexto(TITULO_MENSAJE_ERROR, excepcion?.error?.mensaje);
  }

  mostrarMensajeCrear(identificacion: string) {
    this.mensaje = `El usuario con la identificacion <b> ${identificacion} </b> no se encuentra inscrito, realice este proceso para poder realizar la solicitud de la cita.`;
    this.modalService.open(this.msgBoxModalCrear, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === REDIRIGIR) {
        this.redirigirACrearusuario(identificacion);
      }
    });
  }

  mostrarCajaTexto(titulo = 'Error', mensaje = 'Ocurrio un error inesperado.') {
    this.mesageBox.open(titulo, mensaje);
  }

  guardarSessionUsuario(usuario) {
    localStorage.clear();
    localStorage.setItem(usuario.identificacion, JSON.stringify(usuario));
  }

  redirigirACrearSolicitud(identificacion: string) {
    this.router.navigate([REDIRIGIR_CREAR_SOLICITUD_URL, { identificacion }]);
  }

  redirigirACrearusuario(identificacion: string) {
    this.router.navigate([REDIRIGIR_CREAR_USUARIO_URL, { identificacion }]);
  }
}
