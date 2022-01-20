import { createApp } from 'vue'
import Loading from '@/components/GiLoading.vue'
import { isObject } from '@/utils/common'

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

const name = Loading.name // 组件名(实例key)

function addClass(el, className: string) {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}

function removeClass(el, className: string) {
  el.classList.remove(className)
}

function append(el) {
  if (!['relative', 'absolute', 'fixed'].includes(el.style.position)) {
    addClass(el, 'gi_relative')
  }
  el.appendChild(el[name].instance.$el)
}

function remove(el) {
  removeClass(el, 'gi_relative')
  el.removeChild(el[name].instance.$el)
}

const loadingObj = {
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created(el, binding) {},
  // 当指令第一次绑定到元素并且在挂载父组件之前调用
  beforeMount(el, binding) {},
  // 在绑定元素的父组件被挂载前调用
  mounted(el, binding) {
    // console.log('binding', binding)
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    if (binding.arg !== 'undefined') {
      if (isObject(binding.arg) && binding.arg.title) {
        instance.setLoadingText(binding.arg.title)
      }
      if (typeof binding.arg === 'string') {
        instance.setLoadingText(binding.arg)
      }
    }
    if (binding.arg && isObject(binding.arg) && binding.arg.title) {
      instance.setLoadingText(binding.arg.title)
    }
    if (!el[name]) {
      el[name] = {}
    }
    el[name].instance = instance
    if (binding.value) {
      append(el)
    }
  },
  // 在更新包含组件的 VNode 之前调用
  beforeUpdate(el, binding) {},
  // 在包含组件的 VNode 及其子组件的 VNode 更新后调用
  updated(el, binding) {
    if (!el[name]) {
      el[name] = {}
    }
    if (binding.arg !== 'undefined') {
      if (isObject(binding.arg) && binding.arg.title) {
        el[name].instance.setLoadingText(binding.arg.title)
      }
      if (typeof binding.arg === 'string') {
        el[name].instance.setLoadingText(binding.arg)
      }
    }
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  },
  // 在卸载绑定元素的父组件之前调用
  beforeUnmount(el, binding) {},
  // 当指令与元素解除绑定且父组件已卸载时，只调用一次
  unmounted(el, binding) {}
}

export default loadingObj
