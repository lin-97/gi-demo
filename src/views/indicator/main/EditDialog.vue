<template>
  <a-modal v-model:visible="visible" :title="isEdit ? '编辑' : '新增'" @ok="confirm" @cancel="cancel">
    <a-form ref="formRef" :model="form" :style="{ width: '450px' }">
      <a-form-item field="name" label="姓名" :rules="rules.name">
        <a-input v-model="form.name" placeholder="请输入姓名" style="width: 280px" />
        <template #extra>
          <div>仅支持中文姓名</div>
        </template>
      </a-form-item>
      <a-form-item field="address" label="地址">
        <a-input v-model="form.address" placeholder="请输入地址" style="width: 280px" />
      </a-form-item>
      <a-form-item field="status" label="状态" :rules="rules.status">
        <a-radio-group v-model="form.status">
          <a-radio :value="false">关闭</a-radio>
          <a-radio :value="true">开启</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <a-collapse :bordered="false" :default-active-key="['1']">
      <a-collapse-item :show-expand-icon="true" key="1">
        <template #header>
          <a-space>
            <span>权限配置</span>
            <a-tooltip position="right" :content-style="{ width: '200px' }">
              <icon-question-circle-fill style="color: rgb(var(--warning-6))" />
              <template #content>
                <span>自定义管理员、编辑者的权限， 点击</span>
                <a-link type="primary">了解更多权限</a-link>
              </template>
            </a-tooltip>
          </a-space>
        </template>
        <template #expand-icon="{ active }">
          <icon-right :class="{ gi_rotate_90deg: active }" />
        </template>
        <a-row justify="space-between" v-for="(item, index) in list" :key="index">
          <span>{{ item.name }}</span>
          <a-checkbox-group>
            <a-checkbox value="1">管理员</a-checkbox>
            <a-checkbox value="2">编辑者</a-checkbox>
          </a-checkbox-group>
        </a-row>
      </a-collapse-item>
    </a-collapse>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useVModel } from '@vueuse/core'

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

const emit = defineEmits(['update:modelValue'])
const visible = useVModel(props, 'modelValue', emit)

const list = [{ name: '新增' }, { name: '编辑' }, { name: '重命名' }, { name: '分享' }, { name: '删除' }]

type Form = {
  name: string
  address: string
  status: boolean
}

const form: Form = reactive({
  name: '',
  address: '',
  status: false
})

const rules = reactive({
  name: [
    { required: true, message: '请输入姓名' },
    { minLength: 1, maxLength: 4, message: '名字最长不超过4个字符' }
  ],
  status: [{ required: true }]
})

// 判断是新增还是编辑
const isEdit = computed<boolean>(() => {
  return !!props.formData.id
})

watch(visible, () => {
  const { name, address, status } = props.formData
  form.name = name
  form.address = address
  form.status = status || false
})

const cancel = () => {
  visible.value = false
}

const confirm = () => {
  visible.value = false
}
</script>

<style lang="scss" scoped>
:deep(.arco-collapse-item-content) {
  background: none;
}
</style>
