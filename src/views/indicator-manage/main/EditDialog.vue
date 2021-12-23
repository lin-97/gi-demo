<template>
  <a-modal v-model:visible="visible" title="编辑" @ok="confirm" @cancel="cancel">
    <a-form ref="formRef" :model="form" :style="{ width: '450px' }">
      <a-form-item field="name" label="姓名">
        <a-input v-model="form.name" placeholder="请输入姓名" style="width: 280px" />
      </a-form-item>
      <a-form-item field="address" label="地址">
        <a-input v-model="form.address" placeholder="请输入地址" style="width: 280px" />
      </a-form-item>
      <a-form-item field="status" label="状态">
        <a-radio-group v-model="form.status">
          <a-radio :value="false">否</a-radio>
          <a-radio :value="true">是</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  // 绑定的值
  modelValue: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object,
    default: () => {}
  }
})

const form = reactive({
  name: '',
  address: '',
  status: false
})

let visible = computed<boolean>({
  get: () => {
    return props.modelValue
  },
  set: (v) => {
    emit('update:modelValue', v)
  }
})

watch(visible, () => {
  const { name, address, status } = props.formData
  form.name = name
  form.address = address
  form.status = status
})

const cancel = () => {
  visible.value = false
}

const confirm = () => {
  visible.value = false
}
</script>
