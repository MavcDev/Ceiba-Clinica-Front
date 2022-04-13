import { Medico } from './medico';

describe('Medico', () => {
  it('should create an instance', () => {
    expect(new Medico('1', 'Juan Carlos Perez')).toBeTruthy();
  });
});
