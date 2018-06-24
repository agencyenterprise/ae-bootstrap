import colors from 'colors';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const writeAsync = promisify(fs.writeFile);

export const read = promisify(fs.readFile);
export const readdir = promisify(fs.readdir);
export const stat = promisify(fs.stat);

export async function write(filePath: string, data: Buffer, dryRun = false) {
  console.info(colors.green('CREATE'), filePath, `(${data.byteLength} bytes)`);

  if (dryRun) {
    return Promise.resolve();
  }

  return await writeAsync(filePath, data);
}

export async function copyDir(source: string, target: string, dryRun = false) {
  const items = await readdir(source);

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  for (const file of items) {
    const sourceFile = path.join(source, file);
    const targetFile = path.join(target, file);

    const meta = await stat(sourceFile);

    if (meta.isDirectory()) {
      await copyDir(sourceFile, targetFile, dryRun);
    } else {
      const content = await read(sourceFile);

      await write(targetFile, content, dryRun);
    }
  }
}

export async function readJson(filePath: string) {
  const buffer = await read(filePath);

  return JSON.parse(buffer.toString());
}

export function exists(filePath: string) {
  return fs.existsSync(filePath);
}
