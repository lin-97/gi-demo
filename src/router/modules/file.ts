export default {
  path: '/file-manage',
  name: 'FileManage',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/file-manage',
      name: 'FileManageMain',
      component: () => import('@/views/file-manage/main/index.vue'),
      meta: { title: '文件管理', keepAlive: false }
    },
    {
      path: '/file-manage/file-detail',
      name: 'FileManageFileDetail',
      component: () => import('@/views/file-manage/file-detail/index.vue'),
      meta: { title: '文件详情', keepAlive: false }
    }
  ]
}
