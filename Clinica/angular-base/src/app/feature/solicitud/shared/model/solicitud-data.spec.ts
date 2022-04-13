import { SolicitudData } from './solicitud-data';

describe('SolicitudData', () => {
  it('should create an instance', () => {
    expect(new SolicitudData(
      '1',
      {
        identificacionUsuario: '1117522442',
        medico: 'Juan Perez',
        usuario: 'Manuel Velasquez',
        especialidad: 'General',
        fechaCita: '2022-04-28',
        fechaSolicitud: '2022-04-09 00:00:00',
      },
      '07:00 AM',
      '07:30 AM',
      50000,
      50000,
      false
    )).toBeTruthy();
  });
});
