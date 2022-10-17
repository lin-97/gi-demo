<div align="center">
	<img style="width: 80px;height: 80px" src="https://s1.ax1x.com/2022/05/12/OBUfSS.gif"/>
	<h1>Gi Admin Pro</h1>
</div>

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## 简介

Gi Admin Pro 是一个基于 Vue3、Vite、TypeScript、Arco Design UI、Pinia、VueUse 的免费中后台模版，它使用了最新的前端技术栈，内置丰富的主题配置，有着极高的代码规范，基于 mock 实现的动态数据展示，开箱即用的模板，也可用于学习参考。

> **Gi 前缀含义：**
>
>  G：代表 全局
>
>  i：代表 我的
>
> Gi 用来定义全局组件前缀，如 GiNavBar、GiTitle、GiLoading

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发, 使用高效率的 npm 包管理器
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：丰富可配置的主题、暗黑模式
- **代码规范**：丰富的规范插件及极高的代码规范

## 预览

- [Gi Admin Pro](http://lin0716.gitee.io/gi-demo)

## 代码仓库

- [gitee](https://gitee.com/lin0716/gi-demo)

## 项目示例图

<img src="https://s1.ax1x.com/2022/05/13/OrhNM4.png" />

<img src="https://s1.ax1x.com/2022/05/13/OrhRLd.png" />

<img src="https://s1.ax1x.com/2022/05/13/Orh4ot.png" />

<img src="https://s1.ax1x.com/2022/05/13/OrhLLj.png" />

<img src="https://s1.ax1x.com/2022/05/13/Or4SYV.png" />

<img src="https://s1.ax1x.com/2022/05/13/Or4CSU.png" />

<img src="https://s1.ax1x.com/2022/05/13/Or4EwR.png" />

<img src="https://s1.ax1x.com/2022/05/13/Or40XQ.png" />

<img src="https://s1.ax1x.com/2022/05/13/Or5ZuQ.png" />

<img src="https://s1.ax1x.com/2022/05/13/OyFN7j.png" />

<img src="https://s1.ax1x.com/2022/05/13/OyF49x.png" />

## 安装使用

- 安装依赖

```bash
npm install
```

- 运行

```bash
npm run dev
```

- 打包

```bash
npm run build
```

## vs code 插件安装

```bash
1. Prettier - Code formatter
2. Vue Language Features (Volar)
3. Vue 3 Snippets
4. TypeScript Vue Plugin (Volar)
```

## 注意

```bash
由于升级了vite3，根据官方规定，node版本必须是14.18.0以上
```

## 开源作者

**Lin**

## 交流

QQ：326010228

邮箱：326010228@qq.com

## 项目规范

#### 接口 api 的命名

命名规范： 操作 + 后端模块名 + 功能名

前缀为动词，动词 eg：`add / update / delete / get / save`

```
/quota/getList   =>  getQuotaList
/quota/getQuotaList  =>  getQuotaList   // 如果功能名包含了模块名，可省略

/user/save  =>  saveUser
/user/list  =>  getUserList  // 如果没有操作名，可以自行根据场景补充
```

以上命名规范可以确保 api 命名不会冲突，加上模块名能快速定位以及更加方便维护

引入接口：

```js
import { getUserList, saveUser } from '@/apis'
```

#### 页面变量命名

```js
// 变量
const loading = ref(false) // 加载
const tableData = ref([]) // 表格数据
const showAddDialog = ref(false)
const showAddModal = ref(false)
const showEditDrawer = ref(false)
const form = reactive({
    name: '',
    phone: '',
    remark: ''
})

const companyList = ref([]) // 列表数据最好后面加个 List 或者 Data 或者字母后面加s
const checkedList = ref([])
const selectedList = ref([])
const addressList = ref([])
const userList = []
const ids = []
const tableData = []

// 方法
编辑 onEdit     handleEdit     edit
新增 onAdd      handleAdd      add
删除 onDelete   handleDelete   delete
批量删除 onMulDelete   handleMulDelete  mulDelete
重命名 onRename   handleRename
搜索 search
获取表格列表 getTableData  // 一般一个页面也就一个表格，gi-demo习惯用getTableData, 结合分页hooks的时候可以直接复制复用
返回 back
提交 submit
确认 confirm  ok  submit
取消 cancel
关闭 close
保存 save
```

页面模板类名使用中划线

```vue
<template>
  <div class="detail">
    <h3 class="title"></h3>
    <section class="table-box">
      <table></table>
    </section>
  </div>
</template>
```

#### 全局组件--命名规范

组件命名：**单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)**

可参考 Vue2 官网-风格指南: https://v2.cn.vuejs.org/v2/style-guide/

```
GiTitle.vue
GiThemeBtn.vue
GiSvgIcon.vue
```

#### 局部组件--命名规范

组件命名：**单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)**

