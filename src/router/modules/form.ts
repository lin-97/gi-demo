import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const Form: AppRouteRecordRaw = {
  path: '/form',
  name: 'Form',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.form',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 3
  },
  children: [
    {
      path: 'base',
      name: 'FormBase',
      component: () => import('@/views/form/base/index.vue'),
      meta: { title: '基础表单', keepAlive: false, locale: 'menu.form.base', requiresAuth: true, roles: ['*'] }
    },
    {
      path: 'step',
      name: 'FormStep',
      component: () => import('@/views/form/step/index.vue'),
      meta: { title: '分步表单', keepAlive: false, locale: 'menu.form.step', requiresAuth: true, roles: ['*'] }
    }
  ]
}

export default Form
