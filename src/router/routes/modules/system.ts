export default {
  path: 'system',
  name: 'system',
  component: () => import('@/views/system/index.vue'),
  // component: () => import('@/layout/page-view/index.vue'),
  meta: {
    locale: '系统管理',
    icon: 'icon-dashboard',
  },
  children: [
    {
      path: 'dictionary',
      name: 'dictionary',
      component: () => import('@/views/system/dictionary/index.vue'),
      meta: {
        locale: '字典管理',
      },
    },
  ],
};
