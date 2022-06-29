import { createRouter, createWebHashHistory } from 'vue-router'
import { useAppStore, useMenuStore } from '@/store'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', keepAlive: false }
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
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
        path: '/file-manage/file-detail',
        name: 'FileManageFileDetail',
        component: () => import('@/views/file-manage/file-detail/index.vue'),
        meta: { title: '文件详情', keepAlive: false }
      },
      {
        path: '/form-manage/base-form',
        name: 'FormManageBaseForm',
        component: () => import('@/views/form-manage/base-form/index.vue'),
        meta: { title: '基础表单', keepAlive: false }
      },
      {
        path: '/form-manage/step-form',
        name: 'FormManageStepForm',
        component: () => import('@/views/form-manage/step-form/index.vue'),
        meta: { title: '分步表单', keepAlive: false }
      },
      {
        path: '/table-manage/main-table',
        name: 'TableManageMainTable',
        component: () => import('@/views/table-manage/main-table/index.vue'),
        meta: { title: '综合表格', keepAlive: false }
      },
      {
        path: '/table-manage/custom-table',
        name: 'TableManageCustomTable',
        component: () => import('@/views/table-manage/custom-table/index.vue'),
        meta: { title: '自定义表格', keepAlive: false }
      },
      {
        path: '/system-manage',
        name: 'SystemManage',
        component: () => import('@/views/system-manage/index.vue'),
        meta: { title: '系统管理', keepAlive: false }
      },
      {
        path: '/system-manage/dept-manage',
        name: 'SystemManageDeptManage',
        component: () => import('@/views/system-manage/dept-manage/index.vue'),
        meta: { title: '部门管理', keepAlive: false }
      },
      {
        path: '/system-manage/user-manage',
        name: 'SystemManageUserManage',
        component: () => import('@/views/system-manage/user-manage/index.vue'),
        meta: { title: '用户管理', keepAlive: false }
      },
      {
        path: '/system-manage/role-manage',
        name: 'SystemManageRoleManage',
        component: () => import('@/views/system-manage/role-manage/index.vue'),
        meta: { title: '角色管理', keepAlive: false }
      },
      {
        path: '/system-manage/menu-manage',
        name: 'SystemManageMenuManage',
        component: () => import('@/views/system-manage/menu-manage/index.vue'),
        meta: { title: '菜单管理', keepAlive: false }
      },
      {
        path: '/system-manage/user-center',
        name: 'SystemManageUserCenter',
        component: () => import('@/views/system-manage/user-center/index.vue'),
        meta: { title: '个人中心', keepAlive: false }
      },
      {
        path: '/detail-page/base-detail',
        name: 'DetailPageBaseDetail',
        component: () => import('@/views/detail-page/base-detail/index.vue'),
        meta: { title: '基础详情页', keepAlive: false }
      },
      {
        path: '/detail-page/senior-detail',
        name: 'DetailPageSeniorDetail',
        component: () => import('@/views/detail-page/senior-detail/index.vue'),
        meta: { title: '高级详情页', keepAlive: false }
      },
      // {
      //   path: '/error-page/:id',
      //   name: 'ErrorPage',
      //   component: () => import('@/views/error-page/index.vue'),
      //   meta: { title: '异常页', keepAlive: false }
      // },
      {
        path: '/error-page/403',
        name: 'ErrorPage403',
        component: () => import('@/views/error-page/index.vue'),
        meta: { title: '异常页403', keepAlive: false }
      },
      {
        path: '/error-page/404',
        name: 'ErrorPage404',
        component: () => import('@/views/error-page/index.vue'),
        meta: { title: '异常页404', keepAlive: false }
      },
      {
        path: '/error-page/500',
        name: 'ErrorPage500',
        component: () => import('@/views/error-page/index.vue'),
        meta: { title: '异常页500', keepAlive: false }
      },
      {
        path: '/result-page/success',
        name: 'ResultPageSuccess',
        component: () => import('@/views/result-page/success/index.vue'),
        meta: { title: '成功页', keepAlive: false }
      },
      {
        path: '/result-page/fail',
        name: 'ResultPageFail',
        component: () => import('@/views/result-page/fail/index.vue'),
        meta: { title: '失败页', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/index.vue'),
        meta: { title: '关于', keepAlive: false }
      },
      {
        path: '/document/vue3',
        name: 'DocumentVue3',
        component: () => import('@/views/document/vue3/index.vue'),
        meta: { title: 'vue3文档', keepAlive: false }
      },
      {
        path: '/document/arco-design',
        name: 'DocumentArcoDesign',
        component: () => import('@/views/document/arco-design/index.vue'),
        meta: { title: 'arco design文档', keepAlive: false }
      },
      {
        path: '/document/juejin',
        name: 'DocumentJueJin',
        component: () => import('@/views/document/juejin/index.vue'),
        meta: { title: '掘金', keepAlive: false }
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/test/index.vue'),
        meta: { title: '测试页', keepAlive: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  const menuStore = useMenuStore()
  console.log('to', to)
  // 设置侧边菜单栏的高亮路径
  const arr = menuStore.list.map((i) => i.path)
  console.log('arr', arr)
  if (arr.includes(to.path)) {
    appStore.setActivePath(to.path)
  }
  next()
})

export default router
