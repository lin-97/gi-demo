import type { Directive, DirectiveBinding } from 'vue'
import { hasPermOr } from '@/utils/has'

/**
 * 权限检查函数
 * @description 检查元素是否具有指定的权限，如果没有权限则移除该元素
 * @param el - 要检查的 DOM 元素
 * @param binding - 指令绑定对象
 * @throws {Error} 当权限参数格式不正确时抛出错误
 */
function checkPermission(el: HTMLElement, binding: DirectiveBinding<string[]>) {
  const { value } = binding

  // 检查权限参数是否有效
  if (!value || !Array.isArray(value) || value.length === 0) {
    throw new Error('权限参数格式错误，示例：v-hasPerm="[\'home:btn:edit\',\'home:btn:delete\']"')
  }

  // 检查是否具有权限
  const hasPermission = hasPermOr(value)
  if (!hasPermission) {
    el.parentNode?.removeChild(el)
  }
}

/**
 * 权限指令
 * @description 用于控制元素的显示/隐藏，基于用户权限
 * @example
 * ```vue
 * <button v-hasPerm="['home:btn:add']">添加</button>
 * <button v-hasPerm="['home:btn:edit', 'home:btn:delete']">编辑/删除</button>
 * ```
 */
const hasPermDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string[]>) {
    checkPermission(el, binding)
  }
}

export default hasPermDirective
