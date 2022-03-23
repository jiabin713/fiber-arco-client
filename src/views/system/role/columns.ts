export const Columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '角色编码',
    dataIndex: 'code',
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
    width: '10%',
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
