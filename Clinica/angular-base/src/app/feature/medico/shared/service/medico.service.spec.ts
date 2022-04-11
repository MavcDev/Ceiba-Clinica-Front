import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { MedicoService } from './medico.service';

describe('MedicoService', () => {
  let service: MedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        MedicoService,
        HttpService
      ],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Enviar Peticion de medico', () => {
    const httpService: HttpService = TestBed.inject(HttpService);
    spyOn(httpService, 'doGet').and.callThrough();
    service.consultar('1');
    expect(httpService.doGet).toHaveBeenCalled();
  });
});
