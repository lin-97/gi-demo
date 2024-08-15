export interface CateTreeItem {
  id: string
  name: string
  pid: string | null
  type: string | null
  disabled: boolean
  children: CateTreeItem[]
}
