import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { defer } from 'rxjs';

import { SolicitudService } from './solicitud.service';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('SolicitudcitaService', () => {
  let service: SolicitudService;

  const httpClient = jasmine.createSpyObj('HttpService', ['doGet', 'doPost', 'optsName']);
  httpClient.optsName.and.returnValue({params: {}});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        SolicitudService,
        { provide: HttpService, useValue: httpClient },
      ],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('valida guardar solicitud', async () => {
    service.guardar({
      idUsuario: '1',
      idEspecialidad: '1',
      idMedico: '1',
      idHorario: '1',
      fechaCita: '2022-05-20',
      fechaSolicitud: '2022-04-20 00:00:00'
    });
    expect(httpClient.doPost).toHaveBeenCalled();
  });

  it('valida consulta solicitud', async () => {
    service.consultar('1');
    expect(httpClient.doGet).toHaveBeenCalled();
  });
});
