export default {
  path: '/file',
  component: 'Layout',
  redirect: '/file/main',
  meta: {
    hideen: false,
    title: '文件管理',
    icon: 'icon-folder',
    svgIcon: 'menu-file',
    keepAlive: true
  },
  children: [
    {
      name: 'File',
      path: 'main',
      component: 'file/main/index',
      meta: {
        title: '文件管理',
        icon: 'icon-folder',
        keepAlive: true,
        hidden: false,
        breadcrumb: false
      }
    },
    {
      name: 'FileDetail',
      path: 'detail',
      component: 'file/detail/index',
      meta: {
        hidden: true,
        title: '详情',
        keepAlive: false,
        affix: false,
        activeMenu: '/file/main'
      }
    }
  ]
}
