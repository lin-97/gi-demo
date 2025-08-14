import type { ListItem as UserListItem } from '@/apis/person'
import { createSelectDialog } from '@/utils/createSelectDialog'
import UserList from './UserList/index.vue'

/** 选择用户列表的对话框 */
export const selectUserListDialog = createSelectDialog<UserListItem[]>({
  title: '选择用户',
  component: UserList
})

/** 选择角色列表的对话框 */
// export const selectRoleListDialog = createSelectDialog<RoleListItem[]>({
//   title: '选择角色',
//   component: RoleList
// })
