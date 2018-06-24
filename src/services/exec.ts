import colors from 'colors';
import * as path from 'path';

import { exec as childExec } from 'child_process';
import { promisify } from 'util';
import { exists, readJson } from './file';

const exec = promisify(childExec);

export async function install(packageName: string, type: '-S' | '-D' = '-D', dryRun = false) {
  console.info(colors.green('INSTALL'), type, packageName);

  if (dryRun) {
    return Promise.resolve();
  }

  await exec(`npm i -${type} ${packageName}`);
}

export async function runPrettier(dryRun = false) {
  const extensions = [
    'ts',
    'tsx',
    'css',
    'scss',
    'json',
    'md',
  ];

  const globs = extensions.map((ext) => `src/**/*.${ext}`).join(' ');
  const command = `npx prettier --write ${globs}`;

  console.log(colors.green('RUN'), command);

  if (dryRun) {
    return Promise.resolve();
  }

  await exec(command);
}

export async function runLint(type, dryRun = false) {
  const angularFile = path.resolve('angular.json');

  let projName = '';

  if (exists(angularFile)) {
    const angular = await readJson(angularFile);

    if (angular) {
      projName += angular.defaultProject;
    }
  }

  try {
    switch (type) {
      case 'angular':
        await exec(`npm run lint ${projName} -- --fix`);
        break;
      case 'node':
      case 'react':
        await exec('npx tslint --project tsconfig.json src/**/*.tsx src/**/*.ts --fix');
        break;
    }
  } catch (error) {
    console.log(colors.red('LINT RESULT'), error.stdout);
  }
}
