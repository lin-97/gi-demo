import { DEFAULT_LAYOUT } from '../base'

const Deatail = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/detail/base',
      name: 'BaseDetail',
      component: () => import('@/views/detail/base/index.vue'),
      meta: {
        title: '基础详情页',
        keepAlive: false
      }
    },
    {
      path: '/detail/senior',
      name: 'SeniorDetail',
      component: () => import('@/views/detail/senior/index.vue'),
      meta: {
        title: '高级详情页',
        keepAlive: false
      }
    }
  ]
}

export default Deatail
