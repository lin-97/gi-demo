export default {
  path: '',
  redirect: '/demo',
  component: 'Layout',
  children: [
    {
      name: 'Demo',
      path: 'demo',
      component: 'demo/index',
      meta: {
        hideen: false,
        title: '示例页',
        svgIcon: 'menu-example',
        keepAlive: false
      }
    }
  ]
}
