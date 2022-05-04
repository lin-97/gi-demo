<template>
  <div class="step-2">
    <a-form size="medium" auto-label-width>
      <a-form-item label="付款账户">
        {{ form.payAccount }}
      </a-form-item>
      <a-form-item label="收款账户">
        {{ form.recAccount }}
      </a-form-item>
      <a-form-item label="收款人姓名">
        {{ form.recName }}
      </a-form-item>
      <a-form-item label="转账金额">
        {{ form.amount }}
      </a-form-item>
    </a-form>

    <a-divider style="border-bottom-style: dashed" />

    <a-form ref="formRef" size="medium" :model="step2Form" auto-label-width>
      <a-form-item field="password" label="支付密码" :rules="rules.password">
        <a-input v-model="step2Form.password" placeholder="请输入支付密码" />
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
import { reactive, ref } from 'vue'
const emit = defineEmits(['next', 'prev'])

const props = defineProps({
  form: {
    type: Object,
    default: () => {}
  }
})

const step2Form = reactive({
  password: '123456'
})

const rules = {
  password: [{ required: true, message: '请输入密码' }]
}

let loading = ref(false)
const formRef = ref()

// 下一步
const next = async () => {
  try {
    loading.value = true
    await formRef.value.validate()
    setTimeout(() => {
      emit('next')
      loading.value = false
    }, 1000)
  } catch (error) {
    return error
  }
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
