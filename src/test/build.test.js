import { describe, expect, it } from '@jest/globals';
import { readfiles } from '../build.js';

describe('readfiles', () => {
  it('reads files from database', () => {
    const str = '../database';

    const parsed = readfiles(str);

    const output = new Promise({});
    expect(parsed).toBe(output);
  });
});
