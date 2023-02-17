/** @desc 默认布局 */
export const DEFAULT_LAYOUT = () => import('@/layout/index.vue')

/** @desc 静态路由 */
export const StaticRouteList = [
  {
    path: 'about',
    name: 'About',
    component: () => import('@/views/about/index.vue'),
    meta: {
      title: '关于',
      keepAlive: false
    }
  },
  {
    path: 'navigation',
    name: 'Navigation',
    component: () => import('@/views/navigation/index.vue'),
    meta: {
      title: '导航',
      keepAlive: false
    }
  },
  {
    path: 'tool',
    name: 'Tool',
    component: () => import('@/views/tool/index.vue'),
    meta: {
      title: '功能页',
      keepAlive: true
    }
  }
]
