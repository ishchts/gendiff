import yaml from 'js-yaml';
import parseIni from './parseIni';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (extName, rawData) => {
  if (parsers[extName]) {
    return parsers[extName](rawData);
  }

  throw Error(`unknow type ${extName}`);
};
