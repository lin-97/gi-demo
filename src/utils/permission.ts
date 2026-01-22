import { useUserStore } from '@/stores'

/** 超级管理员权限标识 */
const SUPER_ADMIN_PERMISSION = '*:*:*'
/** 超级管理员角色标识 */
const SUPER_ADMIN_ROLE = 'role_admin'

/**
 * 判断是否拥有指定权限
 * @description 检查用户是否拥有指定的权限标识，超级管理员拥有所有权限
 * @param permission - 权限标识
 * @returns {boolean} 是否拥有权限
 */
export function hasPerm(permission: string): boolean {
  if (!permission) return false
  const permissions = useUserStore().permissions
  return permissions.some((v) => v === SUPER_ADMIN_PERMISSION || v === permission)
}

/**
 * 判断是否拥有多个权限中的任意一个
 * @description 检查用户是否拥有指定权限列表中的任意一个权限
 * @param permissions - 权限标识数组
 * @returns {boolean} 是否拥有任意一个权限
 */
export function hasPermOr(permissions: string[]): boolean {
  return permissions.some((permission) => hasPerm(permission))
}

/**
 * 判断是否拥有所有指定权限
 * @description 检查用户是否同时拥有指定权限列表中的所有权限
 * @param permissions - 权限标识数组
 * @returns {boolean} 是否拥有所有权限
 */
export function hasPermAnd(permissions: string[]): boolean {
  return permissions.every((permission) => hasPerm(permission))
}

/**
 * 判断是否拥有指定角色
 * @description 检查用户是否拥有指定的角色标识，超级管理员拥有所有角色
 * @param role - 角色标识
 * @returns {boolean} 是否拥有角色
 */
export function hasRole(role: string): boolean {
  if (!role) return false
  const roles = useUserStore().roles
  return roles.some((v) => v === SUPER_ADMIN_ROLE || v === role)
}

/**
 * 判断是否拥有多个角色中的任意一个
 * @description 检查用户是否拥有指定角色列表中的任意一个角色
 * @param roles - 角色标识数组
 * @returns {boolean} 是否拥有任意一个角色
 */
export function hasRoleOr(roles: string[]): boolean {
  return roles.some((role) => hasRole(role))
}

/**
 * 判断是否拥有所有指定角色
 * @description 检查用户是否同时拥有指定角色列表中的所有角色
 * @param roles - 角色标识数组
 * @returns {boolean} 是否拥有所有角色
 */
export function hasRoleAnd(roles: string[]): boolean {
  return roles.every((role) => hasRole(role))
}

/** 权限判断工具对象 */
export default {
  hasPerm,
  hasPermOr,
  hasPermAnd,
  hasRole,
  hasRoleOr,
  hasRoleAnd
}
