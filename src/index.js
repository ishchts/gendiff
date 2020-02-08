/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import buildAst from './buildAst';
import formatters from './formatters';

const readFile = (filePath) => (
  fs.readFileSync(path.resolve(filePath), 'utf-8')
);

export default (pathToFile1, pathToFile2, format = 'default') => {
  const formatFile1 = path.extname(pathToFile1);
  const formatFile2 = path.extname(pathToFile2);

  const file1 = parsers(formatFile1, readFile(pathToFile1));
  const file2 = parsers(formatFile2, readFile(pathToFile2));

  const ast = buildAst(file1, file2);
  return formatters(ast, format);
};
