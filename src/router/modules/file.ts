import { DEFAULT_LAYOUT } from '../base'

const File = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/file',
      name: 'File',
      component: () => import('@/views/file/main/index.vue'),
      meta: {
        title: '文件管理',
        keepAlive: false
      }
    },
    {
      path: '/file/detail',
      name: 'FileDetail',
      component: () => import('@/views/file/detail/index.vue'),
      meta: {
        title: '文件详情',
        keepAlive: false
      }
    }
  ]
}

export default File
