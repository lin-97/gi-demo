export interface CateItem {
  id: string
  name: string
  pid: string | null
  type: string | null
  disabled: boolean
  children: CateItem[]
}
