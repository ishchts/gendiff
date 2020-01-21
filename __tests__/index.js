/* eslint-disable no-undef */
import path from 'path';
import genDiff from '../src/index';
import fs from 'fs';

test('flat json comparisons', () => {
  const beforeFile = path.join(`${__dirname}`, '../', '__fixtures__/before.json');
  const afterFIle = path.join(`${__dirname}`, '../', '__fixtures__/after.json');
  const expected = fs.readFileSync(path.join(`${__dirname}`, '../', '__fixtures__/diffFlat'), 'utf-8');

  expect(genDiff(beforeFile, afterFIle)).toEqual(expected);
});
