import type * as T from '@/apis/system/role'
import { ref } from 'vue'
import { baseAPI } from '@/apis/system/role'

/** 角色模块 */
export function useRole() {
  const loading = ref(false)
  const roleList = ref<T.ListItem[]>([])
  const total = ref(0)
  const getRoleList = async () => {
    try {
      loading.value = true
      const res = await baseAPI.getList({ page: 1, size: 99 })
      roleList.value = res.data.records.filter((i) => i.status === 1)
      total.value = res.data.total
    } finally {
      loading.value = false
    }
  }
  return { roleList, getRoleList, loading, total }
}
