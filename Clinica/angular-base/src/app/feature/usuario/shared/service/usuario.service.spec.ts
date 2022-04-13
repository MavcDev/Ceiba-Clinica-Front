import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  const httpClient = jasmine.createSpyObj('HttpService', ['doGet', 'doPost', 'optsName']);
  httpClient.optsName.and.returnValue({ params: {} });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        UsuarioService,
        { provide: HttpService, useValue: httpClient },
      ],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioService);
  });

  it('valida guardar usuario', async () => {
    service.guardar({
      id: '1',
      identificacion: '1',
      nombres: '1',
      primerApellido: '1',
      segundoApellido: '1',
      fechaNacimiento: new Date(),
      fechaCreacion: new Date()
    });
    expect(httpClient.doPost).toHaveBeenCalled();
  });

  it('valida consulta solicitud', async () => {
    service.consultar('1117522442');
    expect(httpClient.doGet).toHaveBeenCalled();
  });
});
