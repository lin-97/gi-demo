export default {
  name: 'Error',
  path: '/error',
  redirect: '/form/403',
  component: 'Layout',
  meta: {
    hidden: false,
    title: '错误页',
    svgIcon: 'menu-error',
    keepAlive: false
  },
  children: [
    {
      name: 'Error403',
      path: '403',
      component: 'error/403',
      meta: {
        hidden: false,
        title: '403页',
        icon: 'icon-menu',
        keepAlive: false,
        affix: false
      }
    },
    {
      name: 'Error404',
      path: '404',
      component: 'error/404',
      meta: {
        hidden: false,
        title: '404页',
        icon: 'icon-menu',
        keepAlive: false,
        affix: false
      }
    },
    {
      name: 'Error405',
      path: '405',
      component: 'error/405',
      meta: {
        hidden: false,
        title: '405页',
        icon: 'icon-menu',
        keepAlive: false,
        affix: false
      }
    }
  ]
}
