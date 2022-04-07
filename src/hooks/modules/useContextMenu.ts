import { ref, onMounted, nextTick } from 'vue'

interface Options {
  isPointCenter: boolean
}

export default function useContextMenu(
  event: PointerEvent,
  elRef: HTMLElement | null,
  options: Options = { isPointCenter: false }
) {
  const visible = ref<boolean>(false)
  const elWidth = ref<number>(0)
  const elHeight = ref<number>(0)

  const setVisible = (flag: boolean) => {
    visible.value = flag
  }

  const getStyle = () => {
    const obj: any = {}
    if (event.clientX > window.innerWidth - elHeight.value) {
      obj.right = options.isPointCenter
        ? window.innerWidth - event.clientX - elWidth.value / 2 + 'px'
        : window.innerWidth - event.clientX + 'px'
    } else {
      obj.left = options.isPointCenter ? event.clientX + elWidth.value / 2 + 'px' : event.clientX + 'px'
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
      if (elRef !== null && elRef.value) {
        elHeight.value = elRef.value?.offsetHeight
        elWidth.value = elRef.value?.offsetWidth
        getStyle()
      }
    })
  })

  return {
    visible,
    setVisible,
    getStyle
  }
}
