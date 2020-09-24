import yaml from 'js-yaml';
import parseIni from './parseIni';

const actions = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (extName, file) => {
  switch (extName) {
    case 'json': {
      return actions[extName](file);
    }

    case 'yml': {
      return actions[extName](file);
    }

    case 'ini': {
      return parseIni(file);
    }

    default: {
      throw Error(`unknow type ${extName}`);
    }
  }
};
