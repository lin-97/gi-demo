<template>
  <a-modal v-model:visible="visible" @cancel="onCancel">
    <template #title> {{ title }} </template>
    <div>{{ content }}</div>
  </a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    title: String,
    content: String,
    onCancel: Function
  },
  setup() {
    const visible = ref(true)
    const close = () => {
      visible.value = false
    }
    return {
      visible,
      close
    }
  }
})
</script>

<style lang="scss" scoped>
.file-context-menu {
  width: 200px;
  height: 200px;
  background: red;
  color: #fff;
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
