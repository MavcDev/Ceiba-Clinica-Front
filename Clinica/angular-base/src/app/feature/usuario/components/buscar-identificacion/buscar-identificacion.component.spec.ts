import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { UsuarioData } from '@shared/model/Usuario/usuario-data';
import { defer } from 'rxjs';
import { CrearSolicitudComponent } from 'src/app/feature/solicitud/components/crear-solicitud/crear-solicitud.component';
import { UsuarioService } from '../../shared/service/usuario.service';
import { CajaMensajeCrearUsuarioComponent } from '../caja-mensaje-crear-usuario/caja-mensaje-crear-usuario.component';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { BuscarIdentificacionComponent } from './buscar-identificacion.component';


export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function fakeAsyncResponseError<T>(data: T) {
  return defer(() => Promise.reject(data));
}

describe('BuscarIdentificacionComponent', () => {
  let component: BuscarIdentificacionComponent;
  let fixture: ComponentFixture<BuscarIdentificacionComponent>;
  let router: Router;

  const usuario: UsuarioData = {
    id: '1',
    identificacion: '1117522442',
    nombreCompleto: 'Manuel Alberto Velasquez Castaño',
    fechaNacimiento: '1991-12-20'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarIdentificacionComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'solicitudcita/crear', component: CrearSolicitudComponent },
          { path: 'usuario/crear', component: CrearUsuarioComponent }
        ]),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        UsuarioService,
        HttpService,

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarIdentificacionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
  });

  it('valida formulario datos validos', () => {
    component.usuarioForm.controls.identificacion.setValue('1117522442');
    expect(component.usuarioForm.valid).toBeTruthy();
  });

  it('valida formulario datos incorrecto', () => {
    component.usuarioForm.controls.identificacion.setValue('111752244s');
    expect(component.usuarioForm.valid).toBeFalsy();
  });

  it('valida el buscar usuario por identificacion', async () => {
    const usuarioServices: UsuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioServices, 'consultar').and.returnValue(
      fakeAsyncResponse(usuario)
    );
    fixture.detectChanges();
    component.usuarioForm.controls.identificacion.setValue('1117522442');
    await component.buscar();
    expect(localStorage.getItem('1117522442')).toBeDefined();
  });

  it('valida mensaje enviada por la exepcion al buscar', async () => {
    const usuarioServices: UsuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioServices, 'consultar').and.returnValue(
      fakeAsyncResponseError({ error: { mensaje: 'Ocurrio un fallo fake' } })
    );
    spyOn(component, 'mostrarMensajePorExepcionBuscar').and.callThrough();
    fixture.detectChanges();
    component.usuarioForm.controls.identificacion.setValue('11175232442');
    await component.buscar();
    expect(component.mostrarMensajePorExepcionBuscar).toHaveBeenCalled();
  });

  it('valida el mesnaje de presentacion por exepcion 404', () => {
    const cajaMensajeCrearUsuario: CajaMensajeCrearUsuarioComponent = jasmine.createSpyObj('CajaMensajeCrearUsuarioComponent', ['abrir']);
    component.cajaMensajeCrearUsuario = cajaMensajeCrearUsuario;
    fixture.detectChanges();

    component.mostrarMensajePorExepcionBuscar({ status: 404 }, '1117522442');

    expect(component.cajaMensajeCrearUsuario.abrir).toHaveBeenCalled();
  });

  it('valida la redireccion a crear usuario', () => {
    const cajaMensajeCrearUsuario: CajaMensajeCrearUsuarioComponent = jasmine.createSpyObj('CajaMensajeCrearUsuarioComponent', ['abrir']);
    cajaMensajeCrearUsuario.abrir('1117522442');
    component.cajaMensajeCrearUsuario = cajaMensajeCrearUsuario;
    fixture.detectChanges();
    component.confirmadoCrear(true);
    expect(router.navigate).toHaveBeenCalled();
  });
});
