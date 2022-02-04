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

export function makeIndex(entries) {
  let list = '';
  for (const entry of entries) {
    const { path } = entry;
    const link = `<li><a href="${`${path}.html`}">${path}</a></li>`;
    list += link;
  }

  return `<ul>${list}</ul>`;
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
