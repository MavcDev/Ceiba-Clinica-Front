import { Especialidad } from './especialidad';

describe('Especialidad', () => {
  it('should create an instance', () => {
    expect(new Especialidad('1', 'General', 50000)).toBeTruthy();
  });
});
