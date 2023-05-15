import type { DirectiveBinding, Directive } from 'vue'
import { usePermissionStore } from '@/store'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const permissionStore = usePermissionStore()
  const { value } = binding
  if (value && Array.isArray(value) && value.length) {
    const hasPermission = permissionStore.permissionList.some((item) => value.includes(item))
    if (!hasPermission && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need permission! Like v-permission="['home:btn:edit','home:btn:delete']"`)
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
