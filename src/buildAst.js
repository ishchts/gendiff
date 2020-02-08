import { has, union } from 'lodash';

const node = (name, type, beforeValue, afterValue, children) => ({
    name,
    type,
    beforeValue,
    afterValue,
    children,
  });
  
const buildAst = (file1, file2) => {
const keys = union(Object.keys(file1), Object.keys(file2));

return keys.map((el) => {
    if (file1[el] instanceof Object && file2[el] instanceof Object) {
    return node(
        el,
        'nested',
        '',
        '',
        buildAst(file1[el], file2[el])
    );
    }

    if (!has(file1, el)) {
    return node(
        el,
        'added',
        '',
        file2[el],
        [],
    );
    }
    
    if (!has(file2, el)) {
    return node(
        el,
        'removed',
        file1[el],
        '',
        [],
    );
    }
    
    if (file1[el] === file2[el]) {
    return node(
        el,
        'unchanged',
        file1[el],
        '',
        [],
    )
    }
    
    if (file1[el] !== file2[el]) {
    return node(
        el,
        'updated',
        file1[el],
        file2[el],
        [],
    )
    }
    
})
}

export default buildAst;