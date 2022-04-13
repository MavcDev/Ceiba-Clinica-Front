import { UsuarioData } from './usuario-data';

describe('UsuarioData', () => {
  it('should create an instance', () => {
    expect(new UsuarioData(
      '1',
      '1117522442',
      'Manuel Alberto Velasquez',
      '1991-12-20'
    )).toBeTruthy();
  });
});
