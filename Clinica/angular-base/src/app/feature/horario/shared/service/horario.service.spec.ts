import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { HorarioService } from './horario.service';

describe('HorarioService', () => {
  let service: HorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        HorarioService,
        HttpService
      ],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
