import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const extNames = ['json', 'yml', 'ini'];

const getExpectedFile = (name) => fs.readFileSync(path.join(`__test__/__fixtures__/${name}`), 'utf-8');

extNames.forEach((ext) => {
  const pathFile1 = `__test__/__fixtures__/before.${ext}`;
  const pathFile2 = `__test__/__fixtures__/after.${ext}`;
  describe('test stylish', () => {
    test(`diff stylish ${ext}`, () => {
      const expectedFile = getExpectedFile('stylish');
      const result = gendiff(pathFile1, pathFile2, 'stylish');
      expect(result).toBe(expectedFile);
    });
  });

  describe('test plain', () => {
    test(`diff stylish ${ext}`, () => {
      const expectedFile = getExpectedFile('plain');
      const result = gendiff(pathFile1, pathFile2, 'plain');
      expect(result).toBe(expectedFile);
    });
  });

  describe('test json', () => {
    test(`diff stylish ${ext}`, () => {
      const expectedFile = getExpectedFile('json');
      const result = gendiff(pathFile1, pathFile2, 'json');

      expect(result).toBe(expectedFile);
    });
  });
});
