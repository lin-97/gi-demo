<template>
  <div class="my-loading">
    <section class="box" v-loading="loading" :gi-loading-type="loadingType" :gi-loading-text="loadingText">
      <a-typography :style="{ marginTop: '20px' }">
        <a-typography-title> Design system </a-typography-title>
        <a-typography-paragraph>
          A design is a plan or specification for the construction of an object or system or for the implementation of
          an activity or process, or the result of that plan or specification in the form of a prototype, product or
          process. The verb to design expresses the process of developing a design.
        </a-typography-paragraph>
        <a-typography-paragraph>
          In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some
          engineering, coding, and graphic design) may also be considered
          <a-typography-text bold>to be a design activity.</a-typography-text>
        </a-typography-paragraph>
        <a-typography-paragraph>
          A design is a plan or specification for the construction of an object or system or for the implementation of
          an activity or process, or the result of that plan or specification in the form of a prototype, product or
          process. The verb to design expresses the process of developing a design. In some cases, the direct
          construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and
          graphic design) may also be considered to be a design activity.
        </a-typography-paragraph>
      </a-typography>
    </section>

    <a-space direction="vertical" fill>
      <a-radio-group type="button" v-model="loadingType">
        <a-radio value="normal">normal</a-radio>
        <a-radio value="dot">dot</a-radio>
      </a-radio-group>

      <a-radio-group type="button" v-model="loadingText">
        <a-radio value="Loading...">Loading...</a-radio>
        <a-radio value="加载中...">加载中...</a-radio>
        <a-radio value=" ">空</a-radio>
      </a-radio-group>

      <a-button type="primary" @click="loading = !loading">点击</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loadingType = ref('normal')
const loadingText = ref('Loading...')

const loading = ref(false)
</script>

<style lang="scss" scoped>
.box {
  width: 500px;
  height: 350px;
  border: 1px solid $color-border;
  margin-bottom: 10px;
  padding-left: 15px;
  overflow-y: auto;
}
</style>
