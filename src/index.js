/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import { has, union } from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers';

const readFile = (filePath) => (
  fs.readFileSync(filePath, 'utf-8')
);

export default (pathToFile1, pathToFile2) => {
  const formatFile1 = path.extname(pathToFile1);
  const formatFile2 = path.extname(pathToFile2);

  const file1 = parsers(formatFile1, readFile(pathToFile1));
  const file2 = parsers(formatFile2, readFile(pathToFile2));

  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const unionKeys = union(keysFile1, keysFile2);
  const diff = unionKeys.map((el) => {
    if (has(file1, el) && has(file2, el)) {
      if (file1[el] === file2[el]) {
        return `  ${el}: ${file1[el]}`;
      }

      if (file1[el] !== file2[el]) {
        return [`  + ${el}: ${file2[el]}`, `  - ${el}: ${file1[el]}`].join('\n');
      }
    }

    if (!has(file1, el) && has(file2, el)) {
      return `  + ${el}: ${file2[el]}`;
    }

    if (has(file1, el) && !has(file2, el)) {
      return `  - ${el}: ${file1[el]}`;
    }
  });

  return ['{', ...diff, '}'].join('\n');
};
