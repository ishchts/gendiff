/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import { has, union } from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers';

export default (pathToFile1, pathToFile2) => {
  const doc = parsers(path.extname(pathToFile1));
  const file1 = doc(fs.readFileSync(path.resolve(pathToFile1), 'utf-8'));
  const file2 = doc(fs.readFileSync(path.resolve(pathToFile2), 'utf-8'));

  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const unionKeys = union(keysFile1, keysFile2);

  const difference = unionKeys.map((el) => {
    if (has(file1, el) && has(file2, el)) {
      if (file1[el] === file2[el]) {
        return ` ${el}: ${file1[el]}`;
      }
      return [` - ${el}: ${file1[el]}`, ` + ${el}: ${file2[el]}`].join('\n');
    }

    if (!has(file1, el) && has(file2, el)) {
      return ` + ${el}: ${file2[el]}`;
    }

    if (has(file1, el) && !has(file2, el)) {
      return ` - ${el}: ${file1[el]}`;
    }
  });
  return ['{', ...difference, '}'].join('\n');
};
