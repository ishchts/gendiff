import renderDefault from './renderDefault';
import renderPlain from './renderPlain';
// eslint-disable-next-line import/no-unresolved
import renderJSON from './renderJSON';

const getFormat = (format) => {
  const node = {
    default: renderDefault,
    plain: renderPlain,
    json: renderJSON,
  };
  return node[format];
};

export default (ast, format) => getFormat(format)(ast);
