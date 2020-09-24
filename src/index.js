import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import getBuildAst from './buildAst';
import formaters from './formatters';

const getCorrectPath = (filePath) => path.resolve(filePath);

const getExtName = (filePath) => path.extname(filePath).slice(1);

const gendiff = (path1, path2, format) => {
  const file1 = fs.readFileSync(getCorrectPath(path1), 'utf-8');
  const file2 = fs.readFileSync(getCorrectPath(path2), 'utf-8');

  const parseFile1 = parsers(getExtName(path1), file1);
  const parseFile2 = parsers(getExtName(path2), file2);

  const buildAst = getBuildAst(parseFile1, parseFile2);
  const renderNodes = formaters(format, buildAst);
  return renderNodes;
};

export default gendiff;
