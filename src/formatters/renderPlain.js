// eslint-disable-next-line import/no-extraneous-dependencies
import { isObject } from 'lodash';

const getValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const dispatcher = {
  added: (obj) => `Property ${obj.name} was added with value: ${getValue(obj.afterValue)}`,
  removed: (obj) => `Property ${obj.name} was deleted`,
  updated: (obj) => `Property ${obj.name} was changed from ${getValue(obj.beforeValue)} to ${getValue(obj.afterValue)}`,
  nested: (obj, newName, func) => func(obj.children, newName),
  unchanged: () => [],
};

const renderPlain = (nodes, keys = '') => {
  const result = nodes.map((obj) => {
    const {
      type,
      name,
    } = obj;
    const newName = keys.length === 0 ? `${name}` : `${keys}.${name}`;
    return dispatcher[type](obj, newName, renderPlain);
  });

  return result.filter((el) => el.length > 0).join('\n');
};

export default renderPlain;
