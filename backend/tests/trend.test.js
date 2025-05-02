import { trend, evolution } from '../utils/trend.js';

describe('trend()', () => {
  it('hausse', () => {
    expect(trend([10, 12, 18, 15, 15, 16, 18])).toBe('en forte hausse');
  });
  it('stable', () => {
    expect(trend([10,11,10,10,11,10,10])).toBe('stable');
  });
  it('forte baisse', () => {
    expect(trend([25,24,22,20,18,16,14])).toBe('en forte baisse');
  });
});

describe('evolution()', () => {
  it('amélioration', () => {
    expect(evolution('en hausse', 'stable')).toBe('en amélioration');
  });
});
