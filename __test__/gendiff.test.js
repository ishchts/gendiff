import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const extNames = ['json', 'yml', 'ini'];

extNames.forEach((ext) => {
  describe('test stylish', () => {
    test(`diff stylish ${ext}`, () => {
      const resultFile = fs.readFileSync(path.join('__test__/__fixtures__/stylish'), 'utf-8');
      const pathFile1 = `__test__/__fixtures__/before.${ext}`;
      const pathFile2 = `__test__/__fixtures__/after.${ext}`;
      const result = gendiff(pathFile1, pathFile2, 'stylish');
      expect(result).toBe(resultFile);
    });
  });

  describe('test plain', () => {
    test(`diff stylish ${ext}`, () => {
      const resultFile = fs.readFileSync(path.join('__test__/__fixtures__/plain'), 'utf-8');
      const pathFile1 = `__test__/__fixtures__/before.${ext}`;
      const pathFile2 = `__test__/__fixtures__/after.${ext}`;
      const result = gendiff(pathFile1, pathFile2, 'plain');
      expect(result).toBe(resultFile);
    });
  });

  describe('test json', () => {
    test(`diff stylish ${ext}`, () => {
      const resultFile = fs.readFileSync(path.join('__test__/__fixtures__/json'), 'utf-8');
      const pathFile1 = `__test__/__fixtures__/before.${ext}`;
      const pathFile2 = `__test__/__fixtures__/after.${ext}`;
      const result = gendiff(pathFile1, pathFile2, 'json');

      expect(result).toBe(resultFile);
    });
  });
});
