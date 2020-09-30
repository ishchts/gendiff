import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getBuildAst from './buildAst';
import render from './formatters';

const getFullPath = (filePath) => path.resolve(filePath);

const getExtName = (filePath) => path.extname(filePath).slice(1);

const gendiff = (beforePath, afterPath, format) => {
  const beforeFile = fs.readFileSync(getFullPath(beforePath), 'utf-8');
  const afterFile = fs.readFileSync(getFullPath(afterPath), 'utf-8');

  const parseBeforeFile = parse(getExtName(beforePath), beforeFile);
  const parseAfterFile = parse(getExtName(afterPath), afterFile);

  const buildAst = getBuildAst(parseBeforeFile, parseAfterFile);
  const result = render(format, buildAst);
  return result;
};

export default gendiff;
