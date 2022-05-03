<template>
  <div class="step-1">
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="name" label="Username">
        <a-select v-model="form.payAccount" placeholder="请选择付款账户">
          <a-option value="326***228@qq.com">326***228@qq.com</a-option>
          <a-option value="768***579@qq.com">768***579@qq.com</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="post" label="Post">
        <a-input v-model="form.post" placeholder="please enter your post..." />
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead"> I have read the manual </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  payAccount: '',
  recAccount: '',
  payType: 1, // 1:微信 2: 支付宝
  recName: '',
  amount: 1980
})
</script>
