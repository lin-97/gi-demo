import { createApp } from 'vue'
import Loading from '@/components/GiLoading.vue'

/**
 * @desc v-loading 指令
 * @param {el} 指令所绑定的元素, 可以直接操作DOM
 * @param {binding} 是一个对象, 包含该指令的所有信息
 *     arg 自定义指令的参数名
 *     value 自定义指令绑定的值
 *     oldValue 指令绑定的前一个值
 *     dir 被执行的钩子函数
 *     modifiers 一个包含修饰符的对象
 */

const name: string = Loading.name // 组件名(实例key)

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

const appendEl = (el: any) => {
  if (!['relative', 'absolute', 'fixed'].includes(el.style.position)) {
    addClass(el, 'gi_relative')
  }
  el.style['pointer-events'] = 'none'
  el.appendChild(el.instance.$el)
}

const removeEl = (el: any) => {
  removeClass(el, 'gi_relative')
  el.style['pointer-events'] = 'inherit'
  el.removeChild(el.instance.$el)
}

const loadingObj = {
  // 在绑定元素的父组件被挂载前调用
  mounted(el: any, binding: any) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))

    const loadingType = el.getAttribute('gi-loading-type') || ''
    const loadingText = el.getAttribute('gi-loading-text') || ''

    if (loadingType) {
      instance.setLoadingType(loadingType)
    }
    if (loadingText) {
      instance.setLoadingText(loadingText)
    }

    el.instance = instance

    if (binding.value) {
      appendEl(el)
    }
  },
  // 更新后调用
  updated(el: any, binding: any) {
    if (binding.value !== binding.oldValue) {
      const loadingType = el.getAttribute('gi-loading-type') || ''
      const loadingText = el.getAttribute('gi-loading-text') || ''

      if (loadingType) {
        el.instance.setLoadingType(loadingType)
      }
      if (loadingText) {
        el.instance.setLoadingText(loadingText)
      }
      binding.value ? appendEl(el) : removeEl(el)
    }
  }
}

export default loadingObj
