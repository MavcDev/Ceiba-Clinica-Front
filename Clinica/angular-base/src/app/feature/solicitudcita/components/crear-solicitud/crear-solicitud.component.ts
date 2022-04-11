import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialidadService } from 'src/app/feature/especialidad/shared/service/especialidad.service';
import { Horario } from 'src/app/feature/horario/shared/model/horario';
import { HorarioService } from 'src/app/feature/horario/shared/service/horario.service';
import { Medico } from 'src/app/feature/medico/shared/model/medico';
import { MedicoService } from 'src/app/feature/medico/shared/service/medico.service';
import { DatePipe } from '@angular/common';
import { Solicitudcita } from '../../shared/model/solicitudcita';
import { SolicitudcitaService } from '../../shared/service/solicitudcita.service';
import { MessageBoxComponent } from 'src/app/feature/tool/components/message-box/message-box.component';
import { FormatedService } from 'src/app/feature/tool/shared/service/formated.service';
import { Especialidad } from 'src/app/feature/especialidad/shared/model/especialidad';
import { MessageBoxYesNotComponent } from 'src/app/feature/tool/components/message-box-yes-not/message-box-yes-not.component';

const TITULO_MENSAJE_ERROR = 'Error';
const TITULO_MENSAJE_VALIDACION = 'Validación';
const TITULO_MENSAJE_CONFIRMACION = 'Mensaje de confirmación';
const MENSAJE_CONFIRMACION = 'Esta seguro de realizar la solicitud de cita';
const FALTAN_CAMPOS_POR_VALIDAR = 'Falta campos por validar';

const IDENTIFICACION = 'identificacion';
const REDIRIGIR_CREAR_USUARIO_URL = 'usuario/buscar';
const REDIRIGIR_CONSULTAR_SOLICITUD_URL = 'solicitudcita/consultar';

const FORMATO_FECHA = 'yyyy-MM-dd';
const FORMATO_FECHA_HORA = 'yyyy-MM-dd hh:mm:ss';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {


  @ViewChild(MessageBoxComponent) mesageBox: MessageBoxComponent;
  @ViewChild(MessageBoxYesNotComponent) mesageBoxYesNot: MessageBoxYesNotComponent;

  solicitudCitaForm: FormGroup;
  usuario: any;
  valor: number;
  especialidades: Array<Especialidad>;
  horarios: Array<Horario>;
  medicos: Array<Medico>;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected datepipe: DatePipe,
    protected solicitudcitaServicio: SolicitudcitaService,
    protected especialidadServicio: EspecialidadService,
    protected medicoServicio: MedicoService,
    protected horarioServicio: HorarioService,
    public formated: FormatedService
  ) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.construirFormularioSolictudCita();
    this.cargarEspecialidades();
    this.cargarHorarios();
  }

  cargarUsuario(): void {
    const identificacion: string = this.route.snapshot.paramMap?.get(IDENTIFICACION);
    this.usuario = JSON.parse(localStorage.getItem(identificacion));
    if (!this.usuario) {
      this.router.navigate([REDIRIGIR_CREAR_USUARIO_URL]);
    }
  }

  construirFormularioSolictudCita(): void {
    this.solicitudCitaForm = new FormGroup({
      especialidad: new FormControl(1, [Validators.required]),
      medico: new FormControl(null, [Validators.required]),
      horario: new FormControl(null, [Validators.required]),
      fechaCita: new FormControl(null, [Validators.required]),
      fechaSolicitud: new FormControl(this.datepipe.transform(new Date(), FORMATO_FECHA_HORA))
    });
  }

  cargarEspecialidades() {
    this.especialidadServicio.consultar().subscribe(
      {
        next: (response: Array<Especialidad>) => {
          this.especialidades = response;
          if (this.especialidades.length >= 0) {
            const idEspecialidad = this.especialidades[0].id;
            this.actualizarValor(idEspecialidad);
            this.cargarMedicos(idEspecialidad);
          }
        },
        error: (excepcion) => this.mostrarCajaTexto(TITULO_MENSAJE_ERROR, excepcion?.error?.mensaje),
      });
  }

  actualizarValor(idEspecialidad) {
    this.valor = this.especialidades.filter(val => Number(val.id) === Number(idEspecialidad))[0].valor;
  }

  cargarHorarios() {
    this.horarioServicio.consultar().subscribe(
      {
        next: (response: Array<Horario>) => { this.horarios = response; },
        error: (excepcion) => this.mostrarCajaTexto(TITULO_MENSAJE_ERROR, excepcion?.error?.mensaje),
      });
  }

  cargarMedicos(idEspecialidad: string) {
    this.medicoServicio.consultar(idEspecialidad).subscribe(
      {
        next: (response: Array<Medico>) => { this.medicos = response; },
        error: (excepcion) => this.mostrarCajaTexto(TITULO_MENSAJE_ERROR, excepcion?.error?.mensaje),
      });
  }

  cambioEspecialidad(idEspecialidad) {
    this.solicitudCitaForm.controls.medico.setValue(null);
    this.actualizarValor(idEspecialidad);
    this.cargarMedicos(idEspecialidad);
  }

  confirmarCrear() {
    if (!this.solicitudCitaForm.valid) {
      this.mesageBox.open(TITULO_MENSAJE_VALIDACION, FALTAN_CAMPOS_POR_VALIDAR);
      return;
    }
    this.mesageBoxYesNot.open(TITULO_MENSAJE_CONFIRMACION, MENSAJE_CONFIRMACION);
  }

  confirmacion(event) {
    if (event) {
      this.crear();
    }
  }

  crear() {
    const solicitudcita = new Solicitudcita(
      this.usuario.id,
      this.solicitudCitaForm.value.especialidad,
      this.solicitudCitaForm.value.medico,
      this.solicitudCitaForm.value.horario,
      this.datepipe.transform(this.solicitudCitaForm.value.fechaCita, FORMATO_FECHA),
      this.solicitudCitaForm.value.fechaSolicitud
    );

    this.solicitudcitaServicio.guardar(solicitudcita).subscribe(
      {
        next: (response: boolean) => { if (response) { this.redirigirAConsultarSolicitud(this.usuario); } },
        error: (excepcion) => this.mostrarCajaTexto(TITULO_MENSAJE_ERROR, excepcion?.error?.mensaje),
      });
  }

  mostrarCajaTexto(titulo: string = 'Error', mensaje: string = 'Ocurrio un error inesperado.') {
    this.mesageBox.open(titulo, mensaje);
  }

  redirigirAConsultarSolicitud(usuario) {
    this.router.navigate([REDIRIGIR_CONSULTAR_SOLICITUD_URL, {
      id: usuario.id,
      identificacion: usuario.identificacion,
      nombre: usuario.nombreCompleto
    }]);
  }
}
