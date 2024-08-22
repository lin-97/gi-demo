import { ref } from 'vue'
import { type SystemRoleItem, getSystemRoleList } from '@/apis/system'

/** 角色模块 */
export function useRole() {
  const loading = ref(false)
  const roleList = ref<SystemRoleItem[]>([])
  const total = ref(0)
  const getRoleList = async () => {
    try {
      loading.value = true
      const res = await getSystemRoleList({ page: 1, size: 99 })
      roleList.value = res.data.records.filter((i) => i.status === 1)
      total.value = res.data.total
    } finally {
      loading.value = false
    }
  }
  return { roleList, getRoleList, loading, total }
}
