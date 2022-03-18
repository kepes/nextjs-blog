export default function mergeInstanceTheme(base, id) {
  const instanceTreeName = 'instances';
  const merged = {};

  Object.keys(base).forEach((key) => {
    if (key === instanceTreeName && typeof base[key][id] !== 'undefined') {
      Object.keys(base[key][id]).forEach((ikey) => {
        merged[ikey] = base[key][id][ikey];
      });
    } else {
      merged[key] = base[key];
    }
  });
  return merged;
}
