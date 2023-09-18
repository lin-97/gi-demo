<template>
  <a-modal
    :title="title"
    v-model:visible="visible"
    :width="625"
    :mask-closable="false"
    @before-ok="save"
    @close="close"
  >
    <a-form ref="FormRef" :model="form" :rules="rules" auto-label-width>
      <a-form-item label="菜单类型" field="type">
        <a-radio-group v-model="form.type" type="button">
          <a-radio :value="1">目录</a-radio>
          <a-radio :value="2">菜单</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="上级菜单" field="parentId">
        <a-tree-select
          v-model="form.parentId"
          placeholder="请选择上级菜单"
          allow-clear
          allow-search
          :data="props.menus"
          :fieldNames="{
            key: 'id',
            title: 'title',
            children: 'children'
          }"
        />
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="自定义图标" field="svgIcon">
            <a-input v-model="form.svgIcon" placeholder="请输入菜单标题" />
            <a-tooltip content="优先显示">
              <icon-question-circle-fill :size="18" style="color: rgba(var(--warning-6)); margin-left: 8px" />
            </a-tooltip>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="菜单图标" field="icon">
            <GiIconSelector v-model="form.icon"></GiIconSelector>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="菜单标题" field="title">
        <a-input v-model="form.title" placeholder="请输入菜单标题" />
      </a-form-item>

      <a-form-item label="路由路径" field="path">
        <a-input v-model="form.path" placeholder="请输入路由地址" />
        <template #extra>
          <div>菜单名称由系统自动生成：{{ routeName }}</div>
        </template>
      </a-form-item>

      <a-form-item v-if="form.type === 1" label="重定向" field="redirect">
        <a-input v-model="form.redirect" placeholder="请输入重定向地址" />
      </a-form-item>

      <a-form-item label="是否外链" field="isExternalUrl">
        <a-radio-group v-model="isExternalUrl" type="button">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item v-if="form.type === 2" label="组件路径" field="component">
        <a-input v-if="isExternalUrl" v-model="form.component" placeholder="请输入组件路径" />
        <a-input v-else v-model="form.component" placeholder="请输入组件路径">
          <template #prepend>@/views/</template>
          <template #append>.vue</template>
        </a-input>
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="状态" field="status">
            <a-switch
              type="round"
              v-model="form.status"
              :checked-value="1"
              :unchecked-value="0"
              checked-text="启用"
              unchecked-text="禁用"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="是否隐藏" field="hidden">
            <a-switch
              type="round"
              v-model="form.hidden"
              :checked-value="true"
              :unchecked-value="false"
              checked-text="隐藏"
              unchecked-text="显示"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="是否缓存" field="keepAlive">
            <a-switch
              type="round"
              v-model="form.keepAlive"
              :checked-value="true"
              :unchecked-value="false"
              checked-text="是"
              unchecked-text="否"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="面包屑" field="breadcrumb">
            <a-switch
              type="round"
              v-model="form.breadcrumb"
              :checked-value="true"
              :unchecked-value="false"
              checked-text="显示"
              unchecked-text="隐藏"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Tab栏" field="affix" v-if="form.type === 2">
            <a-switch
              type="round"
              v-model="form.affix"
              :checked-value="true"
              :unchecked-value="false"
              checked-text="显示"
              unchecked-text="隐藏"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="菜单排序" field="sort">
        <a-input-number v-model="form.sort" placeholder="请输入菜单排序" :min="1" mode="button" style="width: 120px" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { getSystemMenuDetail, saveSystemMenu, type MenuItem } from '@/apis'
import { Message } from '@arco-design/web-vue'
import { isExternal } from '@/utils/validate'
import { transformPathToName } from '@/utils/common'

interface Props {
  menus: MenuItem[]
}

const props = withDefaults(defineProps<Props>(), {})

const FormRef = ref<FormInstance>()

const menuId = ref('')
const visible = ref(false)
const isEdit = computed(() => !!menuId.value)
const title = computed(() => (isEdit.value ? '编辑菜单' : '新增菜单'))

const isExternalUrl = ref(false)
const form = reactive({
  type: 1,
  icon: '',
  svgIcon: '',
  title: '',
  sort: 0,
  status: 1,
  path: '',
  name: '',
  component: '',
  keepAlive: false,
  hidden: true,
  parentId: '',
  redirect: '',
  breadcrumb: true,
  affix: true
})
const routeName = computed(() => transformPathToName(form.path))

const rules = {
  title: [{ required: true, message: '请输入菜单标题' }],
  path: [{ required: true, message: '请输入路由地址' }],
  name: [{ required: true, message: '请输入组件名称' }],
  component: [{ required: true, message: '请输入组件路径' }],
  sort: [{ required: true, message: '请输入菜单排序' }]
}

const add = () => {
  menuId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  menuId.value = id
  const res = await getSystemMenuDetail({ id })
  Object.assign(form, res.data)
  if (isExternal(form.path)) {
    isExternalUrl.value = true
  }
  visible.value = true
}

const close = () => {
  FormRef.value?.resetFields()
}

defineExpose({ add, edit })

const save = async () => {
  try {
    const res = await saveSystemMenu(form)
    if (res.data) {
      Message.success('模拟保存成功')
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}
</script>
