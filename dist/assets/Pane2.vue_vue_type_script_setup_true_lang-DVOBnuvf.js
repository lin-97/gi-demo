import{_ as x}from"./index-DVMIff0n.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-8NeouZCX.js";import{_ as k}from"./index.vue_vue_type_script_setup_true_lang-DNvpXvPA.js";import{b as v}from"./index-CAe3hmMw.js";import{_ as A}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-Dsi2Injn.js";import"./index-DBvjnvFZ.js";import{u as I}from"./useTable-g4NRrMBs.js";import{e as B,ae as G,a as P,h as t,j as D,k as z,l as o,t as n,a1 as r,y as S}from"./vue-_iYK9Zi6.js";const K=`<template>\r
  <GiPageLayout>\r
    <a-row justify="end" align="center" wrap>\r
      <a-space wrap>\r
        <GiButton type="import"></GiButton>\r
        <GiCodeButton :code="CodeJson"></GiCodeButton>\r
      </a-space>\r
    </a-row>\r
\r
    <a-table class="gi_table" row-key="id" :loading="loading" :bordered="{ cell: true }" :columns="columns"\r
      :data="tableData" :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"\r
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :pagination="pagination" @select="select"\r
      @select-all="selectAll">\r
    </a-table>\r
  </GiPageLayout>\r
</template>\r
\r
<script lang="tsx" setup>\r
import type { TableColumnData, TableInstance } from '@arco-design/web-vue'\r
import { baseAPI } from '@/apis/person'\r
import GiCellStatus from '@/components/GiCell/GiCellStatus.vue'\r
import { useTable } from '@/hooks'\r
import CodeJson from './Pane2.vue?raw'\r
\r
const columns: TableColumnData[] = [\r
  {\r
    title: '序号',\r
    width: 68,\r
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>\r
  },\r
  {\r
    title: '姓名',\r
    dataIndex: 'name'\r
  },\r
  {\r
    title: '创建时间',\r
    dataIndex: 'createTime',\r
    width: 180\r
  },\r
  {\r
    title: '地址',\r
    dataIndex: 'address',\r
    ellipsis: true,\r
    tooltip: true\r
  },\r
  {\r
    title: '比例',\r
    width: 68,\r
    align: 'center',\r
    render: ({ record }) => (\r
      <a-progress size="mini" status={getProportionColor(record.proportion)} percent={record.proportion / 100} />\r
    )\r
  },\r
  {\r
    title: '状态',\r
    width: 100,\r
    align: 'center',\r
    render: ({ record }) => {\r
      return <GiCellStatus status={record.status} />\r
    }\r
  },\r
  {\r
    title: '操作',\r
    width: 180,\r
    align: 'center',\r
    render: () => (\r
      <a-space>\r
        <a-button type="primary" size="mini">\r
          <icon-edit></icon-edit>\r
        </a-button>\r
        <a-button size="mini">详情</a-button>\r
        <a-popconfirm type="warning" content="您确定要删除该项吗?" onBeforeOk={() => onDelete()}>\r
          <a-button type="primary" status="danger" size="mini">\r
            <icon-delete />\r
          </a-button>\r
        </a-popconfirm>\r
      </a-space>\r
    )\r
  }\r
]\r
\r
const { tableData, getTableData, pagination, loading } = useTable((p) => baseAPI.getList(p))\r
\r
onActivated(() => {\r
  getTableData()\r
})\r
\r
// 比例进度条颜色\r
function getProportionColor(proportion: number) {\r
  if (proportion < 30) return 'danger'\r
  if (proportion < 60) return 'warning'\r
  return 'success'\r
}\r
\r
// 勾选\r
const selectRowKeys = ref<(string | number)[]>([])\r
const select: TableInstance['onSelect'] = (rowKeys) => {\r
  selectRowKeys.value = rowKeys\r
}\r
\r
// 全选\r
const selectAll: TableInstance['onSelectAll'] = (checked) => {\r
  selectRowKeys.value = checked ? tableData.value.map((i) => i.id) : []\r
}\r
\r
// 删除\r
function onDelete() {\r
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))\r
}\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,W=B({__name:"Pane2",setup(L){const s=[{title:"序号",width:68,render:({rowIndex:e})=>n("span",null,[e+1])},{title:"姓名",dataIndex:"name"},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"比例",width:68,align:"center",render:({record:e})=>n(t("a-progress"),{size:"mini",status:d(e.proportion),percent:e.proportion/100},null)},{title:"状态",width:100,align:"center",render:({record:e})=>n(A,{status:e.status},null)},{title:"操作",width:180,align:"center",render:()=>n(t("a-space"),null,{default:()=>[n(t("a-button"),{type:"primary",size:"mini"},{default:()=>[n(t("icon-edit"),null,null)]}),n(t("a-button"),{size:"mini"},{default:()=>[S("详情")]}),n(t("a-popconfirm"),{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:()=>f()},{default:()=>[n(t("a-button"),{type:"primary",status:"danger",size:"mini"},{default:()=>[n(t("icon-delete"),null,null)]})]})]})}],{tableData:a,getTableData:c,pagination:u,loading:p}=I(e=>v.getList(e));G(()=>{c()});function d(e){return e<30?"danger":e<60?"warning":"success"}const i=P([]),m=e=>{i.value=e},g=e=>{i.value=e?a.value.map(l=>l.id):[]};function f(){return new Promise(e=>setTimeout(()=>e(!0),300))}return(e,l)=>{const _=k,b=T,w=t("a-space"),y=t("a-row"),h=t("a-table"),C=x;return z(),D(C,null,{default:o(()=>[n(y,{justify:"end",align:"center",wrap:""},{default:o(()=>[n(w,{wrap:""},{default:o(()=>[n(_,{type:"import"}),n(b,{code:r(K)},null,8,["code"])]),_:1})]),_:1}),n(h,{class:"gi_table","row-key":"id",loading:r(p),bordered:{cell:!0},columns:s,data:r(a),scroll:{x:"100%",y:"100%",minWidth:1e3},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:r(u),onSelect:m,onSelectAll:g},null,8,["loading","data","pagination"])]),_:1})}}});export{W as _};
