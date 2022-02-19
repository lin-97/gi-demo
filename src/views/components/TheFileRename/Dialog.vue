<template>
  <a-modal title="重命名" width="500px" v-model:visible="visible" @cancel="handleCancel">
    <a-row justify="center" align="center">
      <a-form :model="form" :style="{ width: '80%' }">
        <a-form-item field="name" label="文件名称：" required>
          <a-input v-model="form.name" placeholder="请输入" allow-clear />
        </a-form-item>
      </a-form>
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { ref, reactive, onMounted, defineComponent } from 'vue'

export default defineComponent({
  props: {
    fileInfo: Object,
    onClose: Function
  },
  setup(props) {
    let visible = ref<boolean>(false)

    type Form = { name: string }

    const form: Form = reactive({
      name: ''
    })
    form.name = props.fileInfo?.name
    onMounted(() => {
      visible.value = true
    })

    const handleCancel = () => {
      visible.value = false
      props.onClose()
    }

    return {
      form,
      visible,
      handleCancel
    }
  }
})
</script>

<style lang="scss" scoped>
.label {
  color: $text-color;
}
:deep(.arco-form-item-label-col > label) {
  white-space: nowrap;
}
</style>
