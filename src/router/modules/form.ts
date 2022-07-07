export default {
  path: '/form',
  name: 'Form',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/form/base-form',
      name: 'FormBaseForm',
      component: () => import('@/views/form/base-form/index.vue'),
      meta: { title: '基础表单', keepAlive: false }
    },
    {
      path: '/form/step-form',
      name: 'FormStepForm',
      component: () => import('@/views/form/step-form/index.vue'),
      meta: { title: '分步表单', keepAlive: false }
    }
  ]
}
