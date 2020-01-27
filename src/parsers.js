import yaml from 'js-yaml';

const parsers = (fileName) => {
  const mapping = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
  };

  return mapping[fileName];
};

export default parsers;
