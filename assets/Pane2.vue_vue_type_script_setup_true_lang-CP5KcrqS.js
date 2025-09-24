import{_ as x}from"./index-Zwwi5Ftb.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import{_ as k}from"./index.vue_vue_type_script_setup_true_lang-ChZBomrs.js";import{b as v}from"./index-Bf4Op5cr.js";import{_ as A}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-BZ7_A1X3.js";import"./index-D1V-3yfm.js";import{u as I}from"./useTable-CK5kmjjD.js";import{e as B,ae as G,a as P,h as t,j as D,k as z,l as a,t as e,a1 as o,y as S}from"./vue-CNbhFRxi.js";const K=`<template>
  <GiPageLayout>
    <a-row justify="end" align="center" wrap>
      <a-space wrap>
        <GiButton type="import"></GiButton>
        <GiCodeButton :code="CodeJson"></GiCodeButton>
      </a-space>
    </a-row>

    <a-table class="gi_table" row-key="id" :loading="loading" :bordered="{ cell: true }" :columns="columns"
      :data="tableData" :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :pagination="pagination" @select="select"
      @select-all="selectAll">
    </a-table>
  </GiPageLayout>
</template>

<script lang="tsx" setup>
import type { TableColumnData, TableInstance } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/person'
import GiCellStatus from '@/components/GiCell/GiCellStatus.vue'
import { useTable } from '@/hooks'
import CodeJson from './Pane2.vue?raw'

const columns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    align: 'center',
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180
  },
  {
    title: '地址',
    dataIndex: 'address',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '比例',
    width: 68,
    align: 'center',
    render: ({ record }) => (
      <a-progress size="mini" status={getProportionColor(record.proportion)} percent={record.proportion / 100} />
    )
  },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: ({ record }) => {
      return <GiCellStatus status={record.status} />
    }
  },
  {
    title: '操作',
    width: 180,
    align: 'center',
    render: () => (
      <a-space>
        <a-button type="primary" size="mini">
          <icon-edit></icon-edit>
        </a-button>
        <a-button size="mini">详情</a-button>
        <a-popconfirm type="warning" content="您确定要删除该项吗?" onBeforeOk={() => onDelete()}>
          <a-button type="primary" status="danger" size="mini">
            <icon-delete />
          </a-button>
        </a-popconfirm>
      </a-space>
    )
  }
]

const { tableData, getTableData, pagination, loading } = useTable((p) => baseAPI.getList(p))

onActivated(() => {
  getTableData()
})

// 比例进度条颜色
function getProportionColor(proportion: number) {
  if (proportion < 30) return 'danger'
  if (proportion < 60) return 'warning'
  return 'success'
}

// 勾选
const selectRowKeys = ref<(string | number)[]>([])
const select: TableInstance['onSelect'] = (rowKeys) => {
  selectRowKeys.value = rowKeys
}

// 全选
const selectAll: TableInstance['onSelectAll'] = (checked) => {
  selectRowKeys.value = checked ? tableData.value.map((i) => i.id) : []
}

// 删除
function onDelete() {
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))
}
<\/script>

<style lang="scss" scoped></style>
`,W=B({__name:"Pane2",setup(L){const s=[{title:"序号",width:68,align:"center",render:({rowIndex:n})=>e("span",null,[n+1])},{title:"姓名",dataIndex:"name",width:150},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"比例",width:68,align:"center",render:({record:n})=>e(t("a-progress"),{size:"mini",status:d(n.proportion),percent:n.proportion/100},null)},{title:"状态",width:100,align:"center",render:({record:n})=>e(A,{status:n.status},null)},{title:"操作",width:180,align:"center",render:()=>e(t("a-space"),null,{default:()=>[e(t("a-button"),{type:"primary",size:"mini"},{default:()=>[e(t("icon-edit"),null,null)]}),e(t("a-button"),{size:"mini"},{default:()=>[S("详情")]}),e(t("a-popconfirm"),{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:()=>f()},{default:()=>[e(t("a-button"),{type:"primary",status:"danger",size:"mini"},{default:()=>[e(t("icon-delete"),null,null)]})]})]})}],{tableData:r,getTableData:c,pagination:u,loading:p}=I(n=>v.getList(n));G(()=>{c()});function d(n){return n<30?"danger":n<60?"warning":"success"}const i=P([]),m=n=>{i.value=n},g=n=>{i.value=n?r.value.map(l=>l.id):[]};function f(){return new Promise(n=>setTimeout(()=>n(!0),300))}return(n,l)=>{const w=k,_=T,b=t("a-space"),y=t("a-row"),h=t("a-table"),C=x;return z(),D(C,null,{default:a(()=>[e(y,{justify:"end",align:"center",wrap:""},{default:a(()=>[e(b,{wrap:""},{default:a(()=>[e(w,{type:"import"}),e(_,{code:o(K)},null,8,["code"])]),_:1})]),_:1}),e(h,{class:"gi_table","row-key":"id",loading:o(p),bordered:{cell:!0},columns:s,data:o(r),scroll:{x:"100%",y:"100%",minWidth:1e3},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:o(u),onSelect:m,onSelectAll:g},null,8,["loading","data","pagination"])]),_:1})}}});export{W as _};
