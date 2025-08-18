import type { ListItem as UserListItem } from '@/apis/person'
import { createSelectDialog } from '@/utils/createSelectDialog'
import TreeUserList from './TreeUserList/index.vue'
import UserList from './UserList/index.vue'

/** 选择用户列表的对话框 */
export const selectUserListDialog = createSelectDialog<UserListItem[]>({
  title: '选择用户',
  component: UserList
})

/** 左树右表的对话框 */
export const selectTreeUserListDialog = createSelectDialog<UserListItem[]>({
  title: '左树右表对话框示例',
  component: TreeUserList
})
