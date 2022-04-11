import { Usuario } from './usuario';

describe('Usuario', () => {
  it('should create an instance', () => {
    expect(new Usuario('1', '1117522442', 'Manuel Alberto', 'Velasquez', null, new Date(), new Date())).toBeTruthy();
  });
});
