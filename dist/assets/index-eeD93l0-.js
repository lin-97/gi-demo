import{_ as R}from"./index-Cwd6Cqa-.js";import{_ as S}from"./index-B7zlQTHb.js";import{_ as $}from"./GiTable-DD2J_7ko.js";import{_ as j}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-Dsi2Injn.js";import{_ as W}from"./GiCellGender.vue_vue_type_script_setup_true_lang-CrlnTWU_.js";import{_ as U}from"./GiForm-q03IWsLD.js";import{b as X}from"./index-D6v7xbu4.js";import{_ as Y}from"./index-Bs0L_RZk.js";import"./index-COakebNL.js";import{u as q}from"./useTable-B8Y9iGJZ.js";import"./dept-Dmun1cmX.js";import{u as E}from"./useDict-COD8ChSZ.js";import"./role-C-C9HNfF.js";import{ah as H,a9 as l,ad as K}from"./arco-BuJQNAYO.js";import{e as Q,r as Z,c as ee,h as a,j as te,k as oe,l as e,t,a1 as s,Y as ne,X as m,y as d,m as p}from"./vue-_iYK9Zi6.js";import"./omit-D746qIin.js";import"./useBreakpoint-DAFsyWcD.js";import"./index-BPv1vC5v.js";const ae=`
<template>
  <GiPageLayout>
    <GiForm v-model="form" search :columns="searchColumns"
      :grid-item-props="{ span: { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 } }" @search="search" @reset="search">
    </GiForm>

    <GiTable row-key="id" :loading="loading" :columns="columns" :data="tableData"
      :scroll="{ x: '100%', y: '100%', minWidth: 1300 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :pagination="pagination" :disabled-column-keys="['序号', 'name']" @refresh="getTableData">
      <template #custom-title>
        <a-button type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <a-button type="primary" status="danger" @click="onMulDelete">
          <template #icon><icon-delete /></template>
          <span>删除</span>
        </a-button>
        <a-button @click="onImport">
          <template #icon><icon-export /></template>
          <span>导入</span>
        </a-button>
        <a-button type="primary" status="warning" @click="onViewCode">
          <template #icon><icon-code /></template>
        </a-button>
      </template>
      <template #avatar="{ record }">
        <a-avatar :size="28" shape="circle">
          <img :src="record.avatar" />
        </a-avatar>
      </template>
      <template #gender="{ record }">
        <GiCellGender :gender="record.gender"></GiCellGender>
      </template>
      <template #status="{ record }">
        <GiCellStatus :status="record.status"></GiCellStatus>
      </template>
      <template #action>
        <a-space>
          <a-button type="primary" size="mini">修改</a-button>
          <a-button size="mini">详情</a-button>
          <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete">
            <a-button type="primary" status="danger" size="mini">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </GiTable>

    <GiFooter></GiFooter>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { Drawer, Link, Message, type PopconfirmInstance, type TableInstance } from '@arco-design/web-vue'
import CodeJson from './code-json'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { baseAPI } from '@/apis/person'
import type * as T from '@/apis/person'
import type { ColumnItem } from '@/components/GiForm'
import GiCodeView from '@/components/GiCodeView/index.vue'

defineOptions({ name: 'TableCustom2' })
const { data: statusOptions } = useDict({ code: 'status' })
const form = reactive({})

const searchColumns = computed(() => [
  {
    type: 'input',
    label: '姓名',
    field: 'name'
  },
  {
    type: 'input',
    label: '手机',
    field: 'phone',
    props: {
      maxLength: 11
    }
  },
  {
    type: 'select',
    label: '类型',
    field: 'status',
    props: {
      options: statusOptions.value
    }
  },
  {
    type: 'date-picker',
    label: '创建日期',
    field: 'createTime'
  },
  {
    type: 'input',
    label: '地址',
    field: 'address'
  }
] as ColumnItem[])

const columns: TableInstance['columns'] = [
  { title: '序号', width: 66, align: 'center', render: ({ rowIndex }) => h('span', {}, rowIndex + 1) },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    render: ({ record }) =>
      h(Link, { onClick: () => onClickName(record as T.ListItem) }, { default: () => record.name })
  },
  { title: '头像', width: 80, align: 'center', slotName: 'avatar' },
  { title: '手机号', dataIndex: 'phone', width: 150 },
  { title: '性别', dataIndex: 'gender', width: 100, align: 'center', slotName: 'gender' },
  { title: '账户', dataIndex: 'account', width: 120 },
  { title: '状态', width: 100, slotName: 'status', align: 'center' },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  { title: '地址', dataIndex: 'address', ellipsis: true, tooltip: true },
  { title: '操作', width: 200, slotName: 'action', align: 'center' }
]

const { tableData, getTableData, pagination, search, loading } = useTable((p) => baseAPI.getList(p))

