import colors from 'colors';
import * as path from 'path';

import { install, runLint, runPrettier } from '../services/exec';
import { copyDir, read, write } from '../services/file';
import { hookPrettier } from '../services/prettier';

async function copyFile(sourceFile: string, destFile: string, dryRun = false) {
  const data = await read(path.join(__dirname, sourceFile));
  await write(path.resolve(destFile), data, dryRun);
}

export async function init(type: 'node' | 'angular' | 'react', { dryRun }: any) {
  try {
    await copyFile('../../.editorconfig', '.editorconfig', dryRun);
    await copyFile('../../.prettierrc', '.prettierrc', dryRun);
    await copyFile(`../../tslint-${type}.json`, 'tslint.json', dryRun);
    await copyFile(`../../.gitignore-${type}`, '.gitignore', dryRun);

    await copyDir(path.join(__dirname, '../../.github'), path.resolve('.github'), dryRun);
    await copyDir(path.join(__dirname, '../../.circleci'), path.resolve('.circleci'), dryRun);

    await install('tslint-config-codingwise', '-D', dryRun);
    await install('lint-staged', '-D', dryRun);
    await install('husky@next', '-D', dryRun);
    await install('prettier', '-D', dryRun);

    await hookPrettier(dryRun);

    await runPrettier(dryRun);
    await runLint(type, dryRun);

    console.info(colors.green('Done initializing the project.'));
  } catch (err) {
    console.trace(colors.red('init error'), err);
  }

  if (dryRun) {
    console.info();
    console.info('NOTE: Run with "dry run" no changes were made.');
  }
}
