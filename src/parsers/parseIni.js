import ini from 'ini';
import { isObject } from 'lodash';

const printValue = (value) => (parseFloat(value) ? parseFloat(value) : value);

const correctValue = (object) => {
  const entries = Object.entries(object);
  return entries.reduce((acc, [key, value]) => {
    if (!isObject(value)) {
      return { ...acc, [key]: printValue(value) };
    }
    return { ...acc, [key]: correctValue(value) };
  }, {});
};

export default (file) => correctValue(ini.parse(file));
