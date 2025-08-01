export interface SelectDialogOptions<T> {
  title?: string
  queryParams?: Record<string, any>
  onOk?: (data: T[]) => void
  onBeforeOk?: (data: T[]) => Promise<boolean>
}
