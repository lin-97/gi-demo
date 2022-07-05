export default {
  path: '/form-manage',
  name: 'FormManage',
  component: () => import('@/layout/index.vue'),
  children: [
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
    }
  ]
}
