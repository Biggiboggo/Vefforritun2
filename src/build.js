/* eslint-disable no-await-in-loop */
import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import { calculations } from './calculations.js';
import { direxists } from './lib/file.js';
import { blogTemplate, makeHTML, makeIndex } from './make-html.js';

const BLOG_DIR = './database';
const OUTPUT_DIR = './dist';

export async function readfiles(directory) {
  const files = await readdir(directory);
  return files;
}
async function main() {
  const files = await readdir(BLOG_DIR);

  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  for (const file of files) {
    const path = join(BLOG_DIR, file);
    const info = await stat(path);
    const fileName = `${file.substring(0, file.length - 4)}.html`;
    if (info.isDirectory()) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const data = await readFile(path);
    const str = data.toString('utf-8').split('\n');
    const calcs = calculations(str);
    const html = makeHTML(str, calcs);
    const blog = blogTemplate(path, html, true);

    await writeFile(join(OUTPUT_DIR, fileName), blog, { flag: 'w+' });
  }

  const index = blogTemplate('Bloggið mitt!', makeIndex());
  await writeFile(join(OUTPUT_DIR, 'index.html'), index, { flag: 'w+' });
}

main().catch((err) => console.error(err));
