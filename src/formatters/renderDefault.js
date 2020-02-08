/* eslint-disable array-callback-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import { isObject, flatten } from 'lodash';

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

const dispatcher = {
  nested: (obj, depth, render) => `${getSpaces(depth + depthStep)}${obj.name}: ${render(obj.children, depth + depthStep)}`,
  added: (obj, depth) => `  ${getSpaces(depth)}+ ${obj.name}: ${stringify(obj.afterValue, depth + depthStep)}`,
  updated: (obj, depth) => [
    `  ${getSpaces(depth)}+ ${obj.name}: ${stringify(obj.afterValue, depth + depthStep)}`,
    `  ${getSpaces(depth)}- ${obj.name}: ${stringify(obj.beforeValue, depth + depthStep)}`],
  removed: (obj, depth) => `  ${getSpaces(depth)}- ${obj.name}: ${stringify(obj.beforeValue, depth + depthStep)}`,
  unchanged: (obj, depth) => `${getSpaces(depth + depthStep)}${obj.name}: ${stringify(obj.beforeValue, depth + depthStep)}`,
};

const renderDefault = (node, depth = 0) => {
  const result = node.map((el) => dispatcher[el.type](el, depth, renderDefault));
  return `{\n${flatten(result).join('\n')}\n${getSpaces(depth)}}`;
};

export default renderDefault;
