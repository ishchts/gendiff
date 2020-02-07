/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import { has, union, isObject, flatten } from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers';

const readFile = (filePath) => (
  fs.readFileSync(path.resolve(filePath), 'utf-8')
);

const node = ({ name, beforeValue = null, afterValue = null, type, children }) => {
  return {
    name,
    type,
    beforeValue,
    afterValue,
    children,
  };
};

const buildAst = (file1, file2) => {
  const keys = union(Object.keys(file1), Object.keys(file2));

  return keys.map((el) => {
    if (file1[el] instanceof Object && file2[el] instanceof Object) {
      return node({
        name: el,
        type: 'nested',
        beforeValue: '',
        afterValue: '',
        children: buildAst(file1[el], file2[el])
      });
    }

    if (!has(file2[el])) {
      return node({
        name: el,
        type: 'removed',
        beforeValue: file1[el],
        afterValue: '',
        children: [],
      });
    }

    if (!has(file1[el])) {
      return node({
        name: el,
        type: 'added',
        beforeValue: '',
        afterValue: file2[el],
        children: [],
      });
    }

    if (file1[el] === file2[el]) {
      return node({
        name: el,
        type: 'unchanged',
        beforeValue: file1[el],
        afterValue: '',
        children: [],
      })
    }

    if (file1[el] !== file2[el]) {
      return node({
        name: el,
        type: 'updated',
        beforeValue: file1[el],
        afterValue: file2[el],
        children: [],
      })
    }
    
  })
}

const depthStep = 1;
const getSpaces = depth => '    '.repeat(depth);

const types = {
  updated: 'updated',
  added: 'added',
  removed: 'removed',
  nested: 'nested',
  unchanged: 'unchanged',
};

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }
  return `{\n${Object.keys(value)
    .map(key => `${getSpaces(depth + depthStep)}${key}: ${value[key]}`)
    .join('\n')}\n${getSpaces(depth)}}`;
};

const render = (ast, depth = 0) => {
  const result = ast.map(node => propertyActions[node.type](node, depth, render));
  return `{\n${flatten(result).join('\n')}\n${getSpaces(depth)}}`;
};

export default (pathToFile1, pathToFile2) => {
  const formatFile1 = path.extname(pathToFile1);
  const formatFile2 = path.extname(pathToFile2);

  const file1 = parsers(formatFile1, readFile(pathToFile1));
  const file2 = parsers(formatFile2, readFile(pathToFile2));

  const ast = buildAst(file1, file2);
  
  const render = (node, depth = 0) => {
    const result = node.map(el => {
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
          `  ${getSpaces(depth)}- ${name}: ${stringify(beforeValue, depth + depthStep)}`
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
  }
  return render(ast);
};
