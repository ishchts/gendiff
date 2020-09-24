#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

function commaSeparatedList(value, dummyPrevious) {
  return [...dummyPrevious, ...value.split(',')];
}

const { program } = commander;
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza', 'default')
  .option('-l, --list <items>', 'comma separated list', commaSeparatedList, '98')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.format));
  })
  .parse(process.argv);
