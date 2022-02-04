export function makeHTML(str, calcs) {
  const html = str;
  const fravik = calcs[0];
  const haesta = calcs[1];
  const medaltal = calcs[2];
  const midgildi = calcs[3];
  const minnsta = calcs[4];
  const stadalfravik = calcs[5];
  const summa = calcs[6];
  const svid = calcs[7];

  const template = `
    <section>
      Frávik er: ${fravik}
    </section>
    <section>
      Hæsta gildi er: ${haesta}
    </section>
    <section>
      Meðaltal er: ${medaltal}
    </section>
    <section>
      Miðgildi er: ${midgildi}
    </section>
    <section>
      Minnsta er: ${minnsta}
    </section>
    <section>
      Staðalfrávik er: ${stadalfravik}
    </section>
    <section>
      Summan er: ${summa}
    </section>
    <section>
      Sviðið er: ${svid}
    </section>
    <section>
      Allt gagnasettið er: ${html}
    </section>
  `;

  return template;
}

export function makeIndex() {
  return `<!DOCTYPE html>
  <html lang="is">

  <head>
    <meta charset="UTF-8">
    <title>Gagnavinnsla</title>
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <h1>Útreikningar</h1>
    <ul>
      <li><a href="1.html">1.txt</a></li>
      <li><a href="2.html">2.txt</a></li>
      <li><a href="3.html">3.txt</a></li>
      <li><a href="4.html">4.txt</a></li>
      <li><a href="5.html">5.txt</a></li>
      <li><a href="6.html">6.txt</a></li>
      <li><a href="7.html">7.txt</a></li>
      <li><a href="8.html">8.txt</a></li>
      <li><a href="9.html">9.txt</a></li>
      <li><a href="10.html">10.txt</a></li>
      <li><a href="11.html">11.txt</a></li>
      <li><a href="12.html">12.txt</a></li>
    </ul>
  </body>

  </html>`;
}

/**
 * Takes HTML for a single blog entry and returns it with the site template.
 */
export function blogTemplate(path, blog, showBack = false) {
  const back = showBack ? '<p><a href="/">Til baka</a></p>' : '';
  return `
  <!doctype html>
  <html>
    <head>
      <title>${path ?? ''}</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      ${blog ?? ''}
      ${back}
    </body>
  </html>`;
}
