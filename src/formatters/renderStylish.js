import os from 'os';
import { isObject } from 'lodash';
import { DIFF_TYPES } from '../constants';

const space = '    ';

const renderValue = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }

  const mapValues = Object.keys(value).map((el) => `${space.repeat(depth)}${space}${el}: ${renderValue(value[el], depth + 1)}`);

  return `{${os.EOL}${mapValues.join(os.EOL)}${os.EOL}${space.repeat(depth)}}`;
};

const renderStylish = (diff) => {
  const iter = (node, depth = 0) => node.map((el) => {
    switch (el.type) {
      case DIFF_TYPES.ADDED: {
        return `${space.repeat(depth)}  + ${el.name}: ${renderValue(el.afterValue, depth + 1)}`;
      }
      case DIFF_TYPES.REMOVED: {
        return `${space.repeat(depth)}  - ${el.name}: ${renderValue(el.beforeValue, depth + 1)}`;
      }
      case DIFF_TYPES.UPDATED: {
        return [
          `${space.repeat(depth)}  - ${el.name}: ${renderValue(el.beforeValue, depth + 1)}`,
          `${space.repeat(depth)}  + ${el.name}: ${renderValue(el.afterValue, depth + 1)}`,
        ].join(os.EOL);
      }
      case DIFF_TYPES.UNCHANGED: {
        return `${space.repeat(depth)}${space}${el.name}: ${renderValue(el.afterValue, depth + 1)}`;
      }
      case DIFF_TYPES.NESTED: {
        return `${space.repeat(depth)}${space}${el.name}: {${os.EOL}${iter(el.children, depth + 1).join(os.EOL)}${os.EOL}${space.repeat(depth)}${space}}`;
      }
      default: {
        throw Error('unknow type');
      }
    }
  });

  return `{${os.EOL}${iter(diff).join(os.EOL)}${os.EOL}}`;
};

export default renderStylish;
