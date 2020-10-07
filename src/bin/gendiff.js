#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

const { program } = commander;
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.format));
  })
  .parse(process.argv);
