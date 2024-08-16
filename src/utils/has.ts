import { useUserStore } from '@/stores'

/** 判断是否有这个按钮权限 */
export function hasPerm(value: string) {
  const all = '*:*:*'
  const permissions = useUserStore().permissions
  return value ? permissions.some((v) => all === v || v === value) : false
}

/** 判断是否有这个按钮权限，只需包含其中一个 */
export function hasPermOr(value: string[]) {
  return value.some((i) => hasPerm(i))
}

/** 判断是否有这个按钮权限，必须全部拥有 */
export function hasPermAnd(value: string[]) {
  return value.every((i) => hasPerm(i))
}

/** 判断是否有这个角色权限 */
export function hasRole(role: string) {
  const all = 'role_admin'
  const roles = useUserStore().roles
  return role ? roles.some((v) => all === v || v === role) : false
}

/** 判断是否有这个角色权限，只需包含其中一个 */
export function hasRoleOr(roles: string[]) {
  return roles.some((i) => hasRole(i))
}

/** 判断是否有这个角色权限，必须全部拥有 */
export function hasRoleAnd(roles: string[]) {
  return roles.every((i) => hasRole(i))
}

export default {
  hasPerm,
  hasPermOr,
  hasPermAnd,
  hasRole,
  hasRoleOr,
  hasRoleAnd
}
