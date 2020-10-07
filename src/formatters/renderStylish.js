import { isObject } from 'lodash';
import { DIFF_TYPES } from '../constants';

const space = '    ';

const renderValue = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }

  const mapValues = Object.keys(value).map((el) => `${space.repeat(depth)}${space}${el}: ${renderValue(value[el], depth + 1)}`);

  return `{\n${mapValues.join('\n')}\n${space.repeat(depth)}}`;
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
        ].join('\n');
      }
      case DIFF_TYPES.UNCHANGED: {
        return `${space.repeat(depth)}${space}${el.name}: ${renderValue(el.afterValue, depth + 1)}`;
      }
      case DIFF_TYPES.NESTED: {
        return `${space.repeat(depth)}${space}${el.name}: {\n${iter(el.children, depth + 1).join('\n')}\n${space.repeat(depth)}${space}}`;
      }
      default: {
        throw Error('unknow type');
      }
    }
  });

  return `{\n${iter(diff).join('\n')}\n}`;
};

export default renderStylish;
