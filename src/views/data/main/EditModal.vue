<template>
  <a-modal v-model:visible="visible" :title="title" :on-before-ok="confirm">
    <a-row justify="center">
      <a-form ref="formRef" :model="form" size="medium" auto-label-width :style="{ width: 'auto' }">
        <a-form-item field="name" label="姓名" :rules="rules.name">
          <a-input v-model="form.name" placeholder="请输入姓名" style="width: 300px" />
          <template #extra>
            <div>仅支持中文姓名</div>
          </template>
        </a-form-item>
        <a-form-item field="phone" label="手机号">
          <a-input v-model="form.phone" placeholder="请输入手机号" style="width: 300px" />
        </a-form-item>
        <a-form-item field="status" label="状态" :rules="rules.status">
          <a-radio-group v-model="form.status">
            <a-radio :value="false">关闭</a-radio>
            <a-radio :value="true">开启</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-row>
    <a-collapse :bordered="false" :default-active-key="['1']">
      <a-collapse-item :show-expand-icon="true" key="1">
        <template #header>
          <a-space>
            <span>权限配置</span>
            <a-tooltip position="right" :content-style="{ width: '200px' }">
              <icon-question-circle-fill style="color: rgb(var(--warning-6))" />
              <template #content>
                <span>自定义管理员、编辑者的权限， 点击</span>
                <a-link type="primary" :hoverable="false">了解更多权限</a-link>
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
import { computed, reactive, ref } from 'vue'
import { Phone, OnlyCh } from '@/utils/regexp'
import { Message, Modal, type FormInstance } from '@arco-design/web-vue'

type Form = { name: string; phone: string; status: boolean }
const form: Form = reactive({
  name: '',
  phone: '',
  status: false
})

const rules = {
  name: [
    { required: true, message: '请输入姓名' },
    { match: OnlyCh, message: '只能是中文姓名' },
    { minLength: 1, maxLength: 4, message: '名字最长不超过4个字符' }
  ],
  phone: [{ match: Phone, message: '手机号格式不正确' }],
  status: [{ required: true }]
}

const list = [{ name: '新增' }, { name: '编辑' }, { name: '重命名' }, { name: '分享' }, { name: '删除' }]

const visible = ref(false)
const detailId = ref('')
const isEditMode = computed(() => !!detailId.value) // 判断是新增还是编辑模式
const title = computed(() => (isEditMode.value ? '编辑' : '新增'))
const formRef = ref<FormInstance>()

const confirm = async () => {
  const flag = await formRef.value?.validate()
  if (flag) {
    return false
  } else {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    Message.success(!isEditMode.value ? '新增成功' : '编辑成功')
    return true
  }
}

const add = () => {
  detailId.value = ''
  visible.value = true
}

const edit = (id: string) => {
  detailId.value = id
  visible.value = true
}

defineExpose({ add, edit })
</script>

<style lang="scss" scoped>
:deep(.arco-collapse-item-content) {
  background: none;
}
</style>
