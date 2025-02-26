<template>
  <a-modal v-model:visible="visible" :title="title" width="90%" :modal-style="{ maxWidth: '625px' }"
    :body-style="{ maxHeight: '70vh' }" :mask-closable="false" @before-ok="save" @close="close">
    <a-form ref="formRef" :model="form" :rules="formRules" auto-label-width>
      <a-form-item label="菜单类型" field="type">
        <a-radio-group v-model="form.type" type="button" :disabled="isEdit" @change="onChangeType">
          <a-radio :value="1">目录</a-radio>
          <a-radio :value="2">菜单</a-radio>
          <a-radio :value="3">按钮</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="上级菜单" field="parentId">
        <a-tree-select v-model="form.parentId" placeholder="请选择上级菜单" allow-clear allow-search :disabled="isEdit"
          :data="(menuSelectTree as any)" :field-names="{
            key: 'id',
            title: 'title',
            children: 'children',
          }" />
      </a-form-item>

      <a-row v-if="[1, 2].includes(form.type)" :gutter="16">
        <a-col v-bind="col2Props">
          <a-form-item label="自定义图标" field="svgIcon">
            <GiIconSelector v-model="form.svgIcon" type="custom"></GiIconSelector>
            <a-tooltip content="优先显示">
              <icon-question-circle-fill :size="18" style="color: rgba(var(--warning-6)); margin-left: 8px" />
            </a-tooltip>
          </a-form-item>
        </a-col>
        <a-col v-bind="col2Props">
          <a-form-item label="菜单图标" field="icon">
            <GiIconSelector v-model="form.icon"></GiIconSelector>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="菜单标题" field="title">
        <a-input v-model.trim="form.title" placeholder="请输入菜单标题" allow-clear :max-length="10" />
      </a-form-item>

      <a-form-item v-if="[1, 2].includes(form.type)" label="路由路径" field="path">
        <a-input v-model.trim="form.path" placeholder="请输入路由路径" allow-clear :max-length="50" />
        <template #extra>
          <div>
            <span>路由名称由系统自动生成：</span>
            <a-tag v-if="routeName">{{ routeName }}</a-tag>
          </div>
        </template>
      </a-form-item>

      <a-form-item v-if="[1, 2].includes(form.type) && !isExternalUrl" label="重定向" field="redirect">
        <a-input v-model.trim="form.redirect" placeholder="请输入重定向地址" allow-clear :max-length="50" />
      </a-form-item>

      <a-form-item v-if="[1, 2].includes(form.type)" label="是否外链" field="isExternalUrl">
        <a-radio-group v-model="isExternalUrl" type="button">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item v-if="form.type === 2" label="组件路径" field="component">
        <a-input v-if="isExternalUrl" v-model.trim="form.component" placeholder="请输入组件路径" allow-clear
          :max-length="50" />
        <a-input v-else v-model.trim="form.component" placeholder="请输入组件路径" allow-clear :max-length="50">
          <template #prepend>@/views/</template>
          <template #append>.vue</template>
        </a-input>
      </a-form-item>

      <a-row v-if="[1, 2].includes(form.type)" :gutter="16">
        <a-col v-bind="col3Props">
          <a-form-item label="状态" field="status">
            <a-switch v-model="form.status" type="round" :checked-value="1" :unchecked-value="0" checked-text="启用"
              unchecked-text="禁用" />
          </a-form-item>
        </a-col>
        <a-col v-bind="col3Props">
          <a-form-item label="是否隐藏" field="hidden">
            <a-switch v-model="form.hidden" type="round" :checked-value="true" :unchecked-value="false" checked-text="是"
              unchecked-text="否" />
          </a-form-item>
        </a-col>
        <a-col v-bind="col3Props">
          <a-form-item label="是否缓存" field="keepAlive">
            <a-switch v-model="form.keepAlive" type="round" :checked-value="true" :unchecked-value="false"
              checked-text="是" unchecked-text="否" />
          </a-form-item>
        </a-col>
        <a-col v-bind="col3Props">
          <a-form-item label="面包屑" field="breadcrumb">
            <a-switch v-model="form.breadcrumb" type="round" :checked-value="true" :unchecked-value="false"
              checked-text="显示" unchecked-text="隐藏" />
          </a-form-item>
        </a-col>
        <a-col v-bind="col3Props">
          <a-form-item v-if="form.type === 1" label="总是显示" field="alwaysShow">
            <a-switch v-model="form.alwaysShow" type="round" :checked-value="true" :unchecked-value="false"
              checked-text="显示" unchecked-text="隐藏" />
          </a-form-item>
          <a-form-item v-if="form.type === 2" label="页签显示" field="showInTabs">
            <a-switch v-model="form.showInTabs" type="round" :checked-value="true" :unchecked-value="false"
              checked-text="显示" unchecked-text="隐藏" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item v-if="form.type === 3" label="权限标识" field="permission">
        <a-input v-model.trim="form.permission" placeholder="sys:btn:add" allow-clear :max-length="20" />
      </a-form-item>

      <a-form-item label="菜单排序" field="sort">
        <a-input-number v-model="form.sort" placeholder="请输入菜单排序" :min="1" mode="button" style="width: 120px" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { type ColProps, type FormInstance, Message } from '@arco-design/web-vue'
