import { has, union } from 'lodash';

const node = (name, type, beforeValue, afterValue, children = []) => ({
  name,
  type,
  beforeValue,
  afterValue,
  children,
});

const buildAst = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2));

  return keys.map((el) => {
    if (data1[el] instanceof Object && data2[el] instanceof Object) {
      return node(
        el,
        'nested',
        null,
        '',
        buildAst(data1[el], data2[el]),
      );
    }

    if (!has(data1, el)) {
      return node(
        el,
        'added',
        '',
        data2[el],
        [],
      );
    }

    if (!has(data2, el)) {
      return node(
        el,
        'removed',
        data1[el],
        '',
        [],
      );
    }

    if (data1[el] === data2[el]) {
      return node(
        el,
        'unchanged',
        data1[el],
        '',
        [],
      );
    }

    if (data1[el] !== data2[el]) {
      return node(
        el,
        'updated',
        data1[el],
        data2[el],
        [],
      );
    }

    return new Error('Unknown type');
  });
};

export default buildAst;
