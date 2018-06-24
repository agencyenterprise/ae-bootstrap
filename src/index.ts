#!/usr/bin/env node

import program from 'commander';
import config from '../package.json';

process.on('uncaughtException', (err) => {
  console.error(err);
});

program
  .version(config.version)
  .command('node', 'node bootstrap commands')
  .command('angular', 'angular bootstrap commands')
  .command('react', 'react bootstrap commands')
  .parse(process.argv);
