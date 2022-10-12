import { DEFAULT_LAYOUT } from '../base'

const Error = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/error/403',
      name: 'Error403',
      component: () => import('@/views/error/403/index.vue'),
      meta: { title: '异常页403', keepAlive: false }
    },
    {
      path: '/error/404',
      name: 'Error404',
      component: () => import('@/views/error/404/index.vue'),
      meta: { title: '异常页404', keepAlive: false }
    },
    {
      path: '/error/500',
      name: 'Error500',
      component: () => import('@/views/error/405/index.vue'),
      meta: { title: '异常页500', keepAlive: false }
    }
  ]
}

export default Error
