export default {
  path: '',
  redirect: '/about',
  component: 'Layout',
  children: [
    {
      path: '/about',
      name: 'About',
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
