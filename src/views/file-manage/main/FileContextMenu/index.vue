<template>
  <a-modal :visible="visible" @cancel="handleCancel">
    <template #title> Title </template>
    <div>
      You can cusstomize modal body text by the current situation. This modal will be closed immediately once you press
      the OK button.
    </div>
  </a-modal>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    title: String,
    onClose: Function
  },
  setup() {
    const msg = '这是一个测试组件自己的msg'

    function handleCancel() {}
    return {
      msg,
      handleCancel
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
