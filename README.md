<div align="center">
	<img style="width: 80px;height: 80px" src="https://gitee.com/lin0716/gi-image/raw/master/gi-logo.gif"/>
	<h1>Gi Admin Pro</h1>
    <a href='https://gitee.com/lin0716/gi-demo/stargazers'><img src='https://gitee.com/lin0716/gi-demo/badge/star.svg?theme=dark' alt='star'></img></a>
</div>

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## 简介

**Gi Admin Pro** 是一个基于 Vue3、Vite、TypeScript、Arco Design Vue、Pinia、VueUse 等的免费中后台模版，它使用了最新的前端技术栈，内置丰富的主题配置，有着极高的代码规范，基于 mock 实现的动态数据展示，开箱即用的模板，也可用于学习参考。

> **Gi 前缀含义：** G：代表全局 i：代表我的
>
> Gi 用来定义全局组件前缀，如 GiNavBar、GiTitle、GiLoading

## 特性

- **最新技术栈**：使用 Vue3 / Vite 等前端前沿技术开发，使用高效率的 npm 包管理器
- **TypeScript**：应用程序级 JavaScript 的语言
- **主题**：丰富可配置的主题、暗黑模式
- **代码规范**：丰富的规范插件及极高的代码规范

## 预览


| 平台              | 预览地址                                                   |
| ----------------- | ---------------------------------------------------------- |
| **gitee**（码云） | [Gi Admin Pro 预览地址](http://lin0716.gitee.io/gi-demo)   |
| **github**        | [Gi Admin Pro 预览地址](https://lin-97.github.io/gi-demo/) |


|        | 账号  | 密码   |
| ------ | ----- | ------ |
| 管理员 | admin | 123456 |
| 用户   | user  | 123456 |

## 代码仓库


| 平台              | 预览地址                                                                              | 仓库地址                                                                        |
| ----------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **gitee**（码云） | <a href="http://lin0716.gitee.io/gi-demo" target="_blank">Gi Admin Pro 预览地址</a>   | <a href="https://gitee.com/lin0716/gi-demo" target="_blank">Gitee  仓库地址</a> |
| **github**        | <a href="https://lin-97.github.io/gi-demo/" target="_blank">Gi Admin Pro 预览地址</a> | <a href="https://github.com/lin-97/gi-demo" target="_blank">Github 仓库地址</a> |

## 项目示例图

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/01.jpg" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/02.jpg" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/03.jpg" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/04.jpg" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/05.jpg" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/06.jpg" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/07.jpg" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/08.jpg" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/09.jpg" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/10.jpg" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/11.jpg" />

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
2. Vue - Official
3. Vue 3 Snippets
```

## 注意

```bash
由于升级了vite3，根据官方规定，node版本必须是14.18.0以上
```

**`注：现在已更新到了 Vite5.x，node的版本要求请参考官网要求`**

**vite 官网地址：** https://cn.vitejs.dev/

## 开源作者

**Lin**

## 常见问题

**为什么安装依赖不成功？**

检查`node`版本，最好使用原生镜像`npm`

还原镜像

```
npm config set registry https://registry.npmjs.org/
```

**为什么选择 Arco 组件库，而不是 Element Plus?**

[Element Plus 对比 Arco design](https://juejin.cn/post/7294219581894705190)

**为什么全局组件使用前缀 Gi?**

全局组件设置了按需引入，使用前缀，方便和局部组件做区分

**为什么组件使用单词大写开头 (PascalCase)命名写法？**

本项目`.vue`文件名以及在模板使用中，均采用大写`开头 (PascalCase)`命名方式

参考 Vue2 官网-风格指南: https://v2.cn.vuejs.org/v2/style-guide/

组件命名：`单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)`

其他优点：方便搜索（横线连接 (kebab-case)对搜索没那么方便）

<img src="https://gitee.com/lin0716/gi-image/raw/master/comp-name.png" />

**为什么 css 类名推荐横线连接 (kebab-case)**

参考大部分大网站，都是这个命名规则，别整： `.myClass`这种

**页面显示异常？**

**`页面必须要保留一个根元素！！！`**

**Vue3 权限管理对路由进行排序和格式化处理方式**

使用 **xe-utils** 这个 js 库，简化数据处理

[文章地址](https://juejin.cn/post/7301260557222805567)

**页面无法缓存？**

请检查页面是否配置了`name`，且名称是否与数据一致

```js
defineOptions({ name: 'AboutIndex' })
```

```js
{
  path: '/about/index',
  name: 'AboutIndex', // 检查name是否一致
  component: () => import('@/views/about/index.vue')
}
```

## 项目规范

#### .vue 文件行数规范

一般来说，一个 .vue 文件行数建议不超过 **`400`** 行，超过建议组件化拆分

#### 变量命名

```vue
<script setup lang="ts">
// 一般情况下，引用类型使用 const 定义，基本类型使用 let 定义
const arr = []
const obj = {}
const fn = () => {
  console.log('123')
}

let num = 10
let str = 'abc'
let flag = false

// vue3 中 ref、reactive 返回的是一个引用类型
const loading = ref(false)
const person = reactive({ name: '张三', age: 20 })
</script>
```

```vue
<script setup lang="ts">
const loading = ref(false) // 加载
const visible = ref(false) // 显示隐藏
const disabled = ref(true) // 是否被禁用
const showAddModal = ref(false) // 新增功能的模态框显示隐藏
const showAddDrawer = ref(false) // 新增功能的抽屉显示隐藏
// 或者 是否显示弹窗
const isShowDialog = ref<boolean>(false)
const isLogin = ref(false) // 是否登录
const isVIP = ref(false) // 是否是VIP用户

// 表单不建议 formData，直接最简（懒得写这么长）
const form = reactive({
  name: '',
  phone: '',
  remark: ''
})

const userInfo = ref({}) // 用户信息
const tableData = ref([]) // 表格数据
const treeData = ref([]) // 树结构数据

// 对象数组 列表数据最好后面加个 List 或者 Data
const companyList = ref([])
const checkedList = ref([])
const selectedList = ref([])
const addressList = ref([])
const userList = [
  { id: '01', name: '张三' },
  { id: '02', name: '李四' }
]
const tableData = []
const optionsList = [
  { label: '哈哈', value: 1 },
  { label: '嘻嘻', value: 2 }
]

// 非对象数组 在字母后面加s
const ids = []
const selectedIds = []
const activedKeys = []
const nums = [3, 5, 6]
const strs = ['aaa', 'bbb', 'ccc']

const getData = () => {
  const arr = []
  nums.forEach((item) => {
    arr.push({ value: item })
  })
}

const getUserList = async () => {
  const res = await Api.getUserPage()
  userList = res.data
}

// ---------------------------------------- 方法 --------------------------------------------- //

// 编辑
const edit = () => {}
const onEdit = () => {}
const handleEdit = () => {}

// 新增
const add = () => {}
const onAdd = () => {}
const handleAdd = () => {}

// 删除
// const delete = () => {} // 不推荐，delete 是JS关键词
const del = () => {}
const onDelete = () => {}
const handleDelete = () => {}
const remove = () => {}

// 重命名
const rename = () => {}
const onRename = () => {}
const handleRename = () => {}

// 批量删除
const mulDelete = () => {}
const onMulDelete = () => {}
const handleMulDelete = () => {}

// 搜索
const search = () => {}

// 返回
const back = () => {}

// 提交
const submit = () => {}

// 确认
const confirm = () => {}
const ok = () => {}

// 取消
const cancel = () => {}

// 打开 | 关闭
const open = () => {}
const close = () => {}

// 保存
const save = () => {}

// 获取表格列表
const getTableData = () => {}
const getTableList = () => {}
</script>
```

**常用前缀**


| 前缀       | 前缀 + 命名                  | 大意                        |
| ---------- | ---------------------------- | --------------------------- |
| get        | getUserInfo                  | 获取用户信息                |
| del/delete | delUserInfo                  | 删除用户信息                |
| update/add | updateUserInfo / addUserInfo | 修改用户信息 / 增加用户信息 |
| is         | isTimeout                    | 是否超时                    |
| has        | hasUserInfo                  | 有没有用户信息              |
| handle     | handleLogin                  | 处理登录                    |
| calc       | calcAverageSpeed             | 计算平均速度                |

**一些通用缩写**


| 源单词      | 缩写 |
| ----------- | ---- |
| message     | msg  |
| information | info |
| button      | btn  |
| background  | bg   |
| response    | res  |
| request     | req  |
| image       | img  |
| utility     | util |
| property    | prop |
| source      | src  |
| boolean     | bool |
| error       | err  |
| settings    | set  |

#### vue 相关的命名

```vue
<script setup lang="ts">
const isEdit = ref(false)

// 不推荐
const title = computed(() => {
  return isEdit.value ? '编辑' : '新增'
})

// 推荐 能一行就尽量写一行
const title = computed(() => (isEdit.value ? '编辑' : '新增'))
</script>
```

```vue
<script setup lang="ts">
// 表单建议使用 form 命名(简洁)，不必要使用 formData, 同时使用 reactive
const form = reactive({
  name: '',
  phone: ''
})
</script>
```

```vue
<script setup lang="ts">
// 如果属性比较多
const getInitForm = () => ({
  name: '',
  phone: '',
  email: '',
  sex: 1,
  age: ''
})

const form = reactive(getInitForm())

// 重置form
const resetForm = () => {
  for (const key in form) {
    delete form[key]
  }
  Object.assign(form, getInitForm())
}
</script>
```

```vue
<script setup lang="ts">
import { useAppStore, useUserStore } from '@/stores'
import { useLoading } from '@/hooks'

// stores 或 hooks 的使用命名规则定义
const appStore = useAppStore()
const userStore = useUserStore()

const { loading, setLoading } = useLoading()
</script>
```

#### 写法技巧

尽量使用三元表达式

```js
// 优化前
let isEdit = true
let title = ''
if (isEdit) {
  title = '编辑'
} else {
  title = '新增'
}

// 优化后
let title = isEdit ? '编辑' : '新增'
```

善用 includes 方法

```js
// 优化前
if (type === 1 || type === 2 || type === 3) {
}

// 优化后，此种方式在vue模板也可使用
if ([1, 2, 3].includes(type)) {
}
```

使用箭头函数简化函数

```js
// 优化前
function add(num1, num2) {
  return num1 + num2
}

// 优化后
const add = (num1, num2) => num1 + num2
```

尽量减少 if else if

```vue
<script setup lang="ts">
// 比例进度条颜色 尽量减少 if else if
const getProportionColor = (proportion: number) => {
  if (proportion < 30) return 'danger'
  if (proportion < 60) return 'warning'
  return 'success'
}
</script>
```

```js
// 优化前
const status = 200
const message = ''
if (status === 200) {
  message = '请求成功'
} else if (status === 404) {
  message = '请求出错'
} else if (status === 500) {
  message = '服务器错误'
}

// 优化后
const status = 200
const messageMap = {
  200: '请求成功',
  404: '请求出错',
  500: '服务器错误'
}
const message = messageMap[status]
```

如果函数参数超过两个，建议优化

```vue
<script setup lang="ts">
function createUser(name, phone, age) {
  console.log('姓名', name)
  console.log('手机', phone)
  console.log('年龄', age)
}

// 这种方式在使用的时候可读性很差，扩展性差，而且不易于维护
createUser('张三', '178****2828', 20)

function createUser2({ name, phone, age }) {
  console.log('姓名', name)
  console.log('手机', phone)
  console.log('年龄', age)
}

// 以对象传参更直观，更好扩展和维护
createUser2({ name: '张三', phone: '178****2828', age: 20 })
</script>
```

#### 接口 api 的命名

**方案一**

如果你后端的接口命名相对简约，那么可以采用以下命名规则（注意ts类型的命名规则)

命名规范： 操作名 + 后端模块名 + 功能名

前缀为（操作名）动词，动词 eg：`add / update / delete / get / save` 等

~~~ts
import type * as T from './type'
import http from '@/utils/http'

/** 获取用户列表 */
export function getUserList() {
  return http.get<PageRes<T.UserItem[]>>('/user/list')
}

/** 获取用户详情 */
export function getUserDetail() {
  return http.get<T.UserDetail>('/user/detail')
}

/** 新增用户 */
export function addUser(data: any) {
  return http.post<T.UserAddResult>('/user/add', data)
}

/** 编辑用户 */
export function updateUser(data: any) {
  return http.post<T.UserUpdateResult>('/user/update', data)
}

/** 删除用户 */
export function deleteUser(data: { id: string }) {
  return http.post<T.UserDeleteResult>('/user/delete', data)
}
~~~

**`以上命名规范可以确保 api 命名不会冲突，加上模块名能快速定位以及更加方便维护`**

~~~ts
// @/apis/index.ts
export * from './user'
export * from './user/type'
~~~

方案一的api引入

~~~ts
import { getUserList, addUser, type UserAddResult } from '@/apis'
~~~

方案一接口的ts类型命名规则

~~~ts
const url1 = '/user/list' // UserItem[] 或者 UserListItem[]
const url2 = '/user/detail' // UserDetail 或者 UserDetailResult
const url3 = '/role/list' // RoleItem[] 或者 RoleListItem[]
const url4 = '/role/detail' // RoleDetail 或者 RoleDetailResult
~~~



**方案二**

如果你后端的接口命名相对没那么简约，那么可以采用以下命名规则（注意ts类型的命名规则)

~~~ts
import type * as T from './type'
import http from '@/utils/http'

/** 获取用户列表 */
export function getUserList() {
  return http.get<PageRes<T.UserItem[]>>('/user/getUserList')
}

/** 获取用户详情 */
export function getUserDetail() {
  return http.get<T.UserDetail>('/user/getUserdetail')
}

/** 新增用户 */
export function addUser(data: any) {
  return http.post<T.AddUserResult>('/user/addUser', data)
}

/** 编辑用户 */
export function updateUser(data: any) {
  return http.post<T.UpdateUserResult>('/user/updateUser', data)
}

/** 删除用户 */
export function deleteUser(data: { id: string }) {
  return http.post<T.DeleteUserResult>('/user/deleteUser', data)
}
~~~

**`以上命名规范可以确保 api 命名不会冲突，加上模块名能快速定位以及更加方便维护`**

方案二的api引入

~~~ts
import { getUserList, addUser, type AddUserResult } from '@/apis/user' // 需要具体到模块名
~~~



#### 接口 api 的 ts 类型导入

```ts
import http from '@/utils/http'
import { prefix } from '../config'
import type * as T from './type'

/** 获取部门数据 */
export function getSystemDeptList() {
  return http.get<PageRes<T.DeptItem[]>>(`${prefix}/system/dept/list`)
}

/** 获取用户数据 */
export function getSystemUserList() {
  return http.get<PageRes<T.UserItem[]>>(`${prefix}/system/user/list`)
}

/** 获取角色数据 */
export function getSystemRoleList() {
  return http.get<PageRes<T.RoleItem[]>>(`${prefix}/system/role/list`)
}
```

不建议以下方式导入 ts 类型，不够方便

```ts
import type { DeptItem, UserItem, RoleItem } from './type'
```



#### 接口调用书写

**写法一**

不需要 loading，不需要错误打印的 情况

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { getUserList as getUserListApi, type UserItem } from '@/apis' // 同名可以使用别名

const userList = ref<UserItem[]>([])
const getUserList = async () => {
  const res = await getUserListApi()
  console.log('如果异步成功，则会打印这行文字，否则不会打印这行文字，也不会往下执行')
  userList.value = res.data
}
</script>

// getUserListApi 是一个 Promise 异步函数，Promise 最后只有 成功 / 失败 两种状态 // getUserListApi 是基于 axios
封装的，在 axios 响应拦截器做了处理 // 当 res.success === false 的时候 Promise.reject(),
也就异步失败，异步失败不会往下执行
```

**写法二**

需要 loading，需要错误打印的情况

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { getUserList as getUserListApi, type UserItem } from '@/apis' // 同名可以使用别名

const loading = ref(false)
const userList = ref<UserItem[]>([])
const getUserList = async () => {
  try {
    loading.value = true
    const res = await getUserListApi()
    console.log('如果异步成功，则会打印这行文字，否则不会打印这行文字，也不会往下执行')
    userList.value = res.data
  } catch (error) {
    console.log('如果异步失败，会打印这行文字')
    // 由于 axios 在封装的时候，已经在异步失败给了失败的提示弹窗处理
    // 所以这里没必要再写 Message.error(error)
  } finally {
    console.log('如果异步或者失败，都会打印这行代码')
    loading.value = false // 可以用来处理 loading
  }
}
</script>
```

**写法三**

需要 loading, 不需要错误打印（不进行错误处理）的情况

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { getUserList as getUserListApi, type UserItem } from '@/apis' // 同名可以使用别名

const loading = ref(false)
const userList = ref<UserItem[]>([])
const getUserList = async () => {
  try {
    loading.value = true
    const res = await getUserListApi()
    console.log('如果异步成功，则会打印这行文字，否则不会打印这行文字，也不会往下执行')
    userList.value = res.data
  } finally {
    console.log('如果异步或者失败，都会打印这行代码')
    loading.value = false // 可以用来处理 loading
  }
}
</script>

// catch 可以省略
```

#### 正则使用示例

文件位置：@/utils/regexp.ts

```ts
/** @desc 正则-手机号码 */
export const Phone = /^1[3-9]\d{9}$/

/** @desc 正则-邮箱 */
export const Email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

/** @desc 正则-6位数字验证码正则 */
export const Code_6 = /^\d{6}$/

/** @desc 正则-4位数字验证码正则 */
export const Code_4 = /^\d{4}$/

/** @desc 正则-16进颜色值 #333 #8c8c8c */
export const ColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

/** @desc 正则-只能是中文 */
export const OnlyCh = /^[\u4e00-\u9fa5]+$/gi

/** @desc 正则-只能是英文 */
export const OnlyEn = /^[a-zA-Z]*$/

/** @desc 登录注册-密码 6-16位大小写字母、数字的js正则 */
export const Password = /^[a-zA-Z0-9]{6,16}$/
```

使用

```vue
<script lang="ts" setup>
import { reactive } from 'vue'
import { Message } from '@arco-design/web-vue'
// 正则推荐一下导入方式
import * as Regexp from '@/utils/regexp'

const form = reactive({
  name: '',
  phone: ''
})

const submit = () => {
  if (!Regexp.Phone.test(form.phone)) {
    return Message.warning('请输入正确手机号格式')
  }
}
</script>
```

页面模板 CSS 类名采用半角连接符(-)

```vue
<template>
  <div class="detail">
    <h3 class="title">标题</h3>
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
DetailModal.vue
```

#### 文件夹命名--命名规范 (采用中划线-)

1、文件名建议只使用小写字母，不使用大写字母

2、名称较长时采用半角连接符(-)分隔

```
home/index.vue
user/index.vue
user-detail/index.vue
```

#### 弹窗组件 Modal、抽屉组件 Drawer 的一般封装

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
const isEdit = computed(() => !!detailId.value) // 判断是新增还是编辑模式
const title = computed(() => (isEdit.value ? '编辑' : '新增'))

const add = () => {
  detailId.value = ''
  visible.value = true
}

// 如果这里的参数超过两个，建议优化成对象形式
// const edit = ({ id, taskId }) = {
//   console.log(id, taskId)
// }

const edit = (id: string) => {
  detailId.value = id
  visible.value = true
  // getDetail() 回显操作
}

defineExpose({ add, edit })

const confirm = () => {
  console.log('点击了确认按钮')
}
</script>
```

使用

**`模板里使用自定义组件：使用大写开头驼峰，双击好复制，对于搜索便利`**

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

#### GiForm 使用示例(2024-10-25更新：采用更强大的Grid布局)

GiForm 是一个 JSON 配置表单组件，能够快速通过 JSON 构建表单布局

基本示例

<img src="https://gitee.com/lin0716/gi-image/raw/master/form/GiForm-code.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/form/form1.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/form/form2.png" />

**新版文档**

**columns配置**


| 属性          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| type          | 表单项类型，如input、select、date-picker...等                |
| label         | 表单项的label（a-form-item的label）                          |
| field         | 表单项的field（a-form-item的field）                          |
| span          | 继承表单项外层包裹的a-grid-item的span                        |
| gridItemProps | 继承表单项外层包裹的a-grid-item的所有属性props               |
| formItemProps | 继承a-form-item的所有props                                   |
| props         | 继承a-input、a-select等组件的所有props，根据你所填的type的表单项类型配置对应的props |
| rules         | 表单项校验规则                                               |
| hide          | 动态隐藏 （form）=> boolean 返回一个布尔值， form为v-model绑定的表单 |
| show          | 动态显示 （form）=> boolean 返回一个布尔值， form为v-model绑定的表单 |
| disabled      | 动态禁用 （form）=> boolean 返回一个布尔值， form为v-model绑定的表单 |

**结合Modal函数实现更高效的表单对话框**

<img src="https://gitee.com/lin0716/gi-image/raw/master/form/GiForm-modal.png" />

#### GiTable 使用示例

**GiTable继承了a-table的所有属性和配置，只是多了一些插槽，以及prop属性，具体看源码**

<img src="https://gitee.com/lin0716/gi-image/raw/master/table/GiTable-code.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/table/GiTable-demo.gif" />

#### Hooks 目录结构

<img src="https://gitee.com/lin0716/gi-image/raw/master/hooks-catalog.png" />

**hooks 下默认存放公共的，非接口请求的 hooks**

```vue
<script setup lang="ts">
import { useLoading } from '@/hooks'

const { loading, setLoading } = useLoading()
</script>
```

**hooks/app 下主要存放通用接口的 hooks**

/hooks/app/useDept.ts

```typescript
import { ref } from 'vue'
import { getSystemDeptList } from '@/apis'
import type { DeptItem } from '@/apis'

/** 部门模块 */
export function useDept() {
  const loading = ref(false)
  const deptList = ref<DeptItem[]>([])

  const getDeptList = async () => {
    try {
      loading.value = true
      const res = await getSystemDeptList()
      deptList.value = res.data.records
    } catch (error) {
    } finally {
      loading.value = false
    }
  }
  return { deptList, getDeptList, loading }
}
```

使用

```vue
<script setup lang="ts">
import { useDept } from '@/hooks/app'

const { deptList, getDeptList, loading: deptLoading } = useDept()
getDeptList() // 建议在页面调用 hooks 的方法，比较直观（不在hooks里面调用）
</script>
```

#### TSX 方式使用表格

<img src="https://gitee.com/lin0716/gi-image/raw/master/table/tsx-table.png" />

#### usePagination(hooks) 的使用

文件位置：@/hooks/modules/usePagination.ts

**旧版：**

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

**`上面这种方案已经废弃`**，最新方案如下

**改良版（兼容旧版）：**

```js
import { reactive, toRefs } from 'vue'
import type { PaginationProps } from '@arco-design/web-vue'

type Callback = () => void

type Options = {
  defaultPageSize: number
}

export default function usePagination(callback: Callback, options: Options = { defaultPageSize: 10 }) {
  const pagination = reactive({
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

// 从第一页开始查询
changeCurrent(1)
</script>
```

使用方法 2 (改良版，更少代码)

```vue
<template>
  <!-- ... -->
  <div class="table-box">
    <a-table row-key="id" :columns="columns" :data="tableData" :pagination="pagination"> </a-table>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/hooks'

const { pagination, setTotal } = usePagination(() => {
  getTableData()
})

// 从第一页开始查询
pagination.onChange(1)

// 搜索
const search = () => {
  pagination.onChange(1)
}

const search2 = () => {
  pagination.current = 1
  getTableData()
}
</script>
```

注意：

```vue
<script setup lang="ts">
import { usePagination } from '@/hooks'

const { pagination, setTotal } = usePagination(() => {
  getTableData()
})

const form = reactive({
  name: '',
  status: '',
  page: pagination.current, // 此种方式不会响应
  size: pagination.pageSize // 此种方式不会响应
})

const getTableData = async () => {
  const res = await getData(form)
}
</script>
```

改为

```vue
<script setup lang="ts">
import { usePagination } from '@/hooks'

const { pagination, setTotal } = usePagination(() => {
  getTableData()
})

const form = reactive({
  name: '',
  status: ''
})

const getTableData = async () => {
  const res = await getData({ ...form, page: pagination.current, size: pagination.pageSize })
}
</script>
```

或者

```vue
<script setup lang="ts">
import { usePagination } from '@/hooks'

const { pagination, setTotal } = usePagination(() => {
  form.page = pagination.current
  form.size = pagination.pageSize
  getTableData()
})

const form = reactive({
  name: '',
  status: '',
  page: pagination.current,
  size: pagination.pageSize
})

const getTableData = async () => {
  const res = await getData(form)
}
</script>
```

```vue
<template>
  <div>
    <a-pagination v-bind="pagination" />
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/hooks'

const { pagination, setTotal } = usePagination(() => {
  getTableData()
})

const form = reactive({
  name: '',
  status: ''
})

const getTableData = async () => {
  const res = await getData({ ...form, page: pagination.current, size: pagination.pageSize })
}
</script>
```

#### useTable(hooks) 的使用

<img src="https://gitee.com/lin0716/gi-image/raw/master/table/useTable.png" />

使用

<img src="https://gitee.com/lin0716/gi-image/raw/master/table/useTable-code.png" />

**提示**

使用 useTable 的时候不传入类型，tableData 也会根据入参自动推导出类型

<img src="https://gitee.com/lin0716/gi-image/raw/master/table/useTable-code2.png" />

**`最后提示`**

在最新版的`useTable`中， `selectKeys`已经改为`selectedKeys`，同时加了其他新功能，具体查看源码

#### useResetReactive(hooks) 的使用

作用：有时候需要`重置表单数据`，这个`hooks`提供很大便捷性

代码：`useResetReactive.ts`

```js
import { reactive } from 'vue'
import { cloneDeep } from 'lodash-es'

export function useResetReactive<T extends object>(value: T) {
  const getInitValue = () => cloneDeep(value)

  const state = reactive(getInitValue())

  const reset = () => {
    Object.keys(state).forEach((key) => delete state[key])
    Object.assign(state, getInitValue())
  }

  return [state, reset] as const
}

```

**使用**

```js
import { useResetReactive } from '@/hooks'

const [form, resetForm] = useResetReactive({
  id: '',
  name: '',
  phone: '',
  status: false
})

// 重置表单数据
resetForm()
```

**注意**

`resetForm`方法为什么要加上以下代码

```js
for (const key in form) {
  delete form[key]
}
```

比如一个编辑弹窗，点击编辑，会根据 id 查详情，有时候为了方便，直接把详情的数据赋值到 form 里面，这就会导致重置的时候，有详情的属性冗余，以下举个例子

```js
const form = { name: '' }
const detail = { name: '张三', status: 1 }
Object.assign(form, detail)
console.log(form) // { name: '张三', status: 1 }

// 如果直接重置
Object.assign(form, { name: '' })
console.log(form) // { name: '', status: 1 } 有额外属性冗余，status会不经意的随着保存操作提交到后台
```

#### TSX 方式调起弹窗

##### 方式 1

tool.tsx

<img src="https://gitee.com/lin0716/gi-image/raw/master/modal/tsx-modal2.png" />

使用

<img src="https://gitee.com/lin0716/gi-image/raw/master/modal/tsx-modal-use.png" />

##### 方式 2

AddUserForm.vue

<img src="https://gitee.com/lin0716/gi-image/raw/master/modal/tsx-modal1.png" />

使用

<img src="https://gitee.com/lin0716/gi-image/raw/master/modal/tsx-modal-use.png" />

##### 方式 3

<img src="https://gitee.com/lin0716/gi-image/raw/master/modal/tsx-modal3-1.png" />

#### 组件使用建议

能使用组件尽量使用组件实现页面布局

flex 布局尽量使用 **Row** 组件

```vue
<template>
  <a-row justify="space-between" align="center"> </a-row>
</template>
```

按钮间间隔尽量使用 **Space** 组件

```vue
<template>
  <a-space :size="10">
    <a-button>返回</a-button>
    <a-button type="primary">提交</a-button>
  </a-space>
</template>
```

状态色文本，尽量使用

```vue
<template>
  <a-typography-text>主要文本</a-typography-text>
  <a-typography-text type="secondary">二级文本</a-typography-text>
  <a-typography-text type="primary">主题色文本</a-typography-text>

  <a-typography-text type="primary">已提交</a-typography-text>
  <a-typography-text type="success">审核通过</a-typography-text>
  <a-typography-text type="warning">未提交</a-typography-text>
  <a-typography-text type="danger">不通过</a-typography-text>
</template>
```

Link 组件使用场景

```vue
<template>
  <a-table>
    <a-table-column title="操作" :width="150" fixed="right">
      <template #cell="{ record }">
        <a-space>
          <a-link :hoverable="false">编辑</a-link>
          <a-link :hoverable="false">编辑</a-link>
          <a-link :hoverable="false">删除</a-link>
        </a-space>
      </template>
    </a-table-column>
  </a-table>
</template>
```

#### CSS 命名规范

建议采用全小写，多单词使用-连接符(参考大部分网站，包括掘金，码云等，都是采用这个规则)

或者采用`BEM`命名规范 [BEM 命名规范](https://getbem.com/naming/)

```css
// 推荐
.header
.footer
.main
.content
.container
.page
.detail
.pane-left
.pane-right
.list
.list-item


// 不推荐
.Header
.listItem
.list-Item
.List-Item;
```

**BEM 命名规范**

```html
<div class="article">
  <div class="article__body">
    <button class="article__button--primary"></button>
    <button class="article__button--success"></button>
  </div>
</div>
```

```less
.article {
  max-width: 1200px;
  &__body {
    padding: 20px;
  }
  &__button {
    padding: 5px 8px;
    &--primary {
      background: blue;
    }
    &--success {
      background: green;
    }
  }
}
```

#### CSS 全局类名-命名规范

**`采用下划线_，好复制`**

```scss
.gi_line_1   .gi_line_2   .gi_margin   .gi_box
```

```scss
// 文件位置: @/styles/global.scss
.gi_line_1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.gi_line_2 {
  -webkit-line-clamp: 2;
}

.gi_line_3 {
  -webkit-line-clamp: 3;
}

.gi_line_4 {
  -webkit-line-clamp: 4;
}

.gi_line_5 {
  -webkit-line-clamp: 5;
}

.gi_line_2,
.gi_line_3,
.gi_line_4,
.gi_line_5 {
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; // 弹性伸缩盒
  -webkit-box-orient: vertical; // 设置伸缩盒子元素排列方式
}

.gi_padding {
  padding: $padding;
}

.gi_margin {
  margin: $margin;
}

.gi_relative {
  position: relative;
}

.gi_absolute {
  position: absolute;
}

.gi_rotate_90deg {
  transform: rotate(90deg);
}

.gi_rotate_-90deg {
  transform: rotate(-90deg);
}

.gi_rotate_180deg {
  transform: rotate(180deg);
}

.gi_rotate_-180deg {
  transform: rotate(-180deg);
}

.gi_mt {
  margin-top: $margin;
}

.gi_mb {
  margin-bottom: $margin;
}

.gi_ml {
  margin-left: $margin;
}

.gi_mr {
  margin-right: $margin;
}

.gi_mx {
  margin: 0 $margin;
}

.gi_my {
  margin: $margin 0;
}

.gi_m0 {
  margin: 0;
}

.gi_pt {
  padding-top: $margin;
}

.gi_pb {
  padding-bottom: $margin;
}

.gi_pl {
  padding-left: $margin;
}

.gi_pr {
  padding-right: $margin;
}

.gi_px {
  padding: 0 $padding;
}

.gi_py {
  padding: $padding 0;
}

.gi_p0 {
  padding: 0;
}

// 使用场景，页面内容超出高度会自动滚动
.gi_page {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  overflow-y: auto;
}

// 通用盒子
.gi_box {
  background: var(--color-bg-1);
  border-radius: $radius-box;
  overflow: hidden;
}
```

#### 全局 scss 变量-命名规范

```scss
$color-theme: rgb(var(--primary-6)); // 主题色
$color-primary: rgb(var(--primary-6)); // 主题色
$color-success: rgb(var(--success-6));
$color-warning: rgb(var(--warning-6));
$color-danger: rgb(var(--danger-6));
$color-info: rgb(var(--gray-6));

$title-color: xxx; // 已弃用，写起来繁琐，易忘
$text-color: xxx; // 已弃用
$text-sub-color: xxx; // 已弃用
$text-sup-color: xxx; // 已弃用

// 借鉴了Arco Design命名规则
$color-text-1: var(--color-text-1); // 标题、重点文本字体颜色
$color-text-2: var(--color-text-2); // 文本-全局默认字体颜色
$color-text-3: var(--color-text-3); // 二级文本颜色
$color-text-4: var(--color-text-4); // 辅助文本颜色

$margin: 16px; // 盒子间距
$padding: 16px; // 盒子和内容的间距
```

如下图：

位置 1： 使用 $margin 全局 scss 变量

位置 2：使用 $padding 全局 scss 变量

建议尽量使用全局 scss 变量来开发，可以有效提高效率和团队协作

<img src="https://gitee.com/lin0716/gi-image/raw/master/gap.png" />

#### CSS 的命名词汇

```css
前一个    prev
后一个    next
当前的    current

显示的    show
隐藏的    hide
打开的    open
关闭的    close

选中的    selected
有效的    active
默认的    default
反转的    toggle

禁用的    disabled
危险的    danger
主要的    primary
成功的    success
提醒的    info
警告的    warning
出错的    error

大型的    lg
小型的    sm
超小的    xs
```

```css
文档    doc
头部    header(hd)
主体    body
尾部    footer(ft)
主栏    main
侧栏    side
容器    box/container
```

```css
列表    list
列表项  item
表格    table
表单    form
链接    link
标题    caption/heading/title
菜单    menu
集合    group
条      bar
内容    content
结果    result
```

```css
按钮        button(btn)
下拉菜单    dropdown
工具栏      toolbar
分页        page
缩略图      thumbnail
警告框      alert
进度条      progress
导航条      navbar
导航        nav
子导航      subnav
面包屑      breadcrumb(crumb)
标签        label
徽章        badge
巨幕        jumbotron
面板        panel
洼地        well
标签页      tab
提示框      tooltip
弹出框      popover
轮播图      carousel
手风琴      collapse
定位浮标    affix
```

```css
品牌        brand
标志        logo
额外部件    addon
版权        copyright
注册        regist(reg)
登录        login
搜索        search
热点        hot
帮助        help
信息        info
提示        tips
开关        toggle
新闻        news
广告        advertise(ad)
排行        top
下载        download
```

```css
左浮动    fl
右浮动    fr
清浮动    clear
```

#### 其他规范

可参考 Vue2 官网-风格指南: https://v2.cn.vuejs.org/v2/style-guide/ , 其中一些规范也可借鉴

可参考 **Gi Admin Pro** 源码，如有更好的规范建议，可以联系作者本人

## Vue 相关

<a href="https://cn.vuejs.org/" target="_blank">Vue3 官网</a>

<a href="https://router.vuejs.org/zh/" target="_blank">Vue-Router</a>

<a href="https://cn.vitejs.dev/" target="_blank">Vite</a>

<a href="https://pinia.web3doc.top/" target="_blank">Pinia</a>

## 插件推荐

<a href="https://arco.design/vue/component/button" target="_blank">Arco Design 组件库</a>

<a href="https://dayjs.fenxianglu.cn/" target="_blank">Day.js 一个极简的 JavaScript 库，可以为现代浏览器解析、验证、操作和显示日期和时间 2K 大小</a>

<a href="https://www.lodashjs.com/" target="_blank">Lodash 一个一致性、模块化、高性能的 JavaScript 实用工具库</a>

<a href="https://vxetable.cn/xe-utils/#/" target="_blank">Xe-utils 一个 JavaScript 函数库、工具类</a>

<a href="https://vueuse.org/" target="_blank">VueUse 一个 Vue3 Hooks 库</a>

<a href="https://next.attojs.com/" target="_blank">VueRequest 一个 Vue 请求库</a>

<a href="https://mirari.cc/v-viewer/" target="_blank">V-Viewer 基于 viewer.js 的 vue 图像查看器组件，支持旋转、缩放等操作</a>

<a href="https://www.npmjs.com/package/vue-color-kit" target="_blank">Vue-Color-Kit 一个 vue3 颜色选择器组件</a>

<a href="https://vxetable.cn/#/table/start/install" target="_blank">Vxe-Table</a>

**其他**

<a href="https://vcalendar.io/" target="_blank">VCalendar 日历组件</a>

<a href="https://antoniandre.github.io/vue-cal/" target="_blank">Vue Cal 日历组件</a>

<a href="https://alfred-skyblue.github.io/vue-draggable-plus/" target="_blank">VueDraggablePlus 支持 Vue2 和 Vue3 的拖拽组件</a>

## 推荐书籍

<a href="https://vue3.chengpeiquan.com/" target="_blank">Vue 入门指南与实战案例</a>

<a href="https://jkchao.github.io/typescript-book-chinese/" target="_blank">深入理解 TypeScript</a>

<a href="https://vue3js.cn/interview/" target="_blank">前端宝典</a>

<a href="https://lhammer.cn/You-need-to-know-css/#/translucent-borders" target="_blank">Web 开发人员需要知道的 CSS 技巧</a>

<a href="https://es6.ruanyifeng.com/#README" target="_blank">阮一峰 ES6</a>

<a href="https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" target="_blank">阮一峰 flex 布局</a>

## 开源项目集合

<a href="https://vue-admin.cn/admin" target="_blank">Vue3 开源项目集合</a>

<a href="https://react-admin.cn/admin/" target="_blank">React 开源项目集合</a>

## 工具

<a href="https://c.runoob.com/" target="_blank">菜鸟工具</a>

<a href="https://carbon.now.sh/?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=material&wt=none&l=auto&width=680&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false" target="_blank">代码生成图片</a>

<a href="http://xiets.gitee.io/json-to-any-web/" target="_blank">JSON-TO-ANY 对象转 ts 类型</a>

<a href="http://49.234.61.19/tool/cssTriangle" target="_blank">在线三角形样式生成器</a>

<a href="https://go.itab.link/" target="_blank">iTab</a>



## 赞助

<a href="https://www.aeoliancloud.com/cart/goods.htm?id=14" target="_blank">风铃云信息科技（T3 + 机房直连全国 平均延迟20ms）-点击查看 </a>

<img style="width:360px" src="https://gitee.com/lin0716/gi-image/raw/master/adv1.png" />

<img style="width:360px" src="https://gitee.com/lin0716/gi-image/raw/master/sponsor.jpg" />

## 捐赠

<img style="width:300px" src="https://gitee.com/lin0716/gi-image/raw/master/alipay.jpg" />
