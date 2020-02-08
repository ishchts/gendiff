/* eslint-disable no-undef */
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index';

const fixturesDir = path.resolve('__tests__/__fixtures__/');

describe('Comparison of flat files', () => {
  const before = path.resolve(fixturesDir, 'before.json');
  const after = path.resolve(fixturesDir, 'after.json');

  const beforeYml = path.resolve(fixturesDir, 'before.yml');
  const afterYml = path.resolve(fixturesDir, 'after.yml');

  const beforeIni = path.resolve(fixturesDir, 'before.ini');
  const afterIni = path.resolve(fixturesDir, 'after.ini');

  const result = fs.readFileSync(path.resolve(fixturesDir, 'diffFlat'), 'utf-8');
  const resultPlain = fs.readFileSync(path.resolve(fixturesDir, 'diffPlain'), 'utf-8');

  const table = [
    [before, after, 'default', result],
    [beforeYml, afterYml, 'default', result],
    [beforeIni, afterIni, 'default', result],
    [before, after, 'plain', resultPlain],
    [beforeYml, afterYml, 'plain', resultPlain],
    [beforeIni, afterIni, 'plain', resultPlain],
  ];

  test.each(table)('gendiff(%j, %j, %j)', (a, b, format, expected) => {
    expect(genDiff(a, b, format)).toBe(expected);
  });
});
