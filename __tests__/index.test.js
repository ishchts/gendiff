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

  test.each([
    [before, after, result],
    [beforeYml, afterYml, result],
    [beforeIni, afterIni, result],
  ])('.file(%j, %j)', (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  });
});
