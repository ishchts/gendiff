/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import { has, union } from 'lodash';
import fs from 'fs';

export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf-8');
  const file2 = fs.readFileSync(pathToFile2, 'utf-8');

  const parseFile1 = JSON.parse(file1);
  const parseFile2 = JSON.parse(file2);

  const keysFile1 = Object.keys(parseFile1);
  const keysFile2 = Object.keys(parseFile2);

  const unionKeys = union(keysFile1, keysFile2);

  const difference = unionKeys.map((el) => {
    if (has(parseFile1, el) && has(parseFile2, el)) {
      if (parseFile1[el] === parseFile2[el]) {
        return ` ${el}: ${parseFile1[el]}`;
      }
      return [` - ${el}: ${parseFile1[el]}`, ` + ${el}: ${parseFile2[el]}`].join('\n');
    }

    if (!has(parseFile1, el) && has(parseFile2, el)) {
      return ` + ${el}: ${parseFile2[el]}`;
    }

    if (has(parseFile1, el) && !has(parseFile2, el)) {
      return ` - ${el}: ${parseFile1[el]}`;
    }
  });
  return ['{', ...difference, '}'].join('\n');
};
