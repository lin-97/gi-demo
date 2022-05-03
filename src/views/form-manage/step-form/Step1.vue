<template>
  <div class="step-1">
    <a-form :model="form" size="medium" auto-label-width>
      <a-form-item field="payAccount" label="付款账户">
        <a-select v-model="form.payAccount" placeholder="请选择付款账户">
          <a-option value="326***228@qq.com">326***228@qq.com</a-option>
          <a-option value="768***579@qq.com">768***579@qq.com</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="payType" label="收款账户">
        <a-input-group>
          <a-select v-model="form.payType" :style="{ width: '150px' }">
            <a-option :value="1">微信</a-option>
            <a-option :value="2">支付宝</a-option>
          </a-select>
          <a-input v-model="form.recAccount" placeholder="请输入收款账户" />
        </a-input-group>
      </a-form-item>
      <a-form-item field="recName" label="收款人姓名">
        <a-input v-model="form.recName" placeholder="请输入收款账户" />
      </a-form-item>
      <a-form-item field="amount" label="转账金额">
        <a-input-number v-model="form.amount" placeholder="请输入转账金额">
          <template #prefix>￥</template>
        </a-input-number>
      </a-form-item>
      <a-form-item>
        <a-button type="primary">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  payAccount: '',
  recAccount: '1997***6962@qq.com',
  payType: 1, // 1:微信 2: 支付宝
  recName: 'Lin',
  amount: 1980
})
</script>

<style lang="scss" scoped>
.step-1 {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