function onClickName(record: T.ListItem) {
  Message.success(\`点击了\${ record.name } \`)
}

const onAdd = () => {
  Message.info('点击了新增')
}

const onMulDelete = () => {
  Message.error('点击了批量删除')
}

const onImport = () => {
  Message.warning('点击了导入')
}

const onDelete: PopconfirmInstance['onBeforeOk'] = () => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))
}

// 查看代码
const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: CodeJson, type: 'vue' }),
    width: '100%'
  })
}
<\/script>

<style lang="scss" scoped></style>

`,se=["src"],Ge=Q({name:"TableCustom2",__name:"index",setup(ie){const{data:_}=E({code:"status"}),c=Z({}),g=ee(()=>[{type:"input",label:"姓名",field:"name"},{type:"input",label:"手机",field:"phone",props:{maxLength:11}},{type:"select",label:"类型",field:"status",props:{options:_.value}},{type:"date-picker",label:"创建日期",field:"createTime"},{type:"input",label:"地址",field:"address"}]),f=[{title:"序号",width:66,align:"center",render:({rowIndex:n})=>m("span",{},n+1)},{title:"姓名",dataIndex:"name",width:120,render:({record:n})=>m(H,{onClick:()=>x(n)},{default:()=>n.name})},{title:"头像",width:80,align:"center",slotName:"avatar"},{title:"手机号",dataIndex:"phone",width:150},{title:"性别",dataIndex:"gender",width:100,align:"center",slotName:"gender"},{title:"账户",dataIndex:"account",width:120},{title:"状态",width:100,slotName:"status",align:"center"},{title:"创建时间",dataIndex:"createTime",ellipsis:!0,tooltip:!0,sortable:{sortDirections:["ascend","descend"]}},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"操作",width:200,slotName:"action",align:"center"}],{tableData:b,getTableData:y,pagination:h,search:u,loading:w}=q(n=>X.getList(n));function x(n){l.success(`点击了${n.name}`)}const C=()=>{l.info("点击了新增")},k=()=>{l.error("点击了批量删除")},I=()=>{l.warning("点击了导入")},G=()=>new Promise(n=>setTimeout(()=>n(!0),300)),v=()=>{K.open({title:"数据结构",content:()=>m(Y,{codeJson:ae,type:"vue"}),width:"100%"})};return(n,o)=>{const T=U,D=a("icon-plus"),i=a("a-button"),N=a("icon-delete"),L=a("icon-export"),V=a("icon-code"),P=a("a-avatar"),M=W,z=j,A=a("a-popconfirm"),F=a("a-space"),O=$,B=S,J=R;return oe(),te(J,null,{default:e(()=>[t(T,{modelValue:s(c),"onUpdate:modelValue":o[0]||(o[0]=r=>ne(c)?c.value=r:null),search:"",columns:s(g),"grid-item-props":{span:{xs:24,sm:12,md:8,lg:8,xl:6,xxl:6}},onSearch:s(u),onReset:s(u)},null,8,["modelValue","columns","onSearch","onReset"]),t(O,{"row-key":"id",loading:s(w),columns:f,data:s(b),scroll:{x:"100%",y:"100%",minWidth:1300},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:s(h),"disabled-column-keys":["序号","name"],onRefresh:s(y)},{"custom-title":e(()=>[t(i,{type:"primary",onClick:C},{icon:e(()=>[t(D)]),default:e(()=>[o[1]||(o[1]=p("span",null,"新增",-1))]),_:1,__:[1]}),t(i,{type:"primary",status:"danger",onClick:k},{icon:e(()=>[t(N)]),default:e(()=>[o[2]||(o[2]=p("span",null,"删除",-1))]),_:1,__:[2]}),t(i,{onClick:I},{icon:e(()=>[t(L)]),default:e(()=>[o[3]||(o[3]=p("span",null,"导入",-1))]),_:1,__:[3]}),t(i,{type:"primary",status:"warning",onClick:v},{icon:e(()=>[t(V)]),_:1})]),avatar:e(({record:r})=>[t(P,{size:28,shape:"circle"},{default:e(()=>[p("img",{src:r.avatar},null,8,se)]),_:2},1024)]),gender:e(({record:r})=>[t(M,{gender:r.gender},null,8,["gender"])]),status:e(({record:r})=>[t(z,{status:r.status},null,8,["status"])]),action:e(()=>[t(F,null,{default:e(()=>[t(i,{type:"primary",size:"mini"},{default:e(()=>o[4]||(o[4]=[d("修改",-1)])),_:1,__:[4]}),t(i,{size:"mini"},{default:e(()=>o[5]||(o[5]=[d("详情",-1)])),_:1,__:[5]}),t(A,{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:G},{default:e(()=>[t(i,{type:"primary",status:"danger",size:"mini"},{default:e(()=>o[6]||(o[6]=[d("删除",-1)])),_:1,__:[6]})]),_:1})]),_:1})]),_:1},8,["loading","data","pagination","onRefresh"]),t(B)]),_:1})}}});export{Ge as default};
