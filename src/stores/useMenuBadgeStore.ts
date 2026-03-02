import type { BadgeInstance } from '@arco-design/web-vue'
import { defineStore } from 'pinia'

const storeSetup = () => {
  // 菜单角标
  const badgeMap: Record<string, number> = reactive({
    '/crud/index': 6,
    '/form/base': 3,
    '/form/step': 5,
    '/table/dialog': 8
  })

  // 菜单角标属性
  const BadgePropsMap: Record<string, BadgeInstance['$props']> = {
    '/crud/index': {
      status: 'success'
    },
    '/form/base': {
      style: 'transform: scale(0.8);'
    },
    '/form/step': {
      style: { transform: 'scale(0.8)' },
      class: 'gi-badge-primary'
    },
    '/table/dialog': {
      style: { transform: 'scale(0.8)' },
      class: 'gi-badge-success'
    }
  }

  return { badgeMap, BadgePropsMap }
}

export const useMenuBadgeStore = defineStore('menu-badge', storeSetup)
