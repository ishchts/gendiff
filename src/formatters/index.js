import renderStylish from './renderStylish';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const actions = {
  stylish: renderStylish,
  plain: renderPlain,
  json: renderJson,
};

export default (format, data) => actions[format](data);
