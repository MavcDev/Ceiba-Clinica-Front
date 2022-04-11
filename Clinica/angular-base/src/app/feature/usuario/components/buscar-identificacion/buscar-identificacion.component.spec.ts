import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageBoxComponent } from 'src/app/feature/tool/components/message-box/message-box.component';
import { HttpService } from '@core/services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { defer, of } from 'rxjs';
import { UsuarioService } from '../../shared/service/usuario.service';
import { BuscarIdentificacionComponent } from './buscar-identificacion.component';
import { MessageBoxYesNotComponent } from 'src/app/feature/tool/components/message-box-yes-not/message-box-yes-not.component';


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
  const messageBox = jasmine.createSpyObj('MessageBoxComponent', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarIdentificacionComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        UsuarioService,
        HttpService,
        { provide: MessageBoxComponent, useValue: messageBox },
        MessageBoxYesNotComponent
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

    const mesageBox: MessageBoxComponent = jasmine.createSpyObj('MessageBoxComponent', ['open']);
    component.mesageBox = mesageBox;
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
      of({
        id: 1,
        identificacion: '1117522442',
        nombreCompleto: 'Manuel Alberto Velasquez Castaño',
        fechaNacimiento: '1991-12-20'
      })
    );
    spyOn(component, 'redirigirACrearSolicitud').and.callThrough();
    fixture.detectChanges();

    const mesageBox: MessageBoxComponent = jasmine.createSpyObj('MessageBoxComponent', ['open']);
    component.mesageBox = mesageBox;
    component.buscar();

    expect(localStorage.getItem('1117522442')).toBeDefined();
    expect(component.redirigirACrearSolicitud).toHaveBeenCalled();
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
    const ngbModal: NgbModal = TestBed.inject(NgbModal);
    spyOn(ngbModal, 'open').and.callThrough();
    fixture.detectChanges();
    component.mostrarMensajePorExepcionBuscar({ status: 404 }, '1117522442');
    expect(ngbModal.open).toHaveBeenCalled();
  });

  it('valida el mesnaje de presentacion por exepcion diferente 404', () => {
    const mesageBox: MessageBoxComponent = jasmine.createSpyObj('MessageBoxComponent', ['open']);
    component.mesageBox = mesageBox;
    component.mostrarMensajePorExepcionBuscar({ status: 500 }, '1117522442');
    expect(component.mesageBox.open).toHaveBeenCalled();
  });

  it('valida la redireccion a crear usuario', () => {
    component.redirigirACrearusuario('1117522442');
    expect(router.navigate).toHaveBeenCalled();
  });
});
