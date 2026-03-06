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
> Gi 用来定义全局组件前缀，如 GiTable、GiForm、GiPageLayout等

## 特性

- **最新技术栈**：使用 Vue3 / Vite 等前端前沿技术开发，使用高效率的 npm 包管理器
- **TypeScript**：应用程序级 JavaScript 的语言
- **主题**：丰富可配置的主题、暗黑模式
- **代码规范**：丰富的规范插件及极高的代码规范

## 预览


| 平台       | 预览地址                                                   |
| ---------- | ---------------------------------------------------------- |
| **github** | [Gi Admin Pro 预览地址](https://lin-97.github.io/gi-demo/) |


|        | 账号  | 密码   |
| ------ | ----- | ------ |
| 管理员 | admin | 123456 |
| 用户   | user  | 123456 |

## 代码仓库


| 平台              | 预览地址                                                     | 仓库地址                                                     |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **gitee**（码云） | --                                                           | <a href="https://gitee.com/lin0716/gi-demo" target="_blank">Gitee  仓库地址</a> |
| **github**        | <a href="https://lin-97.github.io/gi-demo/" target="_blank">Gi Admin Pro 预览地址</a> | <a href="https://github.com/lin-97/gi-demo" target="_blank">Github 仓库地址</a> |

## 项目示例图

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/01.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/02.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/03.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/04.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/05.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/06.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/07.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/08.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/09.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/10.png" />

<img src="https://gitee.com/lin0716/gi-image/raw/master/demo/11.png" />

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

参考大部分大网站，都是这个命名规则，不使用： `.myClass`这种

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

#### 全局组件--命名规范

组件命名：**单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)**

可参考 Vue2 官网-风格指南: https://v2.cn.vuejs.org/v2/style-guide/

```
GiForm.vue
GiTable.vue
GiPageLayout.vue
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

#### CSS 命名规范

建议采用全小写，多单词使用-连接符(参考大部分网站，包括掘金，码云等，都是采用这个规则)

或者采用`BEM`命名规范 [BEM 命名规范](https://getbem.com/naming/)

**BEM 命名规范**

```html
<div class="article">
  <div class="article__body">
    <button class="article__button--primary"></button>
    <button class="article__button--success"></button>
  </div>
</div>
```


其他：

位置 1： 使用 var(--margin) 全局 css 变量

位置 2：使用 var(--padding) 全局 css 变量

建议尽量使用全局 css 变量来开发，可以有效提高效率和团队协作

<img src="https://gitee.com/lin0716/gi-image/raw/master/gap.png" />



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

<a href="https://github.com/fslflame/vue3-request" target="_blank">vue3-request 一个专为 Vue 3 设计的异步请求处理库，它通过统一的 useRequest Hook 和强大的插件生态，彻底简化了异步操作和 API 调用的复杂性</a>

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

## 捐赠

<img style="width:300px" src="https://gitee.com/lin0716/gi-image/raw/master/alipay.jpg" />
