import type { Ref } from 'vue'

export interface StepForm {
  payAccount: string
  recAccount: string
  payType: 1 | 2 // 1:微信 2: 支付宝
  recName: string
  amount: string
  password: string
}

// 定义注入的数据类型
export interface StepState {
  form: StepForm
  current: Ref<number>
  resetForm: () => void
}
