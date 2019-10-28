import { AirportCodePipe } from './airport-code.pipe';

describe('AirportCodePipe', () => {
  it('should be defined', () => {
    expect(new AirportCodePipe()).toBeDefined();
  });

  it('should trim input', () => {
    expect(new AirportCodePipe().transform('  ABC   ', null)).toBe('ABC');
  });

  it('should transform to uppercase', () => {
    expect(new AirportCodePipe().transform('aBc', null)).toBe('ABC');
  });

  it('should throw error on invalid airline code', () => {
    expect(() => {
      new AirportCodePipe().transform('', null);
    }).toThrowError('Invalid airport code');
    expect(() => {
      new AirportCodePipe().transform('no', null);
    }).toThrowError('Invalid airport code');
    expect(() => {
      new AirportCodePipe().transform('nope', null);
    }).toThrowError('Invalid airport code');
  });
});
