<template>
  <div class="flex-css">
    <a-space wrap>
      <section>
        <div>flex-start</div>
        <div>flex-start-center</div>
        <div>flex-row-start-center</div>
        <div class="item flex-start-center"><span></span></div>
      </section>
      <section>
        <div>flex-center</div>
        <div>flex-center-center</div>
        <div>flex-row-center-center</div>
        <div class="item flex-center-center"><span></span></div>
      </section>
      <section>
        <div>flex-end</div>
        <div>flex-end-center</div>
        <div>flex-row-end-center</div>
        <div class="item flex-end-center"><span></span></div>
      </section>
      <section>
        <div>flex-between</div>
        <div>flex-between-center</div>
        <div>flex-row-between-center</div>
        <div class="item flex-between-center"><span></span><span></span></div>
      </section>
      <section>
        <div>flex-evenly</div>
        <div>flex-evenly-center</div>
        <div>flex-row-evenly-center</div>
        <div class="item flex-evenly-center"><span></span><span></span></div>
      </section>
    </a-space>

    <a-space wrap style="margin-top: 20px">
      <section>
        <div>flex-col-start-center</div>
        <div class="item flex-col-start-center"><span></span></div>
      </section>
      <section>
        <div>flex-col-center-center</div>
        <div class="item flex-col-center-center"><span></span></div>
      </section>
      <section>
        <div>flex-col-end-center</div>
        <div class="item flex-col-end-center"><span></span></div>
      </section>
      <section>
        <div>flex-col-between-center</div>
        <div class="item flex-col-between-center"><span></span><span></span></div>
      </section>
      <section>
        <div>flex-col-evenly-center</div>
        <div class="item flex-col-evenly-center"><span></span><span></span></div>
      </section>
    </a-space>

    <a-divider></a-divider>

    <a-space direction="vertical" :size="20">
      <h3>CSS类名: {{ className }}</h3>
      <a-space fill>
        <span>flex-direction:</span>
        <a-radio-group v-model="aaa">
          <a-radio value="row">row</a-radio>
          <a-radio value="col">column</a-radio>
        </a-radio-group>
      </a-space>
      <a-space fill>
        <span>justify-content:</span>
        <a-radio-group v-model="bbb">
          <a-radio value="start">flex-start</a-radio>
          <a-radio value="center">center</a-radio>
          <a-radio value="end">flex-end</a-radio>
          <a-radio value="between">space-between</a-radio>
          <a-radio value="evenly"> space-evenly</a-radio>
        </a-radio-group>
      </a-space>
      <a-space fill>
        <span>align-items:</span>
        <a-radio-group v-model="ccc">
          <a-radio value="start">flex-start</a-radio>
          <a-radio value="center">center</a-radio>
          <a-radio value="end">flex-end</a-radio>
        </a-radio-group>
      </a-space>

      <div class="item" :class="className"><span></span><span></span></div>
    </a-space>
  </div>
</template>

<script setup lang="ts" name="Flex">
import { ref, computed } from 'vue'

const aaa = ref('row')
const bbb = ref('start')
const ccc = ref('center')

const className = computed(() => {
  return `flex-${aaa.value}-${bbb.value}-${ccc.value}`
})
</script>

<style lang="scss" scoped>
.flex-css {
  .item {
    width: 200px;
    height: 100px;
    border: 1px solid $color-border;
    background-color: var(--color-bg-3);
    > span {
      width: 30px;
      height: 30px;
      background: $color-theme;
    }
  }
}
</style>
