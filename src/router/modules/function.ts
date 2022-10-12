import { DEFAULT_LAYOUT } from '../base'

const Function = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/tool',
      name: 'Tool',
      component: () => import('@/views/tool/index.vue'),
      meta: {
        title: '功能页',
        keepAlive: false
      }
    }
  ]
}

export default Function
