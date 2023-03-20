import { defineStore } from 'pinia'
import { ref } from 'vue'

interface MenuState {
  menuTree: MenuItem[]
}

const storeSetup = () => {
  const menuTree = ref([
    {
      icon: 'menu-work',
      id: 'YBP',
      name: '仪表盘',
      path: '/dashboard',
      keepAlive: false,
      hidden: false,
      children: [
        {
          id: 'GZT',
          name: '工作台',
          path: '/dashboard/workplace',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'SJFX',
          name: '分析页',
          path: '/dashboard/analyse',
          keepAlive: false,
          hidden: false
        }
      ]
    },
    {
      icon: 'menu-data',
      id: 'ZBGL',
      name: '数据管理',
      path: '/data',
      keepAlive: true,
      hidden: false
    },
    {
      icon: 'menu-file',
      id: 'WJGL',
      name: '文件管理',
      path: '/file',
      keepAlive: false,
      hidden: false
    },
    {
      icon: 'menu-form',
      id: 'BDGL',
      name: '表单管理',
      path: '/form',
      keepAlive: true,
      hidden: false,
      children: [
        {
          id: 'JCBD',
          name: '基础表单',
          path: '/form/base',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'FBBD',
          name: '分步表单',
          path: '/form/step',
          keepAlive: false,
          hidden: false
        }
      ]
    },
    {
      icon: 'menu-table',
      id: 'BGGL',
      name: '表格管理',
      path: '/table',
      keepAlive: true,
      hidden: false,
      children: [
        {
          id: 'ZHBG',
          name: '综合表格',
          path: '/table/main',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'ZDYBG',
          name: '自定义表格',
          path: '/table/custom',
          keepAlive: false,
          hidden: false
        }
      ]
    },
    {
      icon: 'menu-system',
      id: 'XTGL',
      name: '系统管理',
      keepAlive: false,
      hidden: false,
      children: [
        {
          id: 'BMGL',
          name: '部门管理',
          path: '/system/dept',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'YHGL',
          name: '用户管理',
          path: '/system/user',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'JSGL',
          name: '角色管理',
          path: '/system/role',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'CDGL',
          name: '菜单管理',
          path: '/system/menu',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'GRZX',
          name: '个人中心',
          path: '/system/account',
          keepAlive: false,
          hidden: false
        }
      ]
    },
    {
      icon: 'menu-detail',
      id: 'XQYM',
      name: '详情页',
      path: '/detail',
      keepAlive: true,
      hidden: false,
      children: [
        {
          id: 'JCXQY',
          name: '基础详情页',
          path: '/detail/base',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'GJXQY',
          name: '高级详情页',
          path: '/detail/senior',
          keepAlive: false,
          hidden: false
        }
      ]
    },
    {
      icon: 'menu-error',
      id: 'ERROR',
      name: '异常页',
      keepAlive: false,
      hidden: false,
      children: [
        {
          id: 'error403',
          name: '403',
          path: '/error/403',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'error404',
          name: '404',
          path: '/error/404',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'error500',
          name: '500',
          path: '/error/500',
          keepAlive: false,
          hidden: false
        }
      ]
    },
    {
      icon: 'menu-result',
      id: 'RESULT',
      name: '结果页',
      keepAlive: false,
      hidden: false,
      children: [
        {
          id: 'page-success',
          name: '成功页',
          path: '/result/success',
          keepAlive: false,
          hidden: false
        },
        {
          id: 'page-fail',
          name: '失败页',
          path: '/result/fail',
          keepAlive: false,
          hidden: false
        }
      ]
    },
    {
      icon: 'menu-test',
      id: 'Tool',
      name: '功能页',
      path: '/tool',
      keepAlive: false,
      hidden: false
    },
    {
      icon: 'menu-about',
      id: 'ABOUT',
      name: '关于',
      path: '/about',
      keepAlive: false,
      hidden: false
    }
  ])
  return { menuTree }
}

export const useMenuStore = defineStore('menu', storeSetup, { persist: false })
