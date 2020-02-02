import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (format, func) => {
  const mapping = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  return mapping[format](func);
};

export default parsers;
