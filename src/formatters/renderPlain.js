import os from 'os';
import { has, isObject } from 'lodash';
import { DIFF_TYPES } from '../constants';

const getValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const dispatcher = {
  [DIFF_TYPES.ADDED]: (obj, newName) => `Property '${newName}' was added with value: ${getValue(obj.afterValue)}`,
  [DIFF_TYPES.REMOVED]: (obj, newName) => `Property '${newName}' was removed`,
  [DIFF_TYPES.UPDATED]: (obj, newName) => `Property '${newName}' was updated. From ${getValue(obj.beforeValue)} to ${getValue(obj.afterValue)}`,
  [DIFF_TYPES.NESTED]: (obj, newName, func) => func(obj.children, newName),
  [DIFF_TYPES.UNCHANGED]: () => [],
};

const renderPlain = (nodes, ancestors = '') => {
  const result = nodes.map((obj) => {
    const { type, name } = obj;
    const newName = ancestors.length === 0 ? `${name}` : `${ancestors}.${name}`;
    if (has(dispatcher, type)) {
      return dispatcher[type](obj, newName, renderPlain);
    }
    throw Error(`Unknow type ${type}`);
  });

  return result.filter((el) => el.length > 0).join(os.EOL);
};

export default renderPlain;
