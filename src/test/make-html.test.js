import { describe, expect, it } from '@jest/globals';
import { blogTemplate, makeHTML } from '../make-html';

describe('html', () => {
  it('creates a html string', () => {
    const str = '688,904,607,299';
    const calcs = [1, 1, 1, 1, 1, 1, 1, 1];

    const parsed = makeHTML(str, calcs);

    const output = `
    <section>
      Frávik er: 1
    </section>
    <section>
      Hæsta gildi er: 1
    </section>
    <section>
      Meðaltal er: 1
    </section>
    <section>
      Miðgildi er: 1
    </section>
    <section>
      Minnsta er: 1
    </section>
    <section>
      Staðalfrávik er: 1
    </section>
    <section>
      Summan er: 1
    </section>
    <section>
      Sviðið er: 1
    </section>
    <section>
      Allt gagnasettið er: 688,904,607,299
    </section>
  `;
    expect(parsed).toBe(output);
  });

  it('creates a html template', () => {
    const str = '688,904,607,299';
    const calcs = [1, 1, 1, 1, 1, 1, 1, 1];
    const html = makeHTML(str, calcs);
    const parsed = blogTemplate('database\\1.txt', html.true);

    const output = `
  <!doctype html>
  <html>
    <head>
      <title>database\\1.txt</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <section>
        Frávik er: 1
      </section>
      <section>
        Hæsta gildi er: 1
      </section>
      <section>
        Meðaltal er: 1
      </section>
      <section>
        Miðgildi er: 1
      </section>
      <section>
        Minnsta er: 1
      </section>
      <section>
        Staðalfrávik er: 1
      </section>
      <section>
        Summan er: 1
      </section>
      <section>
        Sviðið er: 1
      </section>
      <section>
        Allt gagnasettið er: 688,904,607,299
      </section>
      <p><a href="/">Til baka</a></p>
    </body>
  </html>`;
    expect(parsed).toBe(output);
  });
});
