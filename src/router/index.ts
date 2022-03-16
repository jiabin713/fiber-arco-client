import 'nprogress/nprogress.css';

import NProgress from 'nprogress'; // progress bar
import { createRouter, createWebHistory } from 'vue-router';

import PageLayout from '@/layout/page-layout/index.vue';

// import createRouteGuard from './guard';
import appRoutes from './routes';

// import Login from './routes/modules/login';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   redirect: 'login',
    // },
    // Login,
    {
      name: 'root',
      path: '/',
      component: PageLayout,
      children: appRoutes,
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'notFound',
    //   component: () => import('@/views/not-found/index.vue'),
    // },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

// createRouteGuard(router);

export default router;
