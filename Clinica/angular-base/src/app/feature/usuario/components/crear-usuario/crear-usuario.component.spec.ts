import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { CajaMensajeConfirmacionModalComponent } from '@shared/components/caja-mensaje-confirmacion-modal/caja-mensaje-confirmacion-modal.component';
import { CajaMensajeModalComponent } from '@shared/components/caja-mensaje-modal/caja-mensaje-modal.component';
import { UsuarioData } from '@shared/model/usuario/usuario-data';
import { defer, of } from 'rxjs';
import { CrearSolicitudComponent } from 'src/app/feature/solicitud/components/crear-solicitud/crear-solicitud.component';
import { UsuarioService } from '../../shared/service/usuario.service';
import { CrearUsuarioComponent } from './crear-usuario.component';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function fakeAsyncResponseError<T>(data: T) {
  return defer(() => Promise.reject(data));
}

describe('CrearUsuarioComponent', () => {
  let component: CrearUsuarioComponent;
  let fixture: ComponentFixture<CrearUsuarioComponent>;

  const usuario: UsuarioData = {
    id: '1',
    identificacion: '1117522442',
    nombreCompleto: 'Manuel Alberto Velasquez Castaño',
    fechaNacimiento: '1991-12-20'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearUsuarioComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'solicitud/crear', component: CrearSolicitudComponent },
        ]),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        UsuarioService,
        HttpService,
        DatePipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUsuarioComponent);
    component = fixture.componentInstance;
    const router: Router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callThrough();

    const usuarioServices: UsuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioServices, 'consultar').and.returnValue(
      fakeAsyncResponse(usuario)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
  });

  it('valida si se abre el mensaje de validar campos', () => {
    const mensajeValidacion: CajaMensajeModalComponent = jasmine.createSpyObj('CajaMensajeModalComponent', ['abrir']);
    component.mensajeValidacion = mensajeValidacion;
    expect(component.usuarioForm.valid).toBeFalsy();
    component.confirmarCrear();
    expect(component.mensajeValidacion.abrir).toHaveBeenCalled();
  });

  it('valida si se abre el mensaje de confirmacion para guardar', () => {
    const mensajeConfirmacion: CajaMensajeConfirmacionModalComponent = jasmine.createSpyObj('CajaMensajeConfirmacionModalComponent', ['abrir']);
    component.mensajeConfirmacion = mensajeConfirmacion;
    const form = jasmine.createSpyObj('FormGroup', {valid: true, value: { identificacion: '1117522442' } });
    component.usuarioForm = form;
    expect(component.usuarioForm.valid).toBeTruthy();
    component.confirmarCrear();
    expect(component.mensajeConfirmacion.abrir).toHaveBeenCalled();
  });

  it('Registrando usuario', async () => {
    const usuarioServices: UsuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioServices, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();

    expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.identificacion.setValue('1117522442');
    component.usuarioForm.controls.nombres.setValue('Manuel Alberto');
    component.usuarioForm.controls.primerApellido.setValue('Velasquez');
    component.usuarioForm.controls.segundoApellido.setValue('Castano');
    component.usuarioForm.controls.fechaNacimiento.setValue('1991-12-20 00:00:00');
    component.usuarioForm.controls.fechaCreacion.setValue('2022-04-08 00:00:00');
    expect(component.usuarioForm.valid).toBeTruthy();
    component.confirmacion(true);
  });

  it('valida el servicio de consultar el usuario por identificacion', async () => {
    fixture.detectChanges();

    await component.buscarUsuario('1117522442');
    expect(JSON.parse(localStorage.getItem('1117522442')).id).toBe('1');
  });

  it('Valida la guardada de los datos en el localstore', () => {
    component.guardarSessionUsuario(usuario);
    const usuarioRecuperado = JSON.parse(localStorage.getItem('1117522442'));

    expect(localStorage.getItem('1117522442')).toBeDefined();
    expect(usuarioRecuperado.id).toBe('1');
  });

});
