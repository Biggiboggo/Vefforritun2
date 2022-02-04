import { describe, expect, it } from '@jest/globals';
import { calculations } from '../calculations.js';

describe('calculations', () => {
  it('calculates all of the things', () => {
    const str = [688, 904, 607, 299];

    const parsed = calculations(str);

    const output = [62803, 904, 624.5, 647.5, 299, 250.6052673029839, 2498, 605];
    expect(parsed).toBe(output);
  });
});
