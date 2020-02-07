/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import { has, union } from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers';

const readFile = (filePath) => (
  fs.readFileSync(path.resolve(filePath), 'utf-8')
);

const types = {
  unchanged: 'unchanged',
  added: 'added',
  changed: 'changed',
  removed: 'removed',
  nested: 'nested',
};

const node = ({ name, beforeValue = null, afterValue = null, type, children }) => {
  return {
    name,
    type,
    beforeValue,
    afterValue,
    children,
  };
};

const ast = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const unionKeys = union(keysFile1, keysFile2);

  return unionKeys.map(el => {
    const beforeValue = file1[el];
    const afterValue = file2[el];

    if (beforeValue instanceof Object && afterValue instanceof Object) {
      return node({ name: el, type: 'nested', children: ast(beforeValue, afterValue) });
    }
    if (has(file1, el) && has(file2, el)) {
      if (beforeValue === afterValue) {
        return node({ name: el, beforeValue, afterValue, type: 'unchanged', children: [] });
      }

      if (beforeValue !== afterValue) {
        return node({ name: el, beforeValue, afterValue, type: 'changed', children: [] });
      }
    }

    if (!has(file1, el) && has(file2, el)) {
      return node({ name: el, afterValue, type: 'added', children: [] });
    }

    if (has(file1, el) && !has(file2, el)) {
      return node({ name: el, beforeValue, type: 'removed', children: [] });
    }
  });
};

const renderAst = (nodes) => {

  return nodes.map(node => {
    if (node instanceof Array) {
      return renderAst(node);
    }

    const { type, name, beforeValue, afterValue, children } = node;
    if (type === 'nested') {
      return `  ${name} ${['{', ...renderAst(children), '}'].join('\n')}`;
    }

    if (type === 'unchanged') {
      return `    ${name}: ${beforeValue}`;
    };

    if (type === 'changed') {
      return [`  + ${name}: ${afterValue}`, `  - ${name}: ${beforeValue}`].join('\n');
    }

    if (type === 'added') {
      return `  + ${name}: ${afterValue}`;
    }

    if (type === 'removed') {
      return `  - ${name}: ${beforeValue}`;
    }

    return '123'
  });
};

export default (pathToFile1, pathToFile2) => {
  const formatFile1 = path.extname(pathToFile1);
  const formatFile2 = path.extname(pathToFile2);

  const file1 = parsers(formatFile1, readFile(pathToFile1));
  const file2 = parsers(formatFile2, readFile(pathToFile2));

  const buildAst = ast(file1, file2);

  return ['{', ...renderAst(buildAst), '}'].join('\n');
};
