import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { defer } from 'rxjs';
import { SolicitudcitaService } from '../../shared/service/solicitudcita.service';

import { ConsultarSolicitudComponent } from './consultar-solicitud.component';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('ConsultarSolicitudComponent', () => {
  let component: ConsultarSolicitudComponent;
  let fixture: ComponentFixture<ConsultarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarSolicitudComponent],
      providers: [SolicitudcitaService, HttpService],
      imports: [HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Valida si se redirigi a crear solicitud', () => {
    const router: Router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();
    component.redirigirCrearSolicitud();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('Valida si se cargo los datos', async () => {
    const solicitudcitaService: SolicitudcitaService = TestBed.inject(SolicitudcitaService);
    spyOn(solicitudcitaService, 'consultar').and.returnValue(
      fakeAsyncResponse([{ id: '1' } as any])
    );
    fixture.detectChanges();
    await component.cargarSolicitudesCita();
    expect(component.solicitudes.length).toBe(1);
  });

});
