import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageBoxComponent } from 'src/app/feature/tool/components/message-box/message-box.component';
import { HttpService } from '@core/services/http.service';
import { defer, of } from 'rxjs';
import { UsuarioService } from '../../shared/service/usuario.service';
import { CrearUsuarioComponent } from './crear-usuario.component';
import { MessageBoxYesNotComponent } from 'src/app/feature/tool/components/message-box-yes-not/message-box-yes-not.component';

export function fakeAsyncResponseError<T>(data: T) {
  return defer(() => Promise.reject(data));
}

describe('CrearUsuarioComponent', () => {
  let component: CrearUsuarioComponent;
  let fixture: ComponentFixture<CrearUsuarioComponent>;

  const messageBox = jasmine.createSpyObj('MessageBoxComponent', ['open']);
  const messageBoxYesNot = jasmine.createSpyObj('MessageBoxYesNotComponent', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearUsuarioComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        UsuarioService,
        HttpService,
        DatePipe,
        { provide: MessageBoxComponent, useValue: messageBox },
        { provide: MessageBoxYesNotComponent, useValue: messageBoxYesNot }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUsuarioComponent);
    component = fixture.componentInstance;
    const router: Router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();

    const mesageBox: MessageBoxComponent = jasmine.createSpyObj('MessageBoxComponent', ['open']);
    component.mesageBox = mesageBox;

    const mesageBoxYesNot: MessageBoxYesNotComponent = jasmine.createSpyObj('MessageBoxYesNotComponent', ['open']);
    component.mesageBoxYesNot = mesageBoxYesNot;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
  });

  it('valida si se abre el mensaje de validar campos', () => {
    const mesageBox: MessageBoxComponent = jasmine.createSpyObj('MessageBoxComponent', ['open']);
    component.mesageBox = mesageBox;
    expect(component.usuarioForm.valid).toBeFalsy();
    component.confirmarCrear();
    expect(mesageBox.open).toHaveBeenCalled();
  });

  it('valida si se abre el mensaje de confirmacion para guardar', () => {
    const mesageBoxYesNot: MessageBoxYesNotComponent = jasmine.createSpyObj('MessageBoxYesNotComponent', ['open']);
    component.mesageBoxYesNot = mesageBoxYesNot;

    const form = jasmine.createSpyObj('FormGroup', {valid: true, value: { identificacion: '1117522442' } });
    component.usuarioForm = form;

    expect(component.usuarioForm.valid).toBeTruthy();
    component.confirmarCrear();
    expect(mesageBoxYesNot.open).toHaveBeenCalled();
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

  it('lanza mensaje de error por excepcion', async () => {
    const usuarioServices: UsuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioServices, 'guardar').and.returnValue(
      fakeAsyncResponseError({ error: { mensaje: 'Ocurrio un fallo fake' } })
    );
    spyOn(usuarioServices, 'consultar').and.returnValue(
      fakeAsyncResponseError({ error: { mensaje: 'Ocurrio un fallo fake' } })
    );
    fixture.detectChanges();

    const mesageBox: MessageBoxComponent = jasmine.createSpyObj('MessageBoxComponent', ['open']);
    component.mesageBox = mesageBox;

    expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.identificacion.setValue('1117522442');
    component.usuarioForm.controls.nombres.setValue('Manuel Alberto');
    component.usuarioForm.controls.primerApellido.setValue('Velasquez');
    component.usuarioForm.controls.segundoApellido.setValue('Castano');
    component.usuarioForm.controls.fechaNacimiento.setValue('1991-12-20 00:00:00');
    component.usuarioForm.controls.fechaCreacion.setValue('2022-04-08 00:00:00');

    expect(component.usuarioForm.valid).toBeTruthy();
    component.confirmacion(true);
    // expect(component.mesageBox.open).toHaveBeenCalled();
  });

  it('valida el servicio de consultar el usuario por identificacion', async () => {
    const usuarioServices: UsuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioServices, 'consultar').and.returnValue(
      of({
        id: 1,
        identificacion: '1117522442',
        nombreCompleto: 'Manuel Alberto Velasquez Castaño',
        fechaNacimiento: '1991-12-20'
      })
    );
    fixture.detectChanges();

    await component.buscarUsuario('1117522442');
    expect(JSON.parse(localStorage.getItem('1117522442')).id).toBe(1);
  });

  it('Valida la guardada de los datos en el localstore', () => {
    const usuario = {
      id: 1,
      identificacion: '1117522442',
      nombreCompleto: 'Manuel Alberto Velasquez Castaño',
      fechaNacimiento: '1991-12-20'
    };

    component.guardarSessionUsuario(usuario);
    const usuarioRecuperado = JSON.parse(localStorage.getItem('1117522442'));

    expect(localStorage.getItem('1117522442')).toBeDefined();
    expect(usuarioRecuperado.id).toBe(1);
  });

});
