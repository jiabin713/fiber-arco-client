export interface TreeNode {
  id: string;
  parent_id: string;
  children: TreeNode[];
}

export const buildIdList = (data: TreeNode[]) => {
  return data.map((e) => e.id);
};

export const buildTree = (data: TreeNode[]) => {
  const parents: any = [];
  const idList = buildIdList(data);
  data.forEach((e) => {
    if (
      e.parent_id == 'root' ||
      e.parent_id == null ||
      idList.indexOf(e.parent_id) == -1
    ) {
      parents.push(e);
    }
  });

  const translator = (parents: TreeNode[], data: TreeNode[]) => {
    parents.forEach((parent) => {
      data.forEach((current, index) => {
        if (current.parent_id === parent.id) {
          const temp = JSON.parse(JSON.stringify(data));
          temp.splice(index, 1);
          translator([current], temp);
          if (typeof parent.children !== 'undefined') {
            parent.children.push(current);
          } else {
            parent.children = [current];
          }
        }
      });
    });
  };
  translator(parents, data);
  return parents;
};

export const buildSelectData = (rawData: any) => {
  return rawData.map((item: any) => {
    return {
      title: item.name,
      label: item.name,
      name: item.name,
      id: item.id,
      icon: item.icon,
      value: item.id,
      key: item.id,
      pid: item.pid,
    };
  });
};
