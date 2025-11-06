import type { Directive, DirectiveBinding } from 'vue'
import { hasRoleOr } from '@/utils/has'

/**
 * 角色检查函数
 * @description 检查元素是否具有指定的角色，如果没有角色则移除该元素
 * @param el - 要检查的 DOM 元素
 * @param binding - 指令绑定对象
 * @throws {Error} 当角色参数格式不正确时抛出错误
 */
function checkRole(el: HTMLElement, binding: DirectiveBinding<string[]>) {
  const { value } = binding

  // 检查角色参数是否有效
  if (!value || !Array.isArray(value) || value.length === 0) {
    throw new Error('角色参数格式错误，示例：v-hasRole="[\'admin\',\'user\']"')
  }

  // 检查是否具有角色
  const hasRole = hasRoleOr(value)
  if (!hasRole) {
    el.parentNode?.removeChild(el)
  }
}

/**
 * 角色权限指令
 * @description 用于控制元素的显示/隐藏，基于用户角色
 * @example
 * ```vue
 * <div v-hasRole="['admin']">管理员可见</div>
 * <div v-hasRole="['admin', 'user']">管理员或用户可见</div>
 * ```
 */
const hasRoleDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
    checkRole(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string[]>) {
    checkRole(el, binding)
  }
}

export default hasRoleDirective
