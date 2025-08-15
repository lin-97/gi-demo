import{_ as k}from"./index-3av5scz5.js";import{_ as T}from"./index-DVUDzxhH.js";import{b as P}from"./index-obgcgijJ.js";import{_ as A}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-BZwOLfRP.js";import"./index-nN1PoSln.js";import{u as I}from"./useTable-DZeM0WUV.js";import{ac as D}from"./arco-Buj77_8l.js";import{e as z,ae as B,a as G,h as n,j as S,k as K,l as o,t,y as c,a1 as r}from"./vue-sr_Z8kjA.js";const J=`
<template>
  <GiPageLayout>
    <a-row justify="end" align="center" wrap>
      <a-space wrap>
        <a-button type="primary">导出</a-button>
        <a-button type="primary" status="warning" @click="onViewCode">
          <template #icon><icon-code /></template>
        </a-button>
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
import { Modal } from '@arco-design/web-vue'
import Pane2Json from './code/pane2-json'
import { useTable } from '@/hooks'
import { baseAPI } from '@/apis/person'
import GiCellStatus from '@/components/GiCell/GiCellStatus.vue'

const columns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>
  },
  {
    title: '姓名',
    dataIndex: 'name'
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

// 查看代码
const onViewCode = () => {
  Modal.open({
    title: '查看代码',
    content: () => <gi-code-view type="vue" codeJson={Pane2Json}></gi-code-view>,
    fullscreen: true
  })
}
<\/script>

<style lang="scss" scoped></style>

`,$=z({__name:"Pane2",setup(L){const u=[{title:"序号",width:68,render:({rowIndex:e})=>t("span",null,[e+1])},{title:"姓名",dataIndex:"name"},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"比例",width:68,align:"center",render:({record:e})=>t(n("a-progress"),{size:"mini",status:g(e.proportion),percent:e.proportion/100},null)},{title:"状态",width:100,align:"center",render:({record:e})=>t(A,{status:e.status},null)},{title:"操作",width:180,align:"center",render:()=>t(n("a-space"),null,{default:()=>[t(n("a-button"),{type:"primary",size:"mini"},{default:()=>[t(n("icon-edit"),null,null)]}),t(n("a-button"),{size:"mini"},{default:()=>[c("详情")]}),t(n("a-popconfirm"),{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:()=>_()},{default:()=>[t(n("a-button"),{type:"primary",status:"danger",size:"mini"},{default:()=>[t(n("icon-delete"),null,null)]})]})]})}],{tableData:i,getTableData:p,pagination:d,loading:m}=I(e=>P.getList(e));B(()=>{p()});function g(e){return e<30?"danger":e<60?"warning":"success"}const l=G([]),b=e=>{l.value=e},w=e=>{l.value=e?i.value.map(a=>a.id):[]};function _(){return new Promise(e=>setTimeout(()=>e(!0),300))}const f=()=>{D.open({title:"查看代码",content:()=>t(T,{type:"vue",codeJson:J},null),fullscreen:!0})};return(e,a)=>{const s=n("a-button"),y=n("icon-code"),h=n("a-space"),C=n("a-row"),v=n("a-table"),x=k;return K(),S(x,null,{default:o(()=>[t(C,{justify:"end",align:"center",wrap:""},{default:o(()=>[t(h,{wrap:""},{default:o(()=>[t(s,{type:"primary"},{default:o(()=>a[0]||(a[0]=[c("导出",-1)])),_:1,__:[0]}),t(s,{type:"primary",status:"warning",onClick:f},{icon:o(()=>[t(y)]),_:1})]),_:1})]),_:1}),t(v,{class:"gi_table","row-key":"id",loading:r(m),bordered:{cell:!0},columns:u,data:r(i),scroll:{x:"100%",y:"100%",minWidth:1e3},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:r(d),onSelect:b,onSelectAll:w},null,8,["loading","data","pagination"])]),_:1})}}});export{$ as _};
