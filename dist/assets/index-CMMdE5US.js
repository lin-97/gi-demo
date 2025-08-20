import{_ as F}from"./index-CdINuvFd.js";import{_ as $}from"./index-B91Iyv8r.js";import{_ as O}from"./GiTable-7F5V-zMF.js";import{_ as V}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-Dsi2Injn.js";import{_ as R}from"./GiCellGender.vue_vue_type_script_setup_true_lang-CrlnTWU_.js";import{_ as S}from"./index.vue_vue_type_script_setup_true_lang-_BqyVsU-.js";import{_ as J}from"./index.vue_vue_type_script_setup_true_lang-BjQXGsBK.js";import{_ as W}from"./GiForm-DoGeJofC.js";import{b as j}from"./index-Db42EMQL.js";import"./index-KLtyvs0j.js";import{u as U}from"./useTable-BNajLZvY.js";import"./dept-CLQo6noT.js";import{u as X}from"./useDict-DGWEZGTt.js";import"./role-BfJ0SwWm.js";import{ah as Y,a9 as s}from"./arco-CDZlpuCh.js";import{e as q,r as E,c as H,h as i,j as K,k as Q,l as t,t as e,a1 as r,Y as Z,X as u,y as p,m as ee}from"./vue-_iYK9Zi6.js";import"./omit-CXnAKo7h.js";import"./index-QvHo1Qjg.js";import"./useBreakpoint-DAFsyWcD.js";import"./index-BPv1vC5v.js";const te=`<template>\r
  <GiPageLayout margin>\r
    <GiForm v-model="form" search :columns="searchColumns"\r
      :grid-item-props="{ span: { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 } }" @search="search" @reset="search">\r
    </GiForm>\r
\r
    <GiTable row-key="id" :loading="loading" :columns="columns" :data="tableData"\r
      :scroll="{ x: '100%', y: '100%', minWidth: 1300 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"\r
      :pagination="pagination" :disabled-column-keys="['序号', 'name']" @refresh="getTableData">\r
      <template #custom-title>\r
        <GiButton type="add" @click="onAdd"></GiButton>\r
        <GiButton type="delete" @click="onMulDelete"></GiButton>\r
        <GiButton type="import" @click="onImport"></GiButton>\r
        <GiCodeButton :code="CodeJson"></GiCodeButton>\r
      </template>\r
      <template #avatar="{ record }">\r
        <a-avatar :size="28" shape="circle">\r
          <img :src="record.avatar" />\r
        </a-avatar>\r
      </template>\r
      <template #gender="{ record }">\r
        <GiCellGender :gender="record.gender"></GiCellGender>\r
      </template>\r
      <template #status="{ record }">\r
        <GiCellStatus :status="record.status"></GiCellStatus>\r
      </template>\r
      <template #action>\r
        <a-space>\r
          <a-button type="primary" size="mini">修改</a-button>\r
          <a-button size="mini">详情</a-button>\r
          <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete">\r
            <a-button type="primary" status="danger" size="mini">删除</a-button>\r
          </a-popconfirm>\r
        </a-space>\r
      </template>\r
    </GiTable>\r
\r
    <GiFooter></GiFooter>\r
  </GiPageLayout>\r
