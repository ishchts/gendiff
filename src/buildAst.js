import {
  uniq,
  isObject,
  has,
  get,
} from 'lodash';
import { DIFF_TYPES } from './constants';

/**
 * Возвращает объект с описанием свойств объекта
 * @param {string} name
 * @param {string} type
 * @param {*} beforeValue
 * @param {*} afterValue
 * @param {Array} children
 */
const makeNode = (name, type, beforeValue, afterValue, children) => ({
  name,
  type,
  beforeValue,
  afterValue,
  children,
});

const getBuildAst = (beforeFile, afterFile) => {
  const commonKeys = uniq([...Object.keys(beforeFile), ...Object.keys(afterFile)]);
  return commonKeys.sort().map((name) => {
    const beforeValue = beforeFile[name];
    const afterValue = afterFile[name];

    if (!has(afterFile, name)) {
      return makeNode(name, DIFF_TYPES.REMOVED, beforeValue, afterValue, null);
    }

    if (!has(beforeFile, name)) {
      return makeNode(name, DIFF_TYPES.ADDED, beforeValue, afterValue, null);
    }

    if (get(beforeFile, name) === get(afterFile, name)) {
      return makeNode(name, DIFF_TYPES.UNCHANGED, beforeValue, afterValue, null);
    }

    if (isObject(beforeValue) && isObject(afterValue)) {
      return makeNode(name, DIFF_TYPES.NESTED, null, null, getBuildAst(beforeValue, afterValue));
    }

    return makeNode(name, DIFF_TYPES.UPDATED, beforeValue, afterValue, null);
  });
};

export default getBuildAst;
