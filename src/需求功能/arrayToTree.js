function arrayToTree(
  items,
  id = "id",
  parentId = "parentId",
  children = "children"
) {
  const result = [];
  const itemMap = {};

  // 初始化map
  items.forEach(item => {
    itemMap[item[id]] = { ...item, [children]: [] };
  });

  // 构建树
  items.forEach(item => {
    const currentItem = itemMap[item[id]];
    if (item[parentId]) {
      const parentItem = itemMap[item[parentId]];
      if (parentItem) {
        parentItem[children].push(currentItem);
      } else {
        // 父节点不存在，作为根节点
        result.push(currentItem);
      }
    } else {
      // 没有parentId，作为根节点
      result.push(currentItem);
    }
  });

  return result;
}

const flatArray = [
  { id: 1, name: "部门1", parentId: 0 },
  { id: 2, name: "部门2", parentId: 1 },
  { id: 3, name: "部门3", parentId: 1 },
  { id: 4, name: "部门4", parentId: 3 },
  { id: 5, name: "部门5", parentId: 4 },
  { id: 6, name: "部门6", parentId: 0 }
];

const treeData = arrayToTree(flatArray);

console.log(JSON.stringify(treeData));
