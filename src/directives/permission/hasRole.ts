import type { Directive, DirectiveBinding } from 'vue'
import { hasRoleOr } from '@/utils/has'

/**
 * @desc v-hasRole 角色权限处理
 * @desc 使用 v-hasRole="['admin', 'user]"
 */
function checkRole(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  if (value && Array.isArray(value) && value.length) {
    const flag = hasRoleOr(value)
    if (!flag) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need role! Like v-hasRole="['admin','user']"`)
  }
}

const directive: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkRole(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkRole(el, binding)
  }
}

export default directive
