export default {
  path: '/form',
  name: 'Form',
  redirect: '/form/base',
  component: 'Layout',
  meta: {
    hidden: false,
    title: '表单管理',
    svgIcon: 'menu-form',
    keepAlive: false,
    sort: 5
  },
  children: [
    {
      path: '/form/base',
      name: 'FormBase',
      component: 'form/base/index',
      meta: {
        hidden: false,
        title: '基础表单',
        icon: 'icon-menu',
        keepAlive: false
      }
    },
    {
      path: '/form/step',
      name: 'FormStep',
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
