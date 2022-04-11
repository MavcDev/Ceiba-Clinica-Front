import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { EspecialidadService } from './especialidad.service';

describe('EspecialidadService', () => {
  let service: EspecialidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        EspecialidadService,
        HttpService
      ]
    });
    service = TestBed.inject(EspecialidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
