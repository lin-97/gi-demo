export default {
  path: '',
  redirect: '/about',
  component: 'Layout',
  children: [
    {
      name: 'About',
      path: 'about',
      component: 'about/index',
      meta: {
        hideen: false,
        title: '关于我们',
        svgIcon: 'menu-about',
        keepAlive: false
      }
    }
  ]
}
