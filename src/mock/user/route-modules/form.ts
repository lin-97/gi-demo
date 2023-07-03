export default {
  name: 'Form',
  path: '/form',
  redirect: '/form/base',
  component: 'Layout',
  meta: {
    hidden: false,
    title: '表单管理',
    svgIcon: 'menu-form',
    keepAlive: false
  },
  children: [
    {
      name: 'FormBase',
      path: 'base',
      component: 'form/base/index',
      meta: {
        hidden: false,
        title: '基础表单',
        icon: 'icon-menu',
        keepAlive: false
      }
    },
    {
      name: 'Form',
      path: 'step',
      component: 'form/step/index',
      meta: {
        hidden: false,
        title: '分步表单',
        icon: 'icon-menu',
        keepAlive: false
      }
    }
  ]
}
