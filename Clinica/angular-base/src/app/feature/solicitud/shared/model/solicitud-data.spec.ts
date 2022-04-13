import { SolicitudData } from './solicitud-data';

describe('SolicitudData', () => {
  it('should create an instance', () => {
    expect(new SolicitudData(
      '1',
      '1117522442',
      'Juan Perez',
      'Manuel Velasquez',
      'General',
      '2022-04-28',
      '2022-04-09 00:00:00',
      '07:00 AM',
      '07:30 AM',
      50000,
      50000,
      false
    )).toBeTruthy();
  });
});
