import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { defer } from 'rxjs';

import { SolicitudcitaService } from './solicitudcita.service';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('SolicitudcitaService', () => {
  let service: SolicitudcitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        SolicitudcitaService,
        HttpService
      ],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudcitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('valida guardar solicitud', async () => {
    const httpService: HttpService = TestBed.inject(HttpService);
    spyOn(httpService, 'doPost').and.callThrough();
    service.guardar({
      idUsuario: '1',
      idEspecialidad: '1',
      idMedico: '1',
      idHorario: '1',
      fechaCita: '1',
      fechaSolicitud: '1'
    });
    expect(httpService.doPost).toHaveBeenCalled();
  });
});
