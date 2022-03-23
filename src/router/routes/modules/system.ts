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
    {
      path: 'organization',
      name: 'organization',
      component: () => import('@/views/system/organization/index.vue'),
      meta: {
        locale: '组织管理',
      },
    },
    {
      path: 'position',
      name: 'position',
      component: () => import('@/views/system/position/index.vue'),
      meta: {
        locale: '职位管理',
      },
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        locale: '角色管理',
      },
    },
    {
      path: 'staff',
      name: 'staff',
      component: () => import('@/views/system/staff/index.vue'),
      meta: {
        locale: '用户管理',
      },
    },
  ],
};
