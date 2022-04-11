import { Solicitudcita } from './solicitudcita';

describe('Solicitudcita', () => {
  it('should create an instance', () => {
    expect(new Solicitudcita('1', '1', '1', '1', '2022-04-28', '2022-04-08 03:00:00')).toBeTruthy();
  });
});
