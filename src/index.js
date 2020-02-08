/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import { isObject, flatten } from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import buildAst from './buildAst';

const readFile = (filePath) => (
  fs.readFileSync(path.resolve(filePath), 'utf-8')
);

const depthStep = 1;
const getSpaces = (depth) => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }
  return `{\n${Object.keys(value)
    .map((key) => `${getSpaces(depth + depthStep)}${key}: ${value[key]}`)
    .join('\n')}\n${getSpaces(depth)}}`;
};

export default (pathToFile1, pathToFile2) => {
  const formatFile1 = path.extname(pathToFile1);
  const formatFile2 = path.extname(pathToFile2);

  const file1 = parsers(formatFile1, readFile(pathToFile1));
  const file2 = parsers(formatFile2, readFile(pathToFile2));

  const ast = buildAst(file1, file2);

  const render = (node, depth = 0) => {
    const result = node.map((el) => {
      const {
        name,
        type,
        children,
        beforeValue,
        afterValue,
      } = el;

      if (type === 'added') {
        return `  ${getSpaces(depth)}+ ${name}: ${stringify(afterValue, depth + depthStep)}`;
      }

      if (type === 'updated') {
        return [
          `  ${getSpaces(depth)}+ ${name}: ${stringify(afterValue, depth + depthStep)}`,
          `  ${getSpaces(depth)}- ${name}: ${stringify(beforeValue, depth + depthStep)}`,
        ];
      }

      if (type === 'removed') {
        return `  ${getSpaces(depth)}- ${name}: ${stringify(beforeValue, depth + depthStep)}`;
      }

      if (type === 'nested') {
        return `${getSpaces(depth + depthStep)}${name}: ${render(children, depth + depthStep)}`;
      }

      if (type === 'unchanged') {
        return `${getSpaces(depth + depthStep)}${name}: ${stringify(beforeValue, depth + depthStep)}`;
      }
    });

    return `{\n${flatten(result).join('\n')}\n${getSpaces(depth)}}`;
  };
  return render(ast);
};
