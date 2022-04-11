import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageBoxComponent } from 'src/app/feature/tool/components/message-box/message-box.component';
import { FormatedService } from 'src/app/feature/tool/shared/service/formated.service';
import { HttpService } from '@core/services/http.service';
import { EspecialidadService } from 'src/app/feature/especialidad/shared/service/especialidad.service';
import { HorarioService } from 'src/app/feature/horario/shared/service/horario.service';
import { MedicoService } from 'src/app/feature/medico/shared/service/medico.service';
import { SolicitudcitaService } from '../../shared/service/solicitudcita.service';
import { ConsultarSolicitudComponent } from '../consultar-solicitud/consultar-solicitud.component';
import { CrearSolicitudComponent } from './crear-solicitud.component';
import { MessageBoxYesNotComponent } from 'src/app/feature/tool/components/message-box-yes-not/message-box-yes-not.component';
import { defer } from 'rxjs';

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

  const usuario = {
    id: 1,
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
  const messageBox = jasmine.createSpyObj('MessageBoxComponent', ['open']);
  const messageBoxYesNot = jasmine.createSpyObj('MessageBoxYesNotComponent', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CrearSolicitudComponent,
        ConsultarSolicitudComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'solicitudcita/crear', component: CrearSolicitudComponent },
          { path: 'solicitudcita/consultar', component: ConsultarSolicitudComponent }
        ]),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        SolicitudcitaService,
        EspecialidadService,
        MedicoService,
        HorarioService,
        FormatedService,
        HttpService,
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        DatePipe,
        CurrencyPipe,
        { provide: MessageBoxComponent, useValue: messageBox },
        { provide: MessageBoxYesNotComponent, useValue: messageBoxYesNot }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const mesageBox: MessageBoxComponent = jasmine.createSpyObj('MessageBoxComponent', ['open']);
    component.mesageBox = mesageBox;

    const mesageBoxYesNot: MessageBoxYesNotComponent = jasmine.createSpyObj('MessageBoxYesNotComponent', ['open']);
    component.mesageBoxYesNot = mesageBoxYesNot;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('valida si se abre el mensaje de validar campos', () => {
    expect(component.solicitudCitaForm.valid).toBeFalsy();
    component.confirmarCrear();
    expect(component.mesageBox.open).toHaveBeenCalled();
  });

  it('valida si se abre el mensaje de confirmacion para guardar', () => {
    const form = jasmine.createSpyObj('FormGroup', {valid: true, value: { identificacion: '1117522442' } });
    component.solicitudCitaForm = form;

    expect(component.solicitudCitaForm.valid).toBeTruthy();
    component.confirmarCrear();
    expect(component.mesageBoxYesNot.open).toHaveBeenCalled();
  });

  it('valida si se cargar los datos iniciales', async () => {
    const especialidadService: EspecialidadService = TestBed.inject(EspecialidadService);
    spyOn(especialidadService, 'consultar').and.returnValue(
      fakeAsyncResponse(listEspecailidad)
    );
    const horarioServicio: HorarioService = TestBed.inject(HorarioService);
    spyOn(horarioServicio, 'consultar').and.returnValue(
      fakeAsyncResponse(horario)
    );
    fixture.detectChanges();

    await component.cargarEspecialidades();
    await component.cargarHorarios();
    expect(component.especialidades.length).toBe(1);
    expect(component.horarios.length).toBe(1);
  });

  it('Registrando solicitud', async () => {
    component.usuario = usuario;
    const solicitudcitaService: SolicitudcitaService = TestBed.inject(SolicitudcitaService);
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

  it('lanza mensaje de error por excepcion al registrar una solicitud', async () => {
    component.usuario = usuario;
    const solicitudcitaService: SolicitudcitaService = TestBed.inject(SolicitudcitaService);
    spyOn(solicitudcitaService, 'guardar').and.returnValue(
      fakeAsyncResponseError({ error: { mensaje: 'Ocurrio un fallo fake' } })
    );
    spyOn(component, 'mostrarCajaTexto').and.callThrough();
    fixture.detectChanges();

    await component.confirmacion(true);
    expect(component.mostrarCajaTexto).toHaveBeenCalled();
    expect(component.mostrarCajaTexto).toHaveBeenCalledWith('Error', 'Ocurrio un fallo fake');
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
    spyOn(medicoServicio, 'consultar').and.callThrough();
    fixture.detectChanges();

    await component.cargarEspecialidades();

    expect(component.valor).toBe(50000);
    expect(medicoServicio.consultar).toHaveBeenCalled();
    expect(medicoServicio.consultar).toHaveBeenCalledWith('1');
  });

  it('Valida la carga de espcialidades sin datos', async () => {
    const especialidadService: EspecialidadService = TestBed.inject(EspecialidadService);
    spyOn(especialidadService, 'consultar').and.returnValue(
      fakeAsyncResponse([])
    );
    await component.cargarEspecialidades();
    expect(component.valor).toBeUndefined();
  });
});

