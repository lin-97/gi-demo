import { ref, onMounted, nextTick } from 'vue'

interface Options {
  alignPoint: boolean // 对齐鼠标
}

export default function useContextMenu(
  event: PointerEvent,
  elRef: HTMLElement | null,
  options: Options = { alignPoint: false }
) {
  const visible = ref(false)
  const elWidth = ref(0)
  const elHeight = ref(0)

  const setVisible = (flag: boolean) => {
    visible.value = flag
  }

  const getStyle = () => {
    const obj: any = {}
    if (event.clientX > window.innerWidth - elHeight.value) {
      obj.right = options.alignPoint
        ? window.innerWidth - event.clientX - elWidth.value / 2 + 'px'
        : window.innerWidth - event.clientX + 'px'
    } else {
      obj.left = options.alignPoint ? event.clientX + elWidth.value / 2 + 'px' : event.clientX + 'px'
    }
    if (event.clientY > window.innerHeight - elHeight.value) {
      obj.bottom = window.innerHeight - event.clientY + 'px'
      obj['transform-origin'] = 'center bottom'
    } else {
      obj.top = event.clientY + 2 + 'px'
      obj['transform-origin'] = 'center top'
    }
    obj['z-index'] = 999
    return obj
  }

  onMounted(() => {
    visible.value = true
    nextTick(() => {
      if (!elRef) return
      elHeight.value = elRef?.offsetHeight
      elWidth.value = elRef?.offsetWidth
      getStyle()
    })
  })

  return {
    visible,
    setVisible,
    getStyle
  }
}
