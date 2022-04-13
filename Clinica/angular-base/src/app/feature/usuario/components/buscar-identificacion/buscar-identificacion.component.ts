import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioData } from '@shared/model/Usuario/usuario-data';
import { UsuarioService } from '../../shared/service/usuario.service';
import { CajaMensajeCrearUsuarioComponent } from '../caja-mensaje-crear-usuario/caja-mensaje-crear-usuario.component';

const MINIMA_LONGITUD_IDENTIFICACION = 6;
const MAXIMA_LONGITUD_IDENTIFICACION = 11;
const PATRON_SOLO_NUMERO_IDENTIFICACION = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

const NOT_FOUND = 404;

const REDIRIGIR_CREAR_SOLICITUD_URL = 'solicitud/crear';
const REDIRIGIR_CREAR_USUARIO_URL = '/usuario/crear';

@Component({
  selector: 'app-buscar-identificacion',
  templateUrl: './buscar-identificacion.component.html',
  styles: ['']
})
export class BuscarIdentificacionComponent implements OnInit {

  @ViewChild(CajaMensajeCrearUsuarioComponent) cajaMensajeCrearUsuario: CajaMensajeCrearUsuarioComponent;

  usuarioForm: FormGroup;

  constructor(private usuarioServices: UsuarioService, private router: Router) { }

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
    throw new Error(excepcion?.error?.mensaje);
  }

  mostrarMensajeCrear(identificacion: string) {
    this.cajaMensajeCrearUsuario.abrir(identificacion);
  }

  confirmadoCrear(event: boolean) {
    if (event) {
      this.redirigirACrearusuario(this.cajaMensajeCrearUsuario.identificacion);
    }
  }

  guardarSessionUsuario(usuario: UsuarioData) {
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
