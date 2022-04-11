import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../shared/service/usuario.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxComponent } from 'src/app/feature/tool/components/message-box/message-box.component';
import { MessageBoxYesNotComponent } from 'src/app/feature/tool/components/message-box-yes-not/message-box-yes-not.component';

const MINIMA_LONGITUD_IDENTIFICACION = 6;
const MAXIMA_LONGITUD_IDENTIFICACION = 11;
const MAXIMA_LONGITUD_NOMBRE = 50;
const PATRON_SOLO_NUMERO_IDENTIFICACION = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
const PATRON_SIN_ESPACIO_AL_INICIO = /^\S/;
const PATRON_SIN_ESPACIO_AL_FINAL = /[\w]+[^\s]$/;

const TITULO_MENSAJE_ERROR = 'Error';
const TITULO_MENSAJE_VALIDACION = 'Validación';
const TITULO_MENSAJE_CONFIRMACION = 'Mensaje de confirmación';
const FALTAN_CAMPOS_POR_VALIDAR = 'Falta campos por validar';

const IDENTIFICACION = 'identificacion';
const REDIRIGIR_CREAR_SOLICITUD_URL = 'solicitudcita/crear';

const FORMATO_FECHA_HORA = 'yyyy-MM-dd hh:mm:ss';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  @ViewChild(MessageBoxComponent) mesageBox: MessageBoxComponent;
  @ViewChild(MessageBoxYesNotComponent) mesageBoxYesNot: MessageBoxYesNotComponent;

  usuarioForm: FormGroup;
  constructor(
    protected usuarioServices: UsuarioService,
    protected datepipe: DatePipe,
    protected router: Router,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const identificacionParam = this.route.snapshot.paramMap.get(IDENTIFICACION);
    this.construirFormularioUsuario(identificacionParam);
  }

  confirmacion(event) {
    if (event) {
      this.crear();
    }
  }

  confirmarCrear() {
    if (!this.usuarioForm.valid) {
      this.mostrarCajaTexto(TITULO_MENSAJE_VALIDACION, FALTAN_CAMPOS_POR_VALIDAR);
      return;
    }
    this.mesageBoxYesNot.open(TITULO_MENSAJE_CONFIRMACION, `Esta seguro de incribir el usuario con identificacion <b>${this.usuarioForm.value.identificacion}</b>.`);
  }

  crear() {
    const identificacion = this.usuarioForm.value.identificacion;
    this.usuarioServices.guardar(this.usuarioForm.value).subscribe(
      {
        next: () => { this.buscarUsuario(identificacion) },
        error: (excepcion) => this.mostrarCajaTexto(TITULO_MENSAJE_ERROR, excepcion?.error?.mensaje),
      }
    );
  }

  buscarUsuario(identificacion) {
    this.usuarioServices.consultar(identificacion).subscribe(
      {
        next: (response) => this.guardarYRedirigir(response),
        error: (excepcion) => this.mostrarCajaTexto(TITULO_MENSAJE_ERROR, excepcion?.error?.mensaje),
      });
  }

  guardarYRedirigir(respuestConsultar) {
    this.guardarSessionUsuario(respuestConsultar);
    this.redirigirACrearSolicitud(respuestConsultar.identificacion);
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

  construirFormularioUsuario(identificacion: string) {
    this.usuarioForm = new FormGroup({
      identificacion: new FormControl(identificacion, [
        Validators.required,
        Validators.minLength(MINIMA_LONGITUD_IDENTIFICACION),
        Validators.maxLength(MAXIMA_LONGITUD_IDENTIFICACION),
        Validators.pattern(PATRON_SOLO_NUMERO_IDENTIFICACION),
        Validators.pattern(PATRON_SIN_ESPACIO_AL_INICIO),
        Validators.pattern(PATRON_SIN_ESPACIO_AL_FINAL)
      ]),
      nombres: new FormControl(null, [
        Validators.required,
        Validators.maxLength(MAXIMA_LONGITUD_NOMBRE),
        Validators.pattern(PATRON_SIN_ESPACIO_AL_INICIO),
        Validators.pattern(PATRON_SIN_ESPACIO_AL_FINAL)
      ]),
      primerApellido: new FormControl(null, [
        Validators.required,
        Validators.maxLength(MAXIMA_LONGITUD_NOMBRE),
        Validators.pattern(PATRON_SIN_ESPACIO_AL_INICIO),
        Validators.pattern(PATRON_SIN_ESPACIO_AL_FINAL)
      ]),
      segundoApellido: new FormControl(null, [
        Validators.maxLength(MAXIMA_LONGITUD_NOMBRE),
        Validators.pattern(PATRON_SIN_ESPACIO_AL_INICIO),
        Validators.pattern(PATRON_SIN_ESPACIO_AL_FINAL)
      ]),
      fechaNacimiento: new FormControl(null, [Validators.required]),
      fechaCreacion: new FormControl(this.datepipe.transform(new Date(), FORMATO_FECHA_HORA))
    });
  }
}
