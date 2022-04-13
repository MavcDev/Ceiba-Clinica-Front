import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from '../../shared/service/solicitud.service';
import { DatePipe } from '@angular/common';
import { Solicitud } from '../../shared/model/solicitud';
import { FormatedService } from '@shared/service/formated.service';
import { Especialidad } from '@shared/model/especialidad/especialidad';
import { Horario } from '@shared/model/horario/horario';
import { Medico } from '@shared/model/medico/medico';
import { EspecialidadService } from '@shared/service/especialidad/especialidad.service';
import { MedicoService } from '@shared/service/medico/medico.service';
import { HorarioService } from '@shared/service/horario/horario.service';
import { CajaMensajeConfirmacionModalComponent } from '@shared/components/caja-mensaje-confirmacion-modal/caja-mensaje-confirmacion-modal.component';
import { CajaMensajeModalComponent } from '@shared/components/caja-mensaje-modal/caja-mensaje-modal.component';
import { UsuarioData } from '@shared/model/Usuario/usuario-data';

const TITULO_MENSAJE_VALIDACION = 'Validación';
const TITULO_MENSAJE_CONFIRMACION = 'Mensaje de confirmación';
const MENSAJE_CONFIRMACION = 'Esta seguro de realizar la solicitud de cita';
const FALTAN_CAMPOS_POR_VALIDAR = 'Falta campos por validar';

const IDENTIFICACION = 'identificacion';
const REDIRIGIR_CREAR_USUARIO_URL = 'usuario/buscar';
const REDIRIGIR_CONSULTAR_SOLICITUD_URL = 'solicitud/consultar';

const FORMATO_FECHA = 'yyyy-MM-dd';
const FORMATO_FECHA_HORA = 'yyyy-MM-dd hh:mm:ss';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styles: ['']
})
export class CrearSolicitudComponent implements OnInit {
  @ViewChild(CajaMensajeModalComponent) mensajeValidacion: CajaMensajeModalComponent;
  @ViewChild(CajaMensajeConfirmacionModalComponent) mensajeConfirmacion: CajaMensajeConfirmacionModalComponent;

  solicitudCitaForm: FormGroup;
  usuario: UsuarioData;
  valor: number;
  especialidades: Array<Especialidad>;
  horarios: Array<Horario>;
  medicos: Array<Medico>;
  formated: FormatedService;
  datepipe: DatePipe;
  protected route: ActivatedRoute;
  protected router: Router;

  constructor(
    protected injector: Injector,
    protected solicitudServicio: SolicitudService,
    protected especialidadServicio: EspecialidadService,
    protected medicoServicio: MedicoService,
    protected horarioServicio: HorarioService,
  ) {
    this.formated = this.injector.get(FormatedService);
    this.datepipe = this.injector.get(DatePipe);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
  }

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
          if (this.especialidades && (this.especialidades?.length >= 0)) {
            this.cambioEspecialidad(this.especialidades[0]?.id);
          }
        },
      });
  }



  actualizarValor(idEspecialidad) {
    const seleccionEspecialidad = this.especialidades.filter(val => Number(val.id) === Number(idEspecialidad));
    if (seleccionEspecialidad && (seleccionEspecialidad?.length >= 0)) {
      this.valor = seleccionEspecialidad[0]?.valor;
    }
  }

  cargarHorarios() {
    this.horarioServicio.consultar().subscribe(
      {
        next: (response: Array<Horario>) => { this.horarios = response; }
      });
  }

  cargarMedicos(idEspecialidad: string) {
    this.medicoServicio.consultar(idEspecialidad).subscribe(
      {
        next: (response: Array<Medico>) => { this.medicos = response; }
      });
  }

  cambioEspecialidad(idEspecialidad) {
    this.solicitudCitaForm.controls.medico.setValue(null);
    this.actualizarValor(idEspecialidad);
    this.cargarMedicos(idEspecialidad);
  }

  confirmarCrear() {
    if (!this.solicitudCitaForm.valid) {
      this.mensajeValidacion.abrir(TITULO_MENSAJE_VALIDACION, FALTAN_CAMPOS_POR_VALIDAR);
      return;
    }
    this.mensajeConfirmacion.abrir(TITULO_MENSAJE_CONFIRMACION, MENSAJE_CONFIRMACION);
  }

  confirmacion(event) {
    if (event) {
      this.crear();
    }
  }

  crear() {
    const solicitud = new Solicitud(
      this.usuario.id,
      this.solicitudCitaForm.value.especialidad,
      this.solicitudCitaForm.value.medico,
      this.solicitudCitaForm.value.horario,
      this.datepipe.transform(this.solicitudCitaForm.value.fechaCita, FORMATO_FECHA),
      this.solicitudCitaForm.value.fechaSolicitud
    );

    this.solicitudServicio.guardar(solicitud).subscribe(
      {
        next: () => { this.redirigirAConsultarSolicitud(this.usuario); }
      });
  }

  redirigirAConsultarSolicitud(usuario) {
    this.router.navigate([REDIRIGIR_CONSULTAR_SOLICITUD_URL, {
      id: usuario.id,
      identificacion: usuario.identificacion,
      nombre: usuario.nombreCompleto
    }]);
  }
}
