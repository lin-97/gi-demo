export default {
  path: '',
  redirect: '/file',
  component: 'Layout',
  meta: {
    hideen: false,
    title: '文件管理',
    icon: 'icon-folder',
    svgIcon: 'menu-file',
    keepAlive: true,
    sort: 4
  },
  children: [
    {
      path: '/file',
      name: 'File',
      component: 'file/main/index',
      meta: {
        title: '文件管理',
        icon: 'icon-folder',
        keepAlive: true,
        hidden: false,
        breadcrumb: false,
        query: { fileType: 0 }
      }
    },
    {
      path: '/file/detail',
      name: 'FileDetail',
      component: 'file/detail/index',
      meta: {
        hidden: true,
        title: '详情',
        keepAlive: false,
        affix: false,
        activeMenu: '/file'
      }
    }
  ]
}
