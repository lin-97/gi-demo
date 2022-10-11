type ALinkStatus = 'normal' | 'success' | 'warning' | 'danger'
type ATableSize = 'small' | 'mini' | 'medium' | 'large' | undefined
type AModalOnBeforeOk = ((done: (closed: boolean) => void) => boolean | void | Promise<boolean | void>) | undefined
type ADrawerOnBeforeOk = ((done: (closed: boolean) => void) => boolean | void | Promise<boolean | void>) | undefined
type ASelectChange =
  | ((value: string | number | Record<string, any> | (string | number | Record<string, any>)[]) => any)
  | undefined
type ATableSelect =
  | ((rowKeys: BaseType[], rowKey: BaseType, record: import('@arco-design/web-vue').TableData) => any)
  | undefined
type ARadioGroupChange = (value: string | number | boolean, ev: Event) => void
type AUploadBeforeRemove = ((fileItem: import('@arco-design/web-vue').FileItem) => Promise<boolean>) | undefined
