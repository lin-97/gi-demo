<template>
  <div class="step-2">
    <a-descriptions :column="1">
      <a-descriptions-item label="付款账户">{{ form.payAccount }}</a-descriptions-item>
      <a-descriptions-item label="收款账户">{{ form.recAccount }}</a-descriptions-item>
      <a-descriptions-item label="收款人姓名">{{ form.recName }}</a-descriptions-item>
      <a-descriptions-item label="转账金额">{{ form.amount }}</a-descriptions-item>
    </a-descriptions>

    <a-divider type="dashed" />

    <a-form ref="formRef" :model="form" :rules="rules" auto-label-width>
      <a-form-item label="支付密码" field="password">
        <a-input-password v-model="form.password" placeholder="请输入支付密码" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" :loading="loading" @click="next">提交</a-button>
          <a-button @click="prev">上一步</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import type { StepState } from './type'
import { STEP_FORM_KEY } from './util'

defineOptions({ name: 'Step2' })

const { form, current } = inject<StepState>(STEP_FORM_KEY)!
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const rules: FormInstance['rules'] = {
  password: [{ required: true, message: '请输入密码' }]
}

// 下一步|提交
const next = async () => {
  const valid = await formRef.value?.validate()
  if (valid) return false
  loading.value = true
  setTimeout(() => {
    current.value++
    loading.value = false
  }, 1000)
}

// 上一步
const prev = () => {
  current.value--
}
</script>

<style lang="scss" scoped>
.step-2 {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
</style>
