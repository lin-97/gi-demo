type ALinkStatus = 'normal' | 'success' | 'warning' | 'danger'
type AModalOnBeforeOk = (done: (closed: boolean) => void) => void | boolean
type ADrawerOnBeforeOk = (done: (closed: boolean) => void) => void | boolean
type ASelectChange = string | number | Record<string, any> | (string | number | Record<string, any>)[]
