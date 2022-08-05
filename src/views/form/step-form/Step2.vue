<template>
  <div class="step-2">
    <a-descriptions :column="1" size="medium">
      <a-descriptions-item label="付款账户">{{ form.payAccount }}</a-descriptions-item>
      <a-descriptions-item label="收款账户">{{ form.recAccount }}</a-descriptions-item>
      <a-descriptions-item label="收款人姓名">{{ form.recName }}</a-descriptions-item>
      <a-descriptions-item label="转账金额">{{ form.amount }}</a-descriptions-item>
    </a-descriptions>

    <a-divider style="border-bottom-style: dashed" />

    <a-form ref="formRef" size="medium" :model="step2Form" auto-label-width>
      <a-form-item field="password" label="支付密码" :rules="rules.password">
        <a-input-password v-model="step2Form.password" placeholder="请输入支付密码" />
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

<script setup lang="ts" name="Step2">
import { nextTick, reactive, ref, type PropType } from 'vue'
import type { Form } from '@arco-design/web-vue'
import type { StepForm } from './type'
const emit = defineEmits(['next', 'prev'])

defineProps({
  form: {
    type: Object as PropType<StepForm>,
    default: () => ({
      payAccount: '',
      recAccount: '',
      payType: 1,
      recName: '',
      amount: 0
    })
  }
})

const step2Form = reactive({
  password: '123456'
})

const rules = {
  password: [{ required: true, message: '请输入密码' }]
}

const loading = ref(false)
const formRef = ref<InstanceType<typeof Form>>()

// 下一步|提交
const next = () => {
  nextTick(async () => {
    try {
      loading.value = true
      const res = await formRef.value?.validate()
      if (!res) {
        setTimeout(() => {
          emit('next')
          loading.value = false
        }, 1000)
      } else {
        loading.value = false
      }
    } catch (error) {
      return error
    }
  })
}

// 上一步
const prev = () => {
  emit('prev')
}
</script>

<style lang="scss" scoped>
.step-2 {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
</style>
