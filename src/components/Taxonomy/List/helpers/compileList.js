export default function compileList(data, groupBy = null) {

  if (groupBy == null) {
    return [{group: '*', items: data}];
  }

  const listByGroupKey = {};

  for (const item of data) {
    const groupKey = item[groupBy]
      .substring(0, 1)
      .toUpperCase();

    if (listByGroupKey[groupKey] == null) {
      listByGroupKey[groupKey] = [];
    }

    listByGroupKey[groupKey].push(item);
  }

  return Object.keys(listByGroupKey)
    .sort()
    .map(groupKey => ({
      group: groupKey,
      items: listByGroupKey[groupKey]
    }));

}
