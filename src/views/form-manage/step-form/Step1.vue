<template>
  <div class="step-1">
    <a-form ref="formRef" :model="form" size="medium" auto-label-width>
      <a-form-item field="payAccount" label="付款账户" :rules="rules.payAccount">
        <a-select v-model="form.payAccount" placeholder="请选择付款账户">
          <a-option value="326***228@qq.com">326***228@qq.com</a-option>
          <a-option value="768***579@qq.com">768***579@qq.com</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="recAccount" label="收款账户" :rules="rules.recAccount">
        <a-input-group>
          <a-select v-model="form.payType" :style="{ width: '150px' }">
            <a-option :value="1">微信</a-option>
            <a-option :value="2">支付宝</a-option>
          </a-select>
          <a-input v-model="form.recAccount" placeholder="请输入收款账户" />
        </a-input-group>
      </a-form-item>
      <a-form-item field="recName" label="收款人姓名" :rules="rules.recName">
        <a-input v-model="form.recName" placeholder="请输入收款人姓名" />
      </a-form-item>
      <a-form-item field="amount" label="转账金额" :rules="rules.amount">
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

<script setup lang="ts" name="Step1">
import { reactive, ref } from 'vue'
const emit = defineEmits(['next'])

const form = reactive({
  payAccount: '',
  recAccount: '1997***6962@qq.com',
  payType: 1, // 1:微信 2: 支付宝
  recName: 'Lin',
  amount: 1980
})

const rules = {
  payAccount: [{ required: true, message: '请选择付款账户' }],
  recAccount: [{ required: true, message: '请输入收款账户' }],
  recName: [{ required: true, message: '请输入收款人姓名' }],
  amount: [{ required: true, message: '请输入转账金额' }]
}

const formRef = ref()

// 下一步
const next = async () => {
  // formRef.value.validate((res) => {
  //   console.log(res)
  // })
  console.log('formRef', formRef)
  try {
    const res = await formRef.value.validate()
    console.log('000', res)
    emit('next', form)
  } catch (error) {
    console.log(error)
    return error
  }
}
</script>

<style lang="scss" scoped>
.step-1 {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
