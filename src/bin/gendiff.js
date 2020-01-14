#!/usr/bin/env node
import program from 'commander';
import { version, description } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'Output format')
  .action((cmd, env) => {
    if (cmd.format) {
      console.log(cmd.format);
    }
    console.log(genDiff(...env));
  });

program.parse(process.argv);
