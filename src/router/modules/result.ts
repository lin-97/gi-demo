import { DEFAULT_LAYOUT } from '../base'

const Result = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/result/success',
      name: 'ResultSuccess',
      component: () => import('@/views/result/success/index.vue'),
      meta: { title: '成功页', keepAlive: false }
    },
    {
      path: '/result/fail',
      name: 'ResultFail',
      component: () => import('@/views/result/fail/index.vue'),
      meta: { title: '失败页', keepAlive: false }
    }
  ]
}

export default Result
