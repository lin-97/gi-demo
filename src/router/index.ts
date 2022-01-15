import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/**
 * @desc 规定了数组元素类型是RouteRecordRaw, 它可以在定义路由时进行友善地提示
 */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', keepAlive: false }
  },
  {
    path: '/',
    redirect: '/home',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: { title: '首页', keepAlive: false },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/indicator-manage',
        name: 'IndicatorManage',
        component: () => import('@/views/indicator-manage/main/index.vue'),
        meta: { title: '指标管理', keepAlive: false }
      },
      {
        path: '/indicator-manage/add',
        name: 'IndicatorManageAdd',
        component: () => import('@/views/indicator-manage/add/index.vue'),
        meta: { title: '指标管理-新增', keepAlive: false }
      },
      {
        path: '/indicator-manage/detail',
        name: 'IndicatorManageDetail',
        component: () => import('@/views/indicator-manage/detail/index.vue'),
        meta: { title: '指标管理-详情', keepAlive: false }
      },
      {
        path: '/file-manage',
        name: 'FileManage',
        component: () => import('@/views/file-manage/main/index.vue'),
        meta: { title: '文件管理', keepAlive: false }
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/index.vue'),
        meta: { title: '个人中心', keepAlive: false }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
        meta: { title: '404页', keepAlive: false }
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/test/index.vue'),
        meta: { title: '测试页', keepAlive: false }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
