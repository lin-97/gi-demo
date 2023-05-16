import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@/router'
import asyncRouteSettings from '@/config/async-route'

const storeSetup = () => {
  const routes = ref<any>([])
  const addRoutes = ref<any>([])
  const defaultRoutes = ref<any>([])
  const sidebarRouters = ref<any>([])
}

export const usePermissionStore = defineStore('permission', storeSetup, { persist: true })