</template>\r
\r
<script setup lang="ts">\r
import type { PopconfirmInstance, TableInstance } from '@arco-design/web-vue'\r
import type * as T from '@/apis/person'\r
import type { ColumnItem } from '@/components/GiForm'\r
import { Link, Message } from '@arco-design/web-vue'\r
import { baseAPI } from '@/apis/person'\r
import { useTable } from '@/hooks'\r
import { useDict } from '@/hooks/app'\r
import CodeJson from './index.vue?raw'\r
\r
defineOptions({ name: 'TableCustom2' })\r
const { data: statusOptions } = useDict({ code: 'status' })\r
const form = reactive({})\r
\r
const searchColumns = computed(() => [\r
  {\r
    type: 'input',\r
    label: '姓名',\r
    field: 'name'\r
  },\r
  {\r
    type: 'input',\r
    label: '手机',\r
    field: 'phone',\r
    props: {\r
      maxLength: 11\r
    }\r
  },\r
  {\r
    type: 'select',\r
    label: '类型',\r
    field: 'status',\r
    props: {\r
      options: statusOptions.value\r
    }\r
  },\r
  {\r
    type: 'date-picker',\r
    label: '创建日期',\r
    field: 'createTime'\r
  },\r
  {\r
    type: 'input',\r
    label: '地址',\r
    field: 'address'\r
  }\r
] as ColumnItem[])\r
\r
const columns: TableInstance['columns'] = [\r
  { title: '序号', width: 66, align: 'center', render: ({ rowIndex }) => h('span', {}, rowIndex + 1) },\r
  {\r
    title: '姓名',\r
    dataIndex: 'name',\r
    width: 120,\r
    render: ({ record }) =>\r
      h(Link, { onClick: () => onClickName(record as T.ListItem) }, { default: () => record.name })\r
  },\r
  { title: '头像', width: 80, align: 'center', slotName: 'avatar' },\r
  { title: '手机号', dataIndex: 'phone', width: 150 },\r
  { title: '性别', dataIndex: 'gender', width: 100, align: 'center', slotName: 'gender' },\r
  { title: '账户', dataIndex: 'account', width: 120 },\r
  { title: '状态', width: 100, slotName: 'status', align: 'center' },\r
  {\r
    title: '创建时间',\r
    dataIndex: 'createTime',\r
    ellipsis: true,\r
    tooltip: true,\r
    sortable: {\r
      sortDirections: ['ascend', 'descend']\r
    }\r
  },\r
  { title: '地址', dataIndex: 'address', ellipsis: true, tooltip: true },\r
  { title: '操作', width: 200, slotName: 'action', align: 'center' }\r
]\r
\r
const { tableData, getTableData, pagination, search, loading } = useTable((p) => baseAPI.getList(p))\r
\r
function onClickName(record: T.ListItem) {\r
  Message.success(\`点击了\${record.name}\`)\r
}\r
\r
const onAdd = () => {\r
  Message.info('点击了新增')\r
}\r
\r
const onMulDelete = () => {\r
  Message.error('点击了批量删除')\r
}\r
\r
const onImport = () => {\r
  Message.warning('点击了导入')\r
}\r
\r
const onDelete: PopconfirmInstance['onBeforeOk'] = () => {\r
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))\r
}\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,ne=["src"],Ge=q({name:"TableCustom2",__name:"index",setup(re){const{data:_}=X({code:"status"}),l=E({}),g=H(()=>[{type:"input",label:"姓名",field:"name"},{type:"input",label:"手机",field:"phone",props:{maxLength:11}},{type:"select",label:"类型",field:"status",props:{options:_.value}},{type:"date-picker",label:"创建日期",field:"createTime"},{type:"input",label:"地址",field:"address"}]),f=[{title:"序号",width:66,align:"center",render:({rowIndex:n})=>u("span",{},n+1)},{title:"姓名",dataIndex:"name",width:120,render:({record:n})=>u(Y,{onClick:()=>x(n)},{default:()=>n.name})},{title:"头像",width:80,align:"center",slotName:"avatar"},{title:"手机号",dataIndex:"phone",width:150},{title:"性别",dataIndex:"gender",width:100,align:"center",slotName:"gender"},{title:"账户",dataIndex:"account",width:120},{title:"状态",width:100,slotName:"status",align:"center"},{title:"创建时间",dataIndex:"createTime",ellipsis:!0,tooltip:!0,sortable:{sortDirections:["ascend","descend"]}},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"操作",width:200,slotName:"action",align:"center"}],{tableData:h,getTableData:b,pagination:y,search:d,loading:w}=U(n=>j.getList(n));function x(n){s.success(`点击了${n.name}`)}const k=()=>{s.info("点击了新增")},C=()=>{s.error("点击了批量删除")},G=()=>{s.warning("点击了导入")},I=()=>new Promise(n=>setTimeout(()=>n(!0),300));return(n,o)=>{const T=W,m=J,v=S,D=i("a-avatar"),B=R,N=V,c=i("a-button"),L=i("a-popconfirm"),P=i("a-space"),M=O,z=$,A=F;return Q(),K(A,{margin:""},{default:t(()=>[e(T,{modelValue:r(l),"onUpdate:modelValue":o[0]||(o[0]=a=>Z(l)?l.value=a:null),search:"",columns:r(g),"grid-item-props":{span:{xs:24,sm:12,md:8,lg:8,xl:6,xxl:6}},onSearch:r(d),onReset:r(d)},null,8,["modelValue","columns","onSearch","onReset"]),e(M,{"row-key":"id",loading:r(w),columns:f,data:r(h),scroll:{x:"100%",y:"100%",minWidth:1300},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:r(y),"disabled-column-keys":["序号","name"],onRefresh:r(b)},{"custom-title":t(()=>[e(m,{type:"add",onClick:k}),e(m,{type:"delete",onClick:C}),e(m,{type:"import",onClick:G}),e(v,{code:r(te)},null,8,["code"])]),avatar:t(({record:a})=>[e(D,{size:28,shape:"circle"},{default:t(()=>[ee("img",{src:a.avatar},null,8,ne)]),_:2},1024)]),gender:t(({record:a})=>[e(B,{gender:a.gender},null,8,["gender"])]),status:t(({record:a})=>[e(N,{status:a.status},null,8,["status"])]),action:t(()=>[e(P,null,{default:t(()=>[e(c,{type:"primary",size:"mini"},{default:t(()=>o[1]||(o[1]=[p("修改",-1)])),_:1,__:[1]}),e(c,{size:"mini"},{default:t(()=>o[2]||(o[2]=[p("详情",-1)])),_:1,__:[2]}),e(L,{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:I},{default:t(()=>[e(c,{type:"primary",status:"danger",size:"mini"},{default:t(()=>o[3]||(o[3]=[p("删除",-1)])),_:1,__:[3]})]),_:1})]),_:1})]),_:1},8,["loading","data","pagination","onRefresh"]),e(z)]),_:1})}}});export{Ge as default};
