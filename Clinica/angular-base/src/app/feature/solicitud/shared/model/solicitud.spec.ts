import { Solicitud } from './solicitud';

describe('Solicitudcita', () => {
  it('should create an instance', () => {
    expect(new Solicitud('1', '1', '1', '1', '2022-04-28', '2022-04-08 03:00:00')).toBeTruthy();
  });
});
