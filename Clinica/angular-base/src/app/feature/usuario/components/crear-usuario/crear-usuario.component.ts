import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../shared/service/usuario.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CajaMensajeConfirmacionModalComponent } from '@shared/components/caja-mensaje-confirmacion-modal/caja-mensaje-confirmacion-modal.component';
import { CajaMensajeModalComponent } from '@shared/components/caja-mensaje-modal/caja-mensaje-modal.component';

const MINIMA_LONGITUD_IDENTIFICACION = 6;
const MAXIMA_LONGITUD_IDENTIFICACION = 11;
const MAXIMA_LONGITUD_NOMBRE = 50;
const PATRON_SOLO_NUMERO_IDENTIFICACION = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
const PATRON_SIN_ESPACIO_AL_INICIO = /^\S/;
const PATRON_SIN_ESPACIO_AL_FINAL = /[\w]+[^\s]$/;

const TITULO_MENSAJE_VALIDACION = 'Validación';
const TITULO_MENSAJE_CONFIRMACION = 'Mensaje de confirmación';
const FALTAN_CAMPOS_POR_VALIDAR = 'Falta campos por validar';

const IDENTIFICACION = 'identificacion';
const REDIRIGIR_CREAR_SOLICITUD_URL = 'solicitud/crear';

const FORMATO_FECHA_HORA = 'yyyy-MM-dd hh:mm:ss';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styles: ['']
})
export class CrearUsuarioComponent implements OnInit {

  @ViewChild(CajaMensajeModalComponent) mensajeValidacion: CajaMensajeModalComponent;
  @ViewChild(CajaMensajeConfirmacionModalComponent) mensajeConfirmacion: CajaMensajeConfirmacionModalComponent;

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
      this.mensajeValidacion.abrir(TITULO_MENSAJE_VALIDACION, FALTAN_CAMPOS_POR_VALIDAR);
      return;
    }
    this.mensajeConfirmacion.abrir(TITULO_MENSAJE_CONFIRMACION, `Esta seguro de incribir el usuario con identificacion ${this.usuarioForm.value.identificacion}`);
  }

  crear() {
    const identificacion = this.usuarioForm.value.identificacion;
    this.usuarioServices.guardar(this.usuarioForm.value).subscribe(
      {
        next: () => { this.buscarUsuario(identificacion); },
      }
    );
  }

  buscarUsuario(identificacion) {
    this.usuarioServices.consultar(identificacion).subscribe(
      {
        next: (response) => this.guardarYRedirigir(response),
      });
  }

  guardarYRedirigir(respuestConsultar) {
    this.guardarSessionUsuario(respuestConsultar);
    this.redirigirACrearSolicitud(respuestConsultar.identificacion);
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
