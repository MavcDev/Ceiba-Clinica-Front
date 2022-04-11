import { Horario } from './horario';

describe('Horario', () => {
  it('should create an instance', () => {
    expect(new Horario('1', '07:00 AM', '07:30 AM')).toBeTruthy();
  });
});
