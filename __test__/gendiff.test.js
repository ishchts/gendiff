import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const extNames = ['json', 'yml', 'ini'];

let resultStylish;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultStylish = fs.readFileSync(path.join('__test__/__fixtures__/stylish'), 'utf-8');
  resultPlain = fs.readFileSync(path.join('__test__/__fixtures__/plain'), 'utf-8');
  resultJson = fs.readFileSync(path.join('__test__/__fixtures__/json'), 'utf-8');
});

extNames.forEach((ext) => {
  const pathFile1 = `__test__/__fixtures__/before.${ext}`;
  const pathFile2 = `__test__/__fixtures__/after.${ext}`;
  describe('test stylish', () => {
    test(`diff stylish ${ext}`, () => {
      expect(gendiff(pathFile1, pathFile2, 'stylish')).toBe(resultStylish);
    });
  });

  describe('test plain', () => {
    test(`diff stylish ${ext}`, () => {
      expect(gendiff(pathFile1, pathFile2, 'plain')).toBe(resultPlain);
    });
  });

  describe('test json', () => {
    test(`diff stylish ${ext}`, () => {
      expect(gendiff(pathFile1, pathFile2, 'json')).toBe(resultJson);
    });
  });
});
