<template>
  <div class="step-form">
    <section class="form-box">
      <a-steps>
        <a-step description="确保填写正确">填写转账信息</a-step>
        <a-step description="确认转账信息">确认转账信息</a-step>
        <a-step description="恭喜您，转账成功">完成转账</a-step>
      </a-steps>

      <Step1></Step1>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Step1 from './Step1.vue'
</script>

<style lang="scss" scoped>
.step-form {
  flex: 1;
  margin: $margin;
  padding: $padding;
  background: var(--color-bg-2);
  display: flex;
  justify-content: center;
  .form-box {
    width: 50%;
    min-width: 400px;
    margin-top: 30px;
    flex-shrink: 0;
  }
}
</style>
