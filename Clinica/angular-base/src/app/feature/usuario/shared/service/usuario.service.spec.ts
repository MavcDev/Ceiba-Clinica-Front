import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        UsuarioService,
        HttpService
      ],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioService);
  });

  it('valida guardar usuario', async () => {
    const httpService: HttpService = TestBed.inject(HttpService);
    spyOn(httpService, 'doPost').and.callThrough();
    service.guardar({
      id: '1',
      identificacion: '1',
      nombres: '1',
      primerApellido: '1',
      segundoApellido: '1',
      fechaNacimiento: new Date(),
      fechaCreacion: new Date()
    });
    expect(httpService.doPost).toHaveBeenCalled();
  });
});
