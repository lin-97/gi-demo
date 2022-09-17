import { createApp, type DirectiveBinding } from 'vue'
import Loading from '@/components/GiLoading.vue'

/**
 * @desc v-loading 指令
 */

interface Element {
  instance: InstanceType<typeof Loading> | null
}

// 元素添加类名
function addClass(el: HTMLElement, className: string) {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}

// 删除元素类名
function removeClass(el: HTMLElement, className: string) {
  el.classList.remove(className)
}

const appendEl = (el: HTMLElement & Element) => {
  if (!['relative', 'absolute', 'fixed'].includes(el.style.position)) {
    addClass(el, 'gi_relative')
  }
  el.instance && el.appendChild(el.instance.$el)
}

const removeEl = (el: HTMLElement & Element) => {
  removeClass(el, 'gi_relative')
  el.instance && el.removeChild(el.instance.$el)
}

const VLoading = {
  // 在绑定元素的父组件被挂载前调用
  mounted(el: HTMLElement & Element, binding: DirectiveBinding) {
    const app = createApp(Loading)
    const instance: any = app.mount(document.createElement('div'))
    el.instance = instance

    const loadingType = el.getAttribute('gi-loading-type')
    const loadingText = el.getAttribute('gi-loading-text') || ''

    el.instance && loadingType && el.instance.setLoadingType(loadingType)
    el.instance && el.instance.setLoadingText(loadingText)

    if (binding.value) {
      appendEl(el)
    }
  },
  // 更新后调用
  updated(el: HTMLElement & Element, binding: DirectiveBinding) {
    if (binding.value !== binding.oldValue) {
      const loadingType = el.getAttribute('gi-loading-type')
      const loadingText = el.getAttribute('gi-loading-text') || ''

      el.instance && loadingType && el.instance.setLoadingType(loadingType)
      el.instance && el.instance.setLoadingText(loadingText)

      binding.value ? appendEl(el) : removeEl(el)
    }
  }
}

export default VLoading
