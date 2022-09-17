<div align="center">
	<img style="width: 80px;height: 80px" src="https://s1.ax1x.com/2022/05/12/OBUfSS.gif"/>
	<h1>Gi Admin Pro</h1>
</div>


[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## 简介

Gi Admin Pro  是一个基于 Vue3、Vite、TypeScript、Arco Design UI、Pinia、VueUse 的免费中后台模版，它使用了最新的前端技术栈，内置丰富的主题配置，有着极高的代码规范，基于mock实现的动态数据展示，开箱即用的模板，也可用于学习参考。

> **Gi前缀含义：**
>
> ​	G：代表 全局 
>
> ​	i：代表 我的     
>
> Gi 用来定义全局组件前缀，如GiNavBar、GiTitle、GiLoading

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发, 使用高效率的npm包管理器
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
## vs code插件安装
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

>  接口api的命名

命名规范： 操作 + 后端模块名 + 功能名

~~~
/quota/getList   =>  getQuotaList
/quota/getQuotaList  =>  getQuotaList   // 如果功能名包含了模块名，可省略

/user/save  =>  saveUser
/user/list  =>  getUserList  // 如果没有操作名，可以自行根据场景补充
~~~

以上命名规范可以确保api命名不会冲突

引入接口

~~~js
import { getUserList, saveUser } from '@/apis'
~~~



> 页面变量命名 ()

~~~js
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
const userList = []
const companyList = ref([]) // 列表数据最好后面加个 List 或者 Data
const checkedList = ref([])
const selectedList = ref([])

// 方法
编辑 onEdit     handleEdit     edit
新增 onAdd      handleAdd      add
删除 onDelete   handleDelete   delete
批量删除 onMulDelete   handleMulDelete  mulDelete
重命名 onRename
搜索 search
获取表格列表 getTableData  // 一般一个页面也就一个表格，gi-demo习惯用getTableData, 结合分页hooks的时候可以直接复制复用
返回 back
提交 submit
确认 confirm  ok  submit
取消 cancel
关闭 close
保存 save
~~~

页面模板类名使用中划线

~~~vue
<template>
	<div class="detail">
        <h3 class="title"></h3>
        <section class="table-box">
            <table></table>
        </section>
    </div>
</template>
~~~



> 全局组件-命名规范

~~~
GiTitle   GiThemeBtn   GiSvgIcon
~~~

 

> 局部组件-命名规范

~~~
Pane1.vue   Pane2.vue    Step1.vue   Step2.vue   AddModal.vue   EditDrawer.vue
~~~



> 文件夹命名-命名规范 (采用中划线-)

~~~
home   quota-first/index.vue      quota-detail/index.vue 
~~~



> 全局类名-命名规范 (采用下划线_，好复制)

~~~
.gi_line_1   .gi_line_2   .gi_margin   .gi_box   .gi_text_tag
~~~



> 全局scss变量-命名规范

~~~scss
$title-color: xxx; // 已弃用，写起来繁琐，易忘
$text-color: xxx; // 已弃用
$text-sub-color: xxx; // 已弃用
$text-sup-color: xxx; // 已弃用

// 借鉴了Arco Design命名规则
$color-text-1: var(--color-text-1); // 标题、重点文本字体颜色
$color-text-2: var(--color-text-2); // 文本-全局默认字体颜色
$color-text-3: var(--color-text-3); // 二级文本颜色
$color-text-4: var(--color-text-4); // 辅助文本颜色
~~~



> 业务状态

gi-demo的业务状态放在@/libs/status/xxx.ts      xxx为接口模块名

~~~js
type SubmitStatusItem = { name: string; value: number; color: string }
/** @desc 指标提交状态 */
export const SubmitStatusList: SubmitStatusItem[] = [
  { name: '待提交', value: 0, color: 'orange' },
  { name: '已提交', value: 1, color: 'green' }
]

type StatusItem = { name: string; value: number; color: string }
/** @desc 指标启用状态 */
export const StatusList: StatusItem[] = [
  { name: '禁用', value: 0, color: '#f53f3f' },
  { name: '启用', value: 1, color: '#00b42a' }
]
~~~

使用的时候

引入

~~~js
import { StatusList } from '@/libs/status/xxx' // 要具体到模块名
~~~

~~~vue
<a-table-column title="状态" :width="100" align="center">
	<template #cell="{ record }">
		<template v-for="item in StatusList" :key="item.value">
			<a-tag v-if="item.value === record.status" :color="item.color">{{ item.name }}</a-tag>
		</template>
	</template>
</a-table-column>
~~~



> 其他规范

可参考gi-demo源码，如有更好的规范建议，可以联系作者本人
