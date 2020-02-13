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

  const result = fs.readFileSync(path.resolve(fixturesDir, 'diffNested'), 'utf-8');
  const resultPlain = fs.readFileSync(path.resolve(fixturesDir, 'diffPlain'), 'utf-8');

  const table = [
    [before, after],
    [beforeYml, afterYml],
    [beforeIni, afterIni],
  ];

  test.each(table)('gendiff(%j, %j)', (a, b) => {
    expect(genDiff(a, b)).toBe(result);
    expect(genDiff(a, b, 'plain')).toBe(resultPlain);
  });
});
