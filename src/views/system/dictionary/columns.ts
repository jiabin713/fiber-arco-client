export const Columns = [
  {
    title: '字典名称',
    dataIndex: 'name',
  },
  {
    title: '字典编码',
    dataIndex: 'code',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    slotName: 'updated_at',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
  },
];
