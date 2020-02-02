#!/usr/bin/env node
import program from 'commander';
import { version, description } from '../../package.json';
import genDiff from '..';

program
  .arguments('<firstConfig> <secondConfig>')
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'Output format', 'json')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);
