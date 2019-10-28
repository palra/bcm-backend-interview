import { AirlineCodePipe } from './airline-code.pipe';

describe('AirlineCodePipe', () => {
  it('should trim input', () => {
    expect(new AirlineCodePipe().transform('  AF   ', null)).toBe('AF');
  });

  it('should transform to uppercase', () => {
    expect(new AirlineCodePipe().transform('aB', null)).toBe('AB');
  });

  it('should throw error on invalid airline code', () => {
    expect(() => {
      new AirlineCodePipe().transform('', null);
    }).toThrowError('Invalid airline code');
    expect(() => {
      new AirlineCodePipe().transform('n', null);
    }).toThrowError('Invalid airline code');
    expect(() => {
      new AirlineCodePipe().transform('nope', null);
    }).toThrowError('Invalid airline code');
  });
});
