<template>
  <a-modal :title="title" v-model:visible="visible" :width="625" :mask-closable="false" unmount-on-close render-to-body>
    <a-form ref="FormRef" :model="form" :rules="rules" auto-label-width>
      <a-form-item label="菜单类型" field="type">
        <a-radio-group v-model="form.type" type="button">
          <a-radio :value="1">目录</a-radio>
          <a-radio :value="2">菜单</a-radio>
          <a-radio :value="3">按钮</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item v-if="form.type !== 3" label="菜单图标" field="icon">
        <GiIconSelector v-model="form.icon"></GiIconSelector>
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单标题" field="title">
            <a-input v-model="form.title" placeholder="请输入菜单标题" /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item label="菜单排序" field="sort">
            <a-input-number v-model="form.sort" placeholder="请输入菜单排序" :min="1" mode="button" /> </a-form-item
        ></a-col>
      </a-row>

      <a-form-item v-if="form.type !== 1" label="权限标识" field="permission">
        <a-input v-model="form.permission" placeholder="请输入权限标识" />
      </a-form-item>

      <a-form-item v-if="form.type !== 3" label="路由地址" field="path">
        <a-input v-model="form.path" placeholder="请输入路由地址" />
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item v-if="!form.isExternal && form.type === 2" label="组件名称" field="name">
            <a-input v-model="form.name" placeholder="请输入组件名称" /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item v-if="!form.isExternal && form.type === 2" label="组件路径" field="component">
            <a-input v-model="form.component" placeholder="请输入组件路径" /> </a-form-item
        ></a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item v-if="form.type !== 3" label="是否外链" field="isExternal">
            <a-radio-group v-model="form.isExternal" type="button">
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-if="form.type === 2" label="是否缓存" field="isCache">
            <a-radio-group v-model="form.isCache" type="button">
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item v-if="form.type !== 3" label="是否隐藏" field="isHidden">
        <a-radio-group v-model="form.isHidden" type="button">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="上级菜单" field="parentId">
        <a-tree-select
          v-model="form.parentId"
          placeholder="请选择上级菜单"
          allow-clear
          allow-search
          :fallback-option="false"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'

const FormRef = ref<FormInstance>()

const menuId = ref('')
const visible = ref(false)
const title = computed(() => (!!menuId.value ? '编辑菜单' : '新增菜单'))

const form = reactive({
  type: 1,
  icon: '',
  title: '',
  sort: 0,
  permission: '',
  path: '',
  name: '',
  isExternal: false,
  component: '',
  isCache: false,
  isHidden: false,
  parentId: ''
})

const rules = {
  title: [{ required: true, message: '请输入菜单标题' }],
  path: [{ required: true, message: '请输入路由地址' }],
  name: [{ required: true, message: '请输入组件名称' }],
  component: [{ required: true, message: '请输入组件路径' }],
  permission: [{ required: true, message: '请输入权限标识' }],
  sort: [{ required: true, message: '请输入菜单排序' }]
}

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
