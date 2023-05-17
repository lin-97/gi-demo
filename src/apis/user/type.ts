import type { RouteMeta } from 'vue-router'

export interface UserInfo {
  name: string
  avatar: string
  roles: string[]
  permissions: string[]
}

export interface LoginRes {
  token: string
}
