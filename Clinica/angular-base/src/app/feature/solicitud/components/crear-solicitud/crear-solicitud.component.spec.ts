import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ConsultarSolicitudComponent } from '../consultar-solicitud/consultar-solicitud.component';
import { CrearSolicitudComponent } from './crear-solicitud.component';
import { defer } from 'rxjs';
import { SolicitudService } from '../../shared/service/solicitud.service';
import { FormatedService } from '@shared/service/formated.service';
import { EspecialidadService } from '@shared/service/especialidad/especialidad.service';
import { MedicoService } from '@shared/service/medico/medico.service';
import { HorarioService } from '@shared/service/horario/horario.service';
import { CajaMensajeConfirmacionModalComponent } from '@shared/components/caja-mensaje-confirmacion-modal/caja-mensaje-confirmacion-modal.component';
import { UsuarioData } from '@shared/model/Usuario/usuario-data';
import { CajaMensajeModalComponent } from '@shared/components/caja-mensaje-modal/caja-mensaje-modal.component';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function fakeAsyncResponseError<T>(data: T) {
  return defer(() => Promise.reject(data));
}

describe('CrearSolicitudComponent', () => {
  let component: CrearSolicitudComponent;
  let fixture: ComponentFixture<CrearSolicitudComponent>;

  const listEspecailidad = [
    {
      id: '1',
      nombre: 'General',
      valor: 50000
    }
  ];

  const horario = [
    {
      id: '1',
      horaInicial: '07:00 AM',
      horaFinal: '07:30 AM'
    }
  ];

  const usuario: UsuarioData = {
    id: '1',
    identificacion: '1117522442',
    nombreCompleto: 'Manuel Alberto Velasquez Castaño',
    fechaNacimiento: '1991-12-20'
  };

  const medico = [
    {
      id: '1',
      nombreCompleto: 'Manuel Perez'
    }
  ];

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  const router = jasmine.createSpyObj('Router', ['navigate']);
  const cajaMensajeConfirmacionModalComponent = jasmine.createSpyObj('CajaMensajeConfirmacionModalComponent', ['abrir']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CrearSolicitudComponent,
        ConsultarSolicitudComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'solicitud/crear', component: CrearSolicitudComponent },
          { path: 'solicitud/consultar', component: ConsultarSolicitudComponent }
        ]),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        SolicitudService,
        EspecialidadService,
        MedicoService,
        HorarioService,
        FormatedService,
        HttpService,
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        DatePipe,
        CurrencyPipe,
        { provide: CajaMensajeConfirmacionModalComponent, useValue: cajaMensajeConfirmacionModalComponent }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSolicitudComponent);
    component = fixture.componentInstance;

    const horarioServicio: HorarioService = TestBed.inject(HorarioService);
    spyOn(horarioServicio, 'consultar').and.returnValue(
      fakeAsyncResponse(horario)
    );

    fixture.detectChanges();

    const mensajeConfirmacion: CajaMensajeConfirmacionModalComponent = jasmine.createSpyObj('CajaMensajeConfirmacionModalComponent', ['abrir']);
    component.mensajeConfirmacion = mensajeConfirmacion;

    const mensajeValidacion: CajaMensajeModalComponent = jasmine.createSpyObj('CajaMensajeModalComponent', ['abrir']);
    component.mensajeValidacion = mensajeValidacion;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('valida si se abre el mensaje de validar campos', () => {
    expect(component.solicitudCitaForm.valid).toBeFalsy();
    component.confirmarCrear();
    expect(component.mensajeValidacion.abrir).toHaveBeenCalled();
  });

  it('valida si se abre el mensaje de confirmacion para guardar', () => {
    const form = jasmine.createSpyObj('FormGroup', { valid: true, value: { identificacion: '1117522442' } });
    component.solicitudCitaForm = form;

    expect(component.solicitudCitaForm.valid).toBeTruthy();
    component.confirmarCrear();
    expect(component.mensajeConfirmacion.abrir).toHaveBeenCalled();
  });

  it('valida si se cargar los datos iniciales', async () => {
    const especialidadService: EspecialidadService = TestBed.inject(EspecialidadService);
    spyOn(especialidadService, 'consultar').and.returnValue(
      fakeAsyncResponse(listEspecailidad)
    );
    fixture.detectChanges();

    await component.cargarEspecialidades();
    await component.cargarHorarios();

    expect(component.especialidades.length).toBe(1);
    expect(component.horarios.length).toBe(1);
  });

  it('Registrando solicitud', async () => {
    component.usuario = usuario;
    const solicitudcitaService: SolicitudService = TestBed.inject(SolicitudService);
    spyOn(solicitudcitaService, 'guardar').and.returnValue(
      fakeAsyncResponse(true)
    );
    spyOn(component, 'redirigirAConsultarSolicitud').and.callThrough();
    fixture.detectChanges();

    component.solicitudCitaForm.controls.especialidad.setValue(1);
    component.solicitudCitaForm.controls.medico.setValue(1);
    component.solicitudCitaForm.controls.horario.setValue(1);
    component.solicitudCitaForm.controls.fechaCita.setValue('2022-04-20 00:00:00');
    component.solicitudCitaForm.controls.fechaSolicitud.setValue('2022-04-09 00:00:00');

    expect(component.solicitudCitaForm.valid).toBeTruthy();
    await component.confirmacion(true);
    expect(router.navigate).toHaveBeenCalled();
  });

  it('Valida la seleccion del medico por especialidad', async () => {
    component.especialidades = listEspecailidad;
    const medicoServicio: MedicoService = TestBed.inject(MedicoService);
    spyOn(medicoServicio, 'consultar').and.returnValue(
      fakeAsyncResponse(medico)
    );
    fixture.detectChanges();
    component.cambioEspecialidad('1');
    expect(component.valor).toBe(50000);
    expect(medicoServicio.consultar).toHaveBeenCalled();
  });

  it('Valida la carga de espcialidades con datos', async () => {
    const especialidadService: EspecialidadService = TestBed.inject(EspecialidadService);
    spyOn(especialidadService, 'consultar').and.returnValue(
      fakeAsyncResponse(listEspecailidad)
    );

    const medicoServicio: MedicoService = TestBed.inject(MedicoService);
    spyOn(medicoServicio, 'consultar').and.returnValue(
      fakeAsyncResponse(medico)
    );
    fixture.detectChanges();

    await component.cargarEspecialidades();

    expect(component.valor).toBe(50000);
    expect(component.especialidades).toHaveSize(1);
  });

  it('Valida la carga de espcialidades sin datos', async () => {
    const especialidadService: EspecialidadService = TestBed.inject(EspecialidadService);
    spyOn(especialidadService, 'consultar').and.returnValue(
      fakeAsyncResponse([])
    );

    const medicoServicio: MedicoService = TestBed.inject(MedicoService);
    spyOn(medicoServicio, 'consultar').and.returnValue(
      fakeAsyncResponse([])
    );
    fixture.detectChanges();

    await component.cargarEspecialidades();
    expect(component.valor).toBeUndefined();
  });
});
