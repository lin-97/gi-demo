import{_ as F}from"./index-Zwwi5Ftb.js";import{_ as $}from"./index-RNiDa7HD.js";import{_ as O}from"./GiTable-BfV5Lbdd.js";import{_ as V}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-BZ7_A1X3.js";import{_ as R}from"./GiCellGender.vue_vue_type_script_setup_true_lang-dcSAiGZA.js";import{_ as S}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import{_ as J}from"./index.vue_vue_type_script_setup_true_lang-ChZBomrs.js";import{_ as W}from"./GiForm-kVjMZKRM.js";import{b as j}from"./index-Bf4Op5cr.js";import"./index-D1V-3yfm.js";import{u as U}from"./useTable-CK5kmjjD.js";import"./dept-BHuwfU5l.js";import{u as X}from"./useDict-Btldr1OX.js";import"./role-B9mLd4Sk.js";import{aF as Y,a9 as i}from"./arco-DTGWTKTH.js";import{e as q,r as E,c as H,h as r,j as K,k as Q,l as t,t as e,a1 as o,Y as Z,X as u,y as p,m as ee}from"./vue-CNbhFRxi.js";import"./omit-D7h5lgcv.js";import"./index-DCPFMip6.js";import"./useBreakpoint-DHNpXxSV.js";import"./index-Df9C7UWN.js";const te=`<template>
  <GiPageLayout margin>
    <GiForm v-model="form" search :columns="searchColumns"
      :grid-item-props="{ span: { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 } }" @search="search" @reset="search">
    </GiForm>

    <GiTable row-key="id" :loading="loading" :columns="columns" :data="tableData"
      :scroll="{ x: '100%', y: '100%', minWidth: 1300 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :pagination="pagination" :disabled-column-keys="['序号', 'name']" @refresh="getTableData">
      <template #custom-title>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onMulDelete"></GiButton>
        <GiButton type="import" @click="onImport"></GiButton>
        <GiCodeButton :code="CodeJson"></GiCodeButton>
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
import type { PopconfirmInstance, TableInstance } from '@arco-design/web-vue'
import type * as T from '@/apis/person'
import type { ColumnItem } from '@/components/GiForm'
import { Link, Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/person'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import CodeJson from './index.vue?raw'

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
  Message.success(\`点击了\${record.name}\`)
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
<\/script>

<style lang="scss" scoped></style>
`,ne=["src"],Ge=q({name:"TableCustom2",__name:"index",setup(oe){const{data:_}=X({code:"status"}),l=E({}),g=H(()=>[{type:"input",label:"姓名",field:"name"},{type:"input",label:"手机",field:"phone",props:{maxLength:11}},{type:"select",label:"类型",field:"status",props:{options:_.value}},{type:"date-picker",label:"创建日期",field:"createTime"},{type:"input",label:"地址",field:"address"}]),f=[{title:"序号",width:66,align:"center",render:({rowIndex:n})=>u("span",{},n+1)},{title:"姓名",dataIndex:"name",width:120,render:({record:n})=>u(Y,{onClick:()=>x(n)},{default:()=>n.name})},{title:"头像",width:80,align:"center",slotName:"avatar"},{title:"手机号",dataIndex:"phone",width:150},{title:"性别",dataIndex:"gender",width:100,align:"center",slotName:"gender"},{title:"账户",dataIndex:"account",width:120},{title:"状态",width:100,slotName:"status",align:"center"},{title:"创建时间",dataIndex:"createTime",ellipsis:!0,tooltip:!0,sortable:{sortDirections:["ascend","descend"]}},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"操作",width:200,slotName:"action",align:"center"}],{tableData:h,getTableData:b,pagination:y,search:d,loading:w}=U(n=>j.getList(n));function x(n){i.success(`点击了${n.name}`)}const k=()=>{i.info("点击了新增")},C=()=>{i.error("点击了批量删除")},G=()=>{i.warning("点击了导入")},I=()=>new Promise(n=>setTimeout(()=>n(!0),300));return(n,a)=>{const T=W,m=J,v=S,D=r("a-avatar"),B=R,N=V,c=r("a-button"),L=r("a-popconfirm"),P=r("a-space"),M=O,z=$,A=F;return Q(),K(A,{margin:""},{default:t(()=>[e(T,{modelValue:o(l),"onUpdate:modelValue":a[0]||(a[0]=s=>Z(l)?l.value=s:null),search:"",columns:o(g),"grid-item-props":{span:{xs:24,sm:12,md:8,lg:8,xl:6,xxl:6}},onSearch:o(d),onReset:o(d)},null,8,["modelValue","columns","onSearch","onReset"]),e(M,{"row-key":"id",loading:o(w),columns:f,data:o(h),scroll:{x:"100%",y:"100%",minWidth:1300},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:o(y),"disabled-column-keys":["序号","name"],onRefresh:o(b)},{"custom-title":t(()=>[e(m,{type:"add",onClick:k}),e(m,{type:"delete",onClick:C}),e(m,{type:"import",onClick:G}),e(v,{code:o(te)},null,8,["code"])]),avatar:t(({record:s})=>[e(D,{size:28,shape:"circle"},{default:t(()=>[ee("img",{src:s.avatar},null,8,ne)]),_:2},1024)]),gender:t(({record:s})=>[e(B,{gender:s.gender},null,8,["gender"])]),status:t(({record:s})=>[e(N,{status:s.status},null,8,["status"])]),action:t(()=>[e(P,null,{default:t(()=>[e(c,{type:"primary",size:"mini"},{default:t(()=>a[1]||(a[1]=[p("修改",-1)])),_:1,__:[1]}),e(c,{size:"mini"},{default:t(()=>a[2]||(a[2]=[p("详情",-1)])),_:1,__:[2]}),e(L,{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:I},{default:t(()=>[e(c,{type:"primary",status:"danger",size:"mini"},{default:t(()=>a[3]||(a[3]=[p("删除",-1)])),_:1,__:[3]})]),_:1})]),_:1})]),_:1},8,["loading","data","pagination","onRefresh"]),e(z)]),_:1})}}});export{Ge as default};