import { mapTree } from 'xe-utils'
import type { MenuForm } from './type'
import { type MenuItem, getMenuDetail } from '@/apis/system'
import { isExternal } from '@/utils/validate'
import { filterTree, transformPathToName } from '@/utils'
import { useResetReactive } from '@/hooks'

interface Props {
  menus: MenuItem[]
}

const props = withDefaults(defineProps<Props>(), {
  menus: () => []
})

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const menuSelectTree = computed(() => {
  const menus = JSON.parse(JSON.stringify(props.menus)) as MenuItem[]
  const data = filterTree(menus, (i) => [1, 2].includes(i.type))
  const arr = mapTree(data, (i) => ({
    id: i.id,
    title: i.title,
    children: i.children
  }))
  return arr
})

const col2Props: ColProps = { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 }
const col3Props: ColProps = { xs: 12, sm: 12, md: 8, lg: 8, xl: 8, xxl: 8 }

const formRef = useTemplateRef('formRef')
const menuId = ref('')
const visible = ref(false)
const isEdit = computed(() => !!menuId.value)
const title = computed(() => (isEdit.value ? '编辑菜单' : '新增菜单'))

const isExternalUrl = ref(false)
const [form, resetForm] = useResetReactive<MenuForm>({
  type: 1, // 类型 1目录 2菜单 3按钮
  icon: '', // arco 图标名称
  svgIcon: '', // 自定义图标名称
  title: '', // 菜单或目录的名称
  sort: 0, // 排序
  status: 1, // 状态 0禁用 1启用
  path: '', // 路由路径
  component: '', // 组件路径
  keepAlive: false, // 是否缓存
  hidden: true, // 设置 true 的时候该路由不会在侧边栏出现
  parentId: '',
  redirect: '', // 重定向
  breadcrumb: true, // 显示在面包屑
  showInTabs: true, // 显示在页签
  alwaysShow: false, // 总是显示
  permission: ''
})

const routeName = computed(() => transformPathToName(form.path))

const rules: FormInstance['rules'] = {
  parentId: [{ required: true, message: '请选择上级菜单' }],
  title: [{ required: true, message: '请输入菜单标题' }],
  path: [{ required: true, message: '请输入路由路径' }],
  component: [{ required: true, message: '请输入组件路径' }],
  permission: [{ required: true, message: '请输入权限标识' }]
}
const formRules = computed(() => {
  if ([1, 2].includes(form.type)) {
    const { title, path } = rules
    return { title, path } as FormInstance['rules']
  }
  if (form.type === 3) {
    const { parentId, title, permission } = rules
    return { parentId, title, permission } as FormInstance['rules']
  }
  return {}
})

// 切换类型清除校验
const onChangeType = () => {
  formRef.value?.clearValidate()
}

const add = () => {
  menuId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  visible.value = true
  menuId.value = id
  const res = await getMenuDetail({ id })
  Object.assign(form, res.data)
  if (isExternal(form.path)) {
    isExternalUrl.value = true
  }
}

const close = () => {
  formRef.value?.resetFields()
  resetForm()
}

const save = async () => {
  try {
    const valid = await formRef.value?.validate()
    if (valid) return false
    const res = await new Promise((resolve) => setTimeout(() => resolve(true), 300))
    if (res) {
      Message.success('模拟保存成功')
      emit('save-success')
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

defineExpose({ add, edit })
</script>
