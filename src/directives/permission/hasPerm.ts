import type { Directive, DirectiveBinding } from 'vue'
import { hasPermOr } from '@/utils/has'

/**
 * @desc v-hasPerm 操作权限处理
 * @desc 使用 v-hasPerm="['home:btn:add']"
 */
function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  if (value && Array.isArray(value) && value.length) {
    const flag = hasPermOr(value)
    if (!flag) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need permission! Like v-hasPerm="['home:btn:edit','home:btn:delete']"`)
  }
}

const directive: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  }
}

export default directive