可参考 Vue2 官网-风格指南: https://v2.cn.vuejs.org/v2/style-guide/

```
Pane1.vue
Pane2.vue
PaneQuota1.vue
PaneQuota2.vue
Step1.vue
Step2.vue
AddModal.vue
EditDrawer.vue
```

#### 文件夹命名--命名规范 (采用中划线-)

@/apis/ 目录下的文件最好以后端模块名为准，大小写也与模块名一致

1、文件名建议只使用小写字母，不使用大写字母

2、名称较长时采用半角连接符(-)分隔

```
home/index.vue   quota-first/index.vue      quota-detail/index.vue
```

#### 全局类名-命名规范 (采用下划线\_，好复制)

```scss
// 文件位置: @/styles/global.scss
.gi_line_1   .gi_line_2   .gi_margin   .gi_box   .gi_text_tag
```

#### 全局 scss 变量-命名规范

```scss
$title-color: xxx; // 已弃用，写起来繁琐，易忘
$text-color: xxx; // 已弃用
$text-sub-color: xxx; // 已弃用
$text-sup-color: xxx; // 已弃用

// 借鉴了Arco Design命名规则
$color-text-1: var(--color-text-1); // 标题、重点文本字体颜色
$color-text-2: var(--color-text-2); // 文本-全局默认字体颜色
$color-text-3: var(--color-text-3); // 二级文本颜色
$color-text-4: var(--color-text-4); // 辅助文本颜色
```

#### 业务状态

gi-demo 的业务状态放在@/libs/status/xxx.ts xxx 为接口模块名

```js
type SubmitStatusItem = { name: string, value: number, color: string }
/** @desc 指标提交状态 */
export const SubmitStatusList: SubmitStatusItem[] = [
  { name: '待提交', value: 0, color: 'orange' },
  { name: '已提交', value: 1, color: 'green' }
]

type StatusItem = { name: string, value: number, color: string }
/** @desc 指标启用状态 */
export const StatusList: StatusItem[] = [
  { name: '禁用', value: 0, color: '#f53f3f' },
  { name: '启用', value: 1, color: '#00b42a' }
]
```

使用的时候:

引入模块

```js
import { StatusList } from '@/libs/status/xxx' // 要具体到模块名，因为不同模块可能会有StatusList一样的名称
```

```vue
<a-table-column title="状态" :width="100" align="center">
	<template #cell="{ record }">
		<template v-for="item in StatusList" :key="item.value">
			<a-tag v-if="item.value === record.status" :color="item.color">{{ item.name }}</a-tag>
		</template>
	</template>
</a-table-column>
```

#### Arco 组件事件 ts 类型存放位置

建议存放在 @/types/arco.d.ts 直接全局使用

```ts
type ALinkStatus = 'normal' | 'success' | 'warning' | 'danger'
type ATableSize = 'small' | 'mini' | 'medium' | 'large' | undefined
type AModalOnBeforeOk = ((done: (closed: boolean) => void) => boolean | void | Promise<boolean | void>) | undefined
type ADrawerOnBeforeOk = ((done: (closed: boolean) => void) => boolean | void | Promise<boolean | void>) | undefined
type ASelectChange =
  | ((value: string | number | Record<string, any> | (string | number | Record<string, any>)[]) => any)
  | undefined
type ATableSelect =
  | ((rowKeys: BaseType[], rowKey: BaseType, record: import('@arco-design/web-vue').TableData) => any)
  | undefined
type ARadioGroupChange = (value: string | number | boolean, ev: Event) => void
type AUploadBeforeRemove = ((fileItem: import('@arco-design/web-vue').FileItem) => Promise<boolean>) | undefined
```

#### 弹出组件 Modal、抽屉组件 Drawer 的一般封装

