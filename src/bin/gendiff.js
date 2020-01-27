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

    if (env.length > 2 || env.length < 2) {
      console.log('there should be two files');
    }

    console.log(genDiff(...env));
  });

program.parse(process.argv);
