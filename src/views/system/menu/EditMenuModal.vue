<template>
  <a-modal v-model:visible="visible" :title="title">
    <a-form ref="formRef" :model="form" size="medium" auto-label-width>
      <a-form-item label="上级菜单" parentId="name">
        <a-tree-select
          v-model="form.parentId"
          placeholder="请选择"
          :field-names="{
            key: 'id',
            title: 'name',
            children: 'children'
          }"
        ></a-tree-select>
      </a-form-item>
      <a-form-item
        label="菜单名称"
        field="name"
        :rules="[
          { required: true, message: '请输入菜单名称' },
          { min: 3, max: 10, message: '长度在 3 - 10个字符' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input placeholder="请输入菜单名称" v-model="form.name"> </a-input>
      </a-form-item>
      <a-form-item
        label="菜单地址"
        field="path"
        :rules="[
          { required: true, message: '请输入菜单地址' },
          { min: 3, max: 10, message: '长度在 3 - 30个字符' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input placeholder="请输入菜单地址" v-model="form.path"> </a-input>
      </a-form-item>
      <a-form-item label="是否缓存" name="keepAlive">
        <a-switch size="medium" v-model="form.keepAlive"> </a-switch>
      </a-form-item>
      <a-form-item label="是否隐藏" name="hidden">
        <a-switch size="medium" v-model="form.hidden"> </a-switch>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

const menuId = ref('')
const visible = ref(false)
const title = computed(() => (!!menuId.value ? '编辑菜单' : '新增菜单'))

const form = reactive({
  parentId: '',
  name: '',
  path: '',
  icon: '',
  keepAlive: false,
  hidden: false
})

const add = () => {
  menuId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  menuId.value = id
  visible.value = true
}

defineExpose({ add, edit })
</script>