```vue
<template>
  <a-modal v-model:visible="visible" :title="title" @ok="confirm">
    <!-- 内容 -->
  </a-modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const visible = ref(false)
const detailId = ref('')
const isEditMode = computed(() => !!detailId.value) // 判断是新增还是编辑模式
const title = computed(() => (isEditMode.value ? '编辑' : '新增'))

const add = () => {
  detailId.value = ''
  visible.value = true
}

const edit = (id: string) => {
  detailId.value = id
  // getDetail() 回显操作
  visible.value = true
}

defineExpose({ add, edit })

const confirm = () => {
  console.log('点击了确认按钮')
}
</script>
```

使用

```vue
<template>
  <EditModal ref="EditModalRef"></EditModal>
</template>

<script setup lang="ts">
import EditModal from './EditModal.vue'

const EditModalRef = ref<InstanceType<typeof EditModal>>()

// 新增
const onAdd = () => {
  EditModalRef.value?.add()
}

// 编辑
const onEdit = (item: PersonItem) => {
  EditModalRef.value?.edit(item.id)
}
</script>
```

#### 分页 Hooks 的使用

文件位置：@/hooks/modules/usePagination.ts

旧版：

```ts
import { ref } from 'vue'

type Callback = () => void

type Options = {
  defaultPageSize: number
}

export default function usePagination(callback: Callback, options: Options = { defaultPageSize: 10 }) {
  const current = ref(1)
  const pageSize = ref(options.defaultPageSize)
  const total = ref(0)

  function changeCurrent(size: number) {
    current.value = size
    callback && callback()
  }

  function changePageSize(size: number) {
    current.value = 1
    pageSize.value = size
    callback && callback()
  }

  function setTotal(value: number) {
    total.value = value
  }

  const pagination = computed(() => {
    return {
      showPageSize: true,
      // ...其他配置
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
      onChange: changeCurrent,
      onPageSizeChange: changePageSize
    }
  })

  return {
    current,
    pageSize,
    total,
    pagination,
    changeCurrent,
    changePageSize,
    setTotal
  }
}
```

上面这种方案已经废弃，最新方案如下

改良版（兼容旧版）：

```js
import { reactive, toRefs } from 'vue'
import type { PaginationProps } from '@arco-design/web-vue'

type Callback = () => void

type Options = {
  defaultPageSize: number
}

interface APaginationProps extends PaginationProps {
  current: number
  pageSize: number
  total: number
  onChange: (size: number) => void
  onPageSizeChange: (size: number) => void
}

export default function usePagination(callback: Callback, options: Options = { defaultPageSize: 10 }) {
  const pagination: APaginationProps = reactive({
    showPageSize: true,
    current: 1,
    pageSize: options.defaultPageSize,
    total: 0,
    onChange: (size: number) => {
      pagination.current = size
      callback && callback()
    },
    onPageSizeChange: (size: number) => {
      pagination.current = 1
      pagination.pageSize = size
      callback && callback()
    }
  })

  const changeCurrent = pagination.onChange
  const changePageSize = pagination.onPageSizeChange
  function setTotal(value: number) {
    pagination.total = value
  }

  const { current, pageSize, total } = toRefs(pagination)

  return {
    current,
    pageSize,
    total,
    pagination,
    changeCurrent,
    changePageSize,
    setTotal
  }
}
```

使用方式 1

```vue
<template>
  <!-- ... -->
  <div class="table-box">
    <a-table
      row-key="id"
      :columns="columns"
      :data="tableData"
      :pagination="{ showPageSize: true, total: total, current: current, pageSize: pageSize }"
      @page-change="changeCurrent"
      @page-size-change="changePageSize"
    >
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/hooks'

const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => {
  getTableData()
})
</script>
```

使用方法 2

```vue
<template>
  <!-- ... -->
  <div class="table-box">
    <a-table
      row-key="id"
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
    >
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/hooks'

const { pagination, setTotal } = usePagination(() => {
  getTableData()
})
</script>
```

#### 其他规范

可参考 Vue2 官网-风格指南: https://v2.cn.vuejs.org/v2/style-guide/ , 其中一些规范也可借鉴

可参考 gi-demo 源码，如有更好的规范建议，可以联系作者本人
