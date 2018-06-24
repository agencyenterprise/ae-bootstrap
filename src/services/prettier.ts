import colors from 'colors';
import * as path from 'path';

import { read, write } from './file';

export async function hookPrettier(dryRun = false) {
  const filename = 'package.json';
  const file = path.resolve(filename);
  const userPackage = JSON.parse((await read(file)).toString());

  userPackage.husky = {
    hooks: {
      'pre-commit': 'lint-staged',
    },
  };

  userPackage['lint-staged'] = {
    '*.{ts,tsx,scss,md,css}': ['prettier --write', 'git add'],
  };

  console.info(colors.green('PATCH prettier'), filename);

  if (dryRun) {
    return Promise.resolve();
  }

  const spaces = 2;
  const patchedPack = JSON.stringify(userPackage, undefined, spaces);
  await write(file, new Buffer(`${patchedPack}\n`));
}
