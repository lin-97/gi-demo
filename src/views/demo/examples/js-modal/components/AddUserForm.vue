<template>
  <a-form :model="form" ref="FormRef">
    <a-form-item field="name" label="用户名" :rules="rules.name">
      <a-input v-model="form.name" placeholder="请输入用户名" :max-length="8" allow-clear />
    </a-form-item>
    <a-form-item field="phone" label="手机号" :rules="rules.phone">
      <a-input v-model="form.phone" placeholder="请输入手机号" :max-length="11" allow-clear />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from '@arco-design/web-vue'
import * as Regexp from '@/utils/regexp'

const form = reactive({
  name: '',
  phone: ''
})

const FormRef = ref<FormInstance | null>(null)

const rules = {
  name: [
    { required: true, message: '请输入姓名' },
    { match: Regexp.OnlyCh, message: '只能是中文姓名' },
    { minLength: 1, maxLength: 4, message: '名字最长不超过4个字符' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { match: Regexp.Phone, message: '手机号格式不正确' }
  ]
}

const saveUserApi = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true)
    }, 2000)
  )
}

const handleAddUser = async () => {
  const flag = await FormRef.value?.validate()
  if (flag) return false
  await saveUserApi()
  return true
}

defineExpose({ handleAddUser })
</script>

<style lang="scss" scoped></style>
