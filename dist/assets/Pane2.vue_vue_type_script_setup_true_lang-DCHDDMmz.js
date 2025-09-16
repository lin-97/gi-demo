import{_ as x}from"./index-BSd_cXen.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-9YK9MTJc.js";import{_ as k}from"./index.vue_vue_type_script_setup_true_lang-DJhiOHUY.js";import{b as v}from"./index-w68tMyEK.js";import{_ as A}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-CblanbWY.js";import"./index-ClEKbW6k.js";import{u as I}from"./useTable-Ddq4CYHh.js";import{e as B,ae as G,a as P,h as t,j as D,k as z,l as o,t as e,$ as r,y as S}from"./vue-N_SRJc_9.js";const K=`<template>\r
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
    align: 'center',\r
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>\r
  },\r
  {\r
    title: '姓名',\r
    dataIndex: 'name',\r
    width: 150\r
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
`,W=B({__name:"Pane2",setup(L){const s=[{title:"序号",width:68,align:"center",render:({rowIndex:n})=>e("span",null,[n+1])},{title:"姓名",dataIndex:"name",width:150},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"比例",width:68,align:"center",render:({record:n})=>e(t("a-progress"),{size:"mini",status:d(n.proportion),percent:n.proportion/100},null)},{title:"状态",width:100,align:"center",render:({record:n})=>e(A,{status:n.status},null)},{title:"操作",width:180,align:"center",render:()=>e(t("a-space"),null,{default:()=>[e(t("a-button"),{type:"primary",size:"mini"},{default:()=>[e(t("icon-edit"),null,null)]}),e(t("a-button"),{size:"mini"},{default:()=>[S("详情")]}),e(t("a-popconfirm"),{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:()=>f()},{default:()=>[e(t("a-button"),{type:"primary",status:"danger",size:"mini"},{default:()=>[e(t("icon-delete"),null,null)]})]})]})}],{tableData:a,getTableData:c,pagination:u,loading:p}=I(n=>v.getList(n));G(()=>{c()});function d(n){return n<30?"danger":n<60?"warning":"success"}const i=P([]),m=n=>{i.value=n},g=n=>{i.value=n?a.value.map(l=>l.id):[]};function f(){return new Promise(n=>setTimeout(()=>n(!0),300))}return(n,l)=>{const w=k,_=T,b=t("a-space"),y=t("a-row"),h=t("a-table"),C=x;return z(),D(C,null,{default:o(()=>[e(y,{justify:"end",align:"center",wrap:""},{default:o(()=>[e(b,{wrap:""},{default:o(()=>[e(w,{type:"import"}),e(_,{code:r(K)},null,8,["code"])]),_:1})]),_:1}),e(h,{class:"gi_table","row-key":"id",loading:r(p),bordered:{cell:!0},columns:s,data:r(a),scroll:{x:"100%",y:"100%",minWidth:1e3},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:r(u),onSelect:m,onSelectAll:g},null,8,["loading","data","pagination"])]),_:1})}}});export{W as _};
