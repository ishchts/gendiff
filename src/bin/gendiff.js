#!/usr/bin/env node
import program from 'commander';
import { version, description } from '../../package.json';

program
  .version(version)
  .description(description);

program.parse(process.argv);
