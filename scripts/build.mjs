import { cp, mkdir, rm } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const path of ['index.html', 'styles.css', 'src']) {
  await cp(new URL(`../${path}`, import.meta.url), new URL(path, output), { recursive: true });
}

console.log('Built static site in dist/');
