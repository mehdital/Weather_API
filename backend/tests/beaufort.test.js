import { convertWindToBeaufort } from '../utils/beaufort.js';

describe('convertWindToBeaufort', () => {
  test.each([
    [0, 0],
    [3, 1],
    [10, 2],
    [15, 3],
    [25, 4],
    [35, 5],
    [45, 6],
    [80, 9],
    [150, 12]
  ])('vitesse %d km/h => Beaufort %d', (v, expected) => {
    const { beaufort } = convertWindToBeaufort(v);
    expect(beaufort).toBe(expected);
  });
});
