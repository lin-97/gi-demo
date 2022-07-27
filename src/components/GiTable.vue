<template>
  <div class="gi-table" :class="{ fullscreen: isFullscreen }" ref="giTableRef">
    <a-row justify="space-between">
      <a-space>
        <slot name="custom-extra"></slot>
      </a-space>
      <a-space :size="15">
        <a-tooltip content="斑马纹">
          <a-switch v-model="stripe" size="medium" />
        </a-tooltip>
        <a-tooltip content="刷新">
          <a-button size="mini" class="gi_hover_btn" @click="refresh">
            <template #icon><icon-refresh :size="18" /></template>
          </a-button>
        </a-tooltip>
        <!-- <a-tooltip content="列设置">
          <icon-settings :size="18" />
        </a-tooltip> -->
        <a-tooltip content="全屏">
          <a-button size="mini" class="gi_hover_btn" @click="toggle">
            <template #icon>
              <icon-fullscreen :size="18" v-if="!isFullscreen" />
              <icon-fullscreen-exit :size="18" v-else />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip content="显示边框">
          <a-button size="mini" class="gi_hover_btn" @click="isBordered = !isBordered">
            <template #icon>
              <icon-apps :size="18" />
            </template>
          </a-button>
        </a-tooltip>
        <a-radio-group type="button" size="mini" v-model="size">
          <a-radio value="mini">小</a-radio>
          <a-radio value="small">默认</a-radio>
          <a-radio value="medium">中</a-radio>
          <a-radio value="large">大</a-radio>
        </a-radio-group>
      </a-space>
    </a-row>
    <div class="table-box">
      <a-table v-bind="attrs" :stripe="stripe" :size="size" :bordered="{ cell: isBordered }" ref="tableRef">
        <template v-for="k in Object.keys(slots)" #[k] :key="k"> <slot :name="k"></slot> </template
      ></a-table>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GiTable',
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { useAttrs, useSlots, ref } from 'vue'
import { useFullscreen } from '@vueuse/core'
const emit = defineEmits(['refresh'])

const attrs = useAttrs()
const slots = useSlots()

const tableRef = ref(null)

const stripe = ref(false)
const size = ref('small')
const isBordered = ref(true)
// console.log('attrs', attrs)

const giTableRef = ref<HTMLElement | null>(null)
const { isFullscreen, toggle } = useFullscreen(giTableRef)

const refresh = () => {
  emit('refresh')
}

defineExpose({
  tableRef // <script setup>的组件里的属性默认是关闭的，需通过defineExpose暴露出去才能被调用
})
</script>

<style lang="scss" scoped>
.gi-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-bg-1);
  &.fullscreen {
    padding: $padding;
  }
  .table-box {
    flex: 1;
    margin-top: 12px;
    overflow: hidden;
  }
}
</style>
