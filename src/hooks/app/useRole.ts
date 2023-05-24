import { ref } from 'vue'
import { getSystemRoleList } from '@/apis'
import type { RoleItem } from '@/apis'

/** 角色模块 */
export function useRole() {
  const loading = ref(false)
  const roleList = ref<RoleItem[]>([])
  const getRoleList = async () => {
    try {
      loading.value = true
      const res = await getSystemRoleList()
      roleList.value = res.data.list
    } catch (error) {
    } finally {
      loading.value = false
    }
  }
  return { roleList, getRoleList, loading }
}
