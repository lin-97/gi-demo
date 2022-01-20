<template>
  <a-modal :visible="visible" @cancel="handleCancel">
    <template #title> {{ title }} </template>
    <div>
      You can cusstomize modal body text by the current situation. This modal will be closed immediately once you press
      the OK button.
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    title: String
  },
  setup() {
    const visible = ref(true)
    function handleCancel() {}

    function setShow(v) {
      visible.value = v
    }
    return {
      visible,
      setShow,
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
