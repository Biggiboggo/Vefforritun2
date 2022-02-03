import { describe, expect, it } from '@jest/globals';
import { parse } from '../src/parser';

describe.skip('parser', () => {
  it('parses a markdown file', () => {
    const input = '# hello world';

    const parsed = parse(input);

    expect(parsed).toBe('<h1 id="hello-world">hello world</h1>');
  });

  it('parses a markdown file', () => {
    const input = '# hello world!';

    const parsed = parse(input);

    expect(parsed).toBe('<h1 id="hello-world">hello world!</h1>');
  });
});