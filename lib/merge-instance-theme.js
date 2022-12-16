import merge from 'deepmerge';

export default function mergeInstanceTheme(base, id) {
  const instanceTreeName = 'instances';
  if (
    typeof id === 'undefined' ||
    typeof base[instanceTreeName] === 'undefined' ||
    typeof base[instanceTreeName][id] === 'undefined'
  ) return base;
  const merged = merge(base, base[instanceTreeName][id]);
  return merged;
}
