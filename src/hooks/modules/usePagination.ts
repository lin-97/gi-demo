import { ref, computed } from 'vue'

type Callback = () => void

type Options = {
  defaultPageSize: number
}

export default function usePagination(callback: Callback, options: Options = { defaultPageSize: 10 }) {
  const current = ref(1)
  const pageSize = ref(options.defaultPageSize)
  const total = ref(0)

  function changeCurrent(size: number) {
    current.value = size
    callback && callback()
  }

  function changePageSize(size: number) {
    current.value = 1
    pageSize.value = size
    callback && callback()
  }

  function setTotal(value: number) {
    total.value = value
  }

  const pagination = computed(() => {
    return {
      showPageSize: true,
      current: current.value,
      pageSize: pageSize.value,
      total: total.value,
      onChange: changeCurrent,
      onPageSizeChange: changePageSize
    }
  })

  return {
    current,
    pageSize,
    total,
    changeCurrent,
    changePageSize,
    setTotal,
    pagination
  }
}
