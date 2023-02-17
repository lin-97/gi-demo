export default [
  {
    path: '/form/base',
    name: 'FormBase',
    component: () => import('@/views/form/base/index.vue'),
    meta: { title: '基础表单', keepAlive: false }
  },
  {
    path: '/form/step',
    name: 'FormStep',
    component: () => import('@/views/form/step/index.vue'),
    meta: { title: '分步表单', keepAlive: false }
  }
]
