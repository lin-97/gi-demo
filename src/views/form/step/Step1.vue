<template>
  <div class="step-1">
    <a-form ref="formRef" :model="form" :rules="rules" auto-label-width>
      <a-form-item label="付款账户" field="payAccount">
        <a-select v-model="form.payAccount" placeholder="请选择付款账户">
          <a-option value="326***228@qq.com">326***228@qq.com</a-option>
          <a-option value="768***579@qq.com">768***579@qq.com</a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="收款账户" field="recAccount">
        <a-input-group class="w-full">
          <a-select v-model="form.payType" style="width: 150px">
            <a-option v-for="item in PAY_METHODS" :key="item.icon" :value="item.value">
              <template #icon>
                <GiSvgIcon :name="item.icon"></GiSvgIcon>
              </template>
              <span>{{ item.label }}</span>
            </a-option>
          </a-select>
          <a-input v-model="form.recAccount" placeholder="请输入收款账户" />
        </a-input-group>
      </a-form-item>
      <a-form-item label="收款人姓名" field="recName">
        <a-input v-model="form.recName" placeholder="请输入收款人姓名" />
      </a-form-item>
      <a-form-item label="转账金额" field="amount">
        <a-input v-model="form.amount" placeholder="请输入转账金额">
          <template #prefix>￥</template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import type { StepState } from './type'
import { STEP_FORM_KEY } from './util'

defineOptions({ name: 'Step1' })

const { form, current } = inject<StepState>(STEP_FORM_KEY)! // 使用!断言非null，或根据需要提供默认值

const PAY_METHODS = [
  { label: '微信', value: 1, icon: 'wechat' },
  { label: '支付宝', value: 2, icon: 'alipay' }
]

const rules: FormInstance['rules'] = {
  payAccount: [{ required: true, message: '请选择付款账户' }],
  recAccount: [{ required: true, message: '请输入收款账户' }],
  recName: [{ required: true, message: '请输入收款人姓名' }],
  amount: [{ required: true, message: '请输入转账金额' }]
}

const formRef = useTemplateRef('formRef')

// 下一步
const next = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) {
    current.value++
  }
}
</script>

<style lang="scss" scoped>
.step-1 {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>
