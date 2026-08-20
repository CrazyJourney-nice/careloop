import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');
const runtimeTag = '<script src="./demo-runtime.js"></script>';

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of ['index.html', 'staff.html', 'admin.html']) {
  const source = await readFile(path.join(root, file), 'utf8');
  const marker = file === 'index.html' ? '<script type="module">' : '<script>';
  if (!source.includes(marker)) throw new Error(`Cannot find script marker in ${file}`);
  await writeFile(path.join(output, file), source.replace(marker, `${runtimeTag}${marker}`));
}

await copyFile(path.join(root, 'i18n.js'), path.join(output, 'i18n.js'));
await copyFile(path.join(root, 'demo-runtime.js'), path.join(output, 'demo-runtime.js'));

console.log('Built original CareLoop UI for GitHub Pages in 2skywork/dist');
