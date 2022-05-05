<template>
  <div class="step-form">
    <section class="form-box">
      <a-steps :current="current">
        <a-step description="确保填写正确">填写转账信息</a-step>
        <a-step description="确认转账信息">确认转账信息</a-step>
        <a-step description="恭喜您，转账成功">完成转账</a-step>
      </a-steps>

      <div :key="current" :class="animatedName">
        <Step1 v-if="current === 1" @next="next"></Step1>
        <Step2 v-else-if="current === 2" :form="form" @next="next" @prev="prev"></Step2>
        <Step3 v-else="current === 3" :form="form" @again="current = 1"></Step3>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

let current = ref(1)
let form = ref({})
let animatedName = ref('aaa')

const next = (formData) => {
  current.value++
  if (formData) {
    form.value = formData
  }
}

const prev = () => {
  current.value--
}

watch(
  () => current.value,
  (newVal, oldVal) => {
    if (newVal > oldVal || (newVal === 1 && oldVal === 3)) {
      animatedName.value = 'aaa'
    } else {
      animatedName.value = 'bbb'
    }
  }
)
</script>

<style lang="scss" scoped>
@keyframes to-right {
  0% {
    opacity: 0.5;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes to-left {
  0% {
    opacity: 0.5;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.aaa {
  animation-name: to-right;
  animation-duration: 0.5s;
}
.bbb {
  animation-name: to-left;
  animation-duration: 0.5s;
}
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
