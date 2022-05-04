<template>
  <div class="step-form">
    <section class="form-box">
      <a-steps :current="current">
        <a-step description="确保填写正确">填写转账信息</a-step>
        <a-step description="确认转账信息">确认转账信息</a-step>
        <a-step description="恭喜您，转账成功">完成转账</a-step>
      </a-steps>

      <transition name="fade-slide">
        <Step1 v-if="current === 1" @next="next"></Step1>
      </transition>
      <transition name="fade-slide">
        <Step2 v-if="current === 2" :form="form" @next="next" @prev="prev"></Step2>
      </transition>
      <transition name="fade-slide">
        <Step3 v-if="current === 3" :form="form" @again="current = 1"></Step3>
      </transition>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

let current = ref(1)
let form = ref({})

const next = (formData) => {
  current.value++
  if (formData) {
    form.value = formData
  }
}

const prev = () => {
  current.value--
}
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
    min-width: 500px;
    margin-top: 30px;
    flex-shrink: 0;
    position: relative;
  }
}
</style>
