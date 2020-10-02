import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const extNames = ['json', 'yml', 'ini'];

let resultStylish;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultStylish = fs.readFileSync(getFixturePath('stylish'), 'utf-8');
  resultPlain = fs.readFileSync(getFixturePath('plain'), 'utf-8');
  resultJson = fs.readFileSync(getFixturePath('json'), 'utf-8');
});

extNames.forEach((ext) => {
  const pathFile1 = getFixturePath(`before.${ext}`);
  const pathFile2 = getFixturePath(`after.${ext}`);

  describe('gendiff test', () => {
    test(`${ext} extension test with stylish format`, () => {
      expect(gendiff(pathFile1, pathFile2, 'stylish')).toBe(resultStylish);
    });

    test(`${ext} extension test with plain format`, () => {
      expect(gendiff(pathFile1, pathFile2, 'plain')).toBe(resultPlain);
    });

    test(`${ext} extension test with json format`, () => {
      expect(gendiff(pathFile1, pathFile2, 'json')).toBe(resultJson);
    });
  });
});
