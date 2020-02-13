import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (extension, data) => {
  const mapping = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  return mapping[extension](data);
};

export default parsers;
