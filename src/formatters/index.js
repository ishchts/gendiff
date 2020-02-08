// eslint-disable-next-line import/no-unresolved
import renderSimple from './renderSimple';
import renderDefault from './renderDefault';
import renderPlain from './renderPlain';

const getFormat = (format) => {
  const node = {
    default: renderDefault,
    plain: renderPlain,
    json: renderSimple,
  };
  return node[format];
};

export default (ast, format) => getFormat(format)(ast);
