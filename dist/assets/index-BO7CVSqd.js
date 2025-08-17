import{_ as O}from"./index-fZXLvPzL.js";import{_ as L}from"./GiForm-D4Jyl49a.js";import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-PbJTTqMm.js";import{ac as U,a9 as b}from"./arco-CDZlpuCh.js";import{a as T,X as A,e as w,r as g,h as t,n as q,k as N,t as a,l,a1 as o,m as k,j as F,y as $,Y as J}from"./vue-_iYK9Zi6.js";import{b as Y}from"./index-DAPriupv.js";import{_ as M}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-Dsi2Injn.js";import"./index-C9S3_Aih.js";import{u as R}from"./useTable-Dl0-SMrE.js";import"./omit-CufsPAL-.js";import"./index-BPv1vC5v.js";import"./index-9ZZs9fan.js";import"./useBreakpoint-DAFsyWcD.js";const E=i=>e=>{const s=T();U.open({title:e.title||i.title,content:()=>A(i.component,{ref:n=>s.value=n,multiple:e.multiple,queryParams:e.queryParams,...i.componentProps}),width:"90%",modalStyle:{maxWidth:"1000px"},onBeforeOk:async()=>{if(!s.value?.getSelectedData)return b.warning("组件必须暴露getSelectedData方法"),!1;const n=s.value?.getSelectedData?.()||[];return n.length?e?.onBeforeOk?await e.onBeforeOk(n):(e.onOk?.(n),!0):(b.warning(i.tip||"请选择数据"),!1)}})},W=w({__name:"index",props:{multiple:{type:Boolean,default:!1},queryParams:{default:()=>({})}},setup(i,{expose:e}){const s=i,n=g({username:""}),r=[{title:"序号",width:68,render:({rowIndex:m})=>a("span",null,[m+1," "])},{title:"姓名",dataIndex:"name",width:180},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"状态",width:100,align:"center",render:({record:m})=>a(M,{status:m.status},null)}],{loading:u,tableData:p,pagination:f,search:d,select:_,selectAll:y,getSelectedData:I}=R(m=>Y.getList({...m,...n,...s.queryParams}),{immediate:!0}),C=()=>{n.username="",d()};return e({getSelectedData:I}),(m,c)=>{const S=t("a-input"),v=t("icon-search"),x=t("a-button"),B=t("icon-refresh"),P=t("a-space"),D=t("a-row"),j=t("a-table");return N(),q("div",null,[a(D,{justify:"end"},{default:l(()=>[a(P,{wrap:""},{default:l(()=>[a(S,{modelValue:o(n).username,"onUpdate:modelValue":c[0]||(c[0]=G=>o(n).username=G),placeholder:"输入用户名搜索","allow-clear":"",style:{"max-width":"250px"}},null,8,["modelValue"]),a(x,{type:"primary",onClick:o(d)},{icon:l(()=>[a(v)]),default:l(()=>[c[1]||(c[1]=k("span",null,"查询",-1))]),_:1,__:[1]},8,["onClick"]),a(x,{onClick:C},{icon:l(()=>[a(B)]),default:l(()=>[c[2]||(c[2]=k("span",null,"重置",-1))]),_:1,__:[2]})]),_:1})]),_:1}),a(j,{class:"gi_table","row-key":"id",loading:o(u),bordered:{cell:!0},columns:r,data:o(p),scroll:{x:"100%",y:"500px"},"row-selection":{type:s.multiple?"checkbox":"radio",showCheckedAll:!0},pagination:o(f),onSelect:o(_),onSelectAll:o(y)},null,8,["loading","data","row-selection","pagination","onSelect","onSelectAll"])])}}}),h=E({title:"选择用户",component:W}),X=`<template>\r
  <GiPageLayout margin :body-style="{ overflowY: 'auto' }">\r
    <a-row align="center" class="gi_mb">\r
      <a-alert style="margin-right: 8px; flex: 1">通过函数调用表格弹窗</a-alert>\r
      <GiCodeButton :code="CodeJson"></GiCodeButton>\r
    </a-row>\r
\r
    <GiForm v-model="form" :columns="columns">\r
    </GiForm>\r
  </GiPageLayout>\r
</template>\r
\r
<script setup lang="ts">\r
import type { ColumnItem } from '@/components/GiForm'\r
import { selectUserListDialog } from '@/components/dialog'\r
import CodeJson from './index.vue?raw'\r
\r
const form = reactive({\r
  radioId: '',\r
  radioName: '',\r
  chekboxId: '',\r
  chekboxName: '',\r
  asyncId: '',\r
  asyncName: ''\r
})\r
\r
const columns = reactive([\r
  {\r
    type: 'input-search',\r
    label: '单选',\r
    field: 'radioId',\r
    fieldName: 'radioName',\r
    props: {\r
      allowClear: true,\r
      onSearch: () => {\r
        selectUserListDialog({\r
          onOk: (data) => {\r
            form.radioId = data[0].id\r
            form.radioName = data[0].name\r
          }\r
        })\r
      },\r
      onClear: () => {\r
        form.radioId = ''\r
        form.radioName = ''\r
      }\r
    }\r
  },\r
  {\r
    type: 'input-search',\r
    label: '多选',\r
    field: 'chekboxId',\r
    fieldName: 'chekboxName',\r
    props: {\r
      allowClear: true,\r
      onSearch: () => {\r
        selectUserListDialog({\r
          multiple: true,\r
          onOk: (data) => {\r
            form.chekboxId = data.map((i) => i.id).join(',')\r
            form.chekboxName = data.map((i) => i.name).join(',')\r
          }\r
        })\r
      },\r
      onClear: () => {\r
        form.chekboxId = ''\r
        form.chekboxName = ''\r
      }\r
    }\r
  },\r
  {\r
    type: 'input-search',\r
    label: '异步',\r
    field: 'asyncId',\r
    fieldName: 'asyncName',\r
    props: {\r
      allowClear: true,\r
      onSearch: () => {\r
        selectUserListDialog({\r
          multiple: true,\r
          onBeforeOk: async (data) => {\r
            await new Promise((reslove) => setTimeout(() => reslove(true), 1000))\r
            form.asyncId = data.map((i) => i.id).join(',')\r
            form.asyncName = data.map((i) => i.name).join(',')\r
            return true\r
          }\r
        })\r
      },\r
      onClear: () => {\r
        form.asyncId = ''\r
        form.asyncName = ''\r
      }\r
    }\r
  }\r
] as ColumnItem[])\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,ie=w({__name:"index",setup(i){const e=g({radioId:"",radioName:"",chekboxId:"",chekboxName:"",asyncId:"",asyncName:""}),s=g([{type:"input-search",label:"单选",field:"radioId",fieldName:"radioName",props:{allowClear:!0,onSearch:()=>{h({onOk:n=>{e.radioId=n[0].id,e.radioName=n[0].name}})},onClear:()=>{e.radioId="",e.radioName=""}}},{type:"input-search",label:"多选",field:"chekboxId",fieldName:"chekboxName",props:{allowClear:!0,onSearch:()=>{h({multiple:!0,onOk:n=>{e.chekboxId=n.map(r=>r.id).join(","),e.chekboxName=n.map(r=>r.name).join(",")}})},onClear:()=>{e.chekboxId="",e.chekboxName=""}}},{type:"input-search",label:"异步",field:"asyncId",fieldName:"asyncName",props:{allowClear:!0,onSearch:()=>{h({multiple:!0,onBeforeOk:async n=>(await new Promise(r=>setTimeout(()=>r(!0),1e3)),e.asyncId=n.map(r=>r.id).join(","),e.asyncName=n.map(r=>r.name).join(","),!0)})},onClear:()=>{e.asyncId="",e.asyncName=""}}}]);return(n,r)=>{const u=t("a-alert"),p=V,f=t("a-row"),d=L,_=O;return N(),F(_,{margin:"","body-style":{overflowY:"auto"}},{default:l(()=>[a(f,{align:"center",class:"gi_mb"},{default:l(()=>[a(u,{style:{"margin-right":"8px",flex:"1"}},{default:l(()=>r[1]||(r[1]=[$("通过函数调用表格弹窗",-1)])),_:1,__:[1]}),a(p,{code:o(X)},null,8,["code"])]),_:1}),a(d,{modelValue:o(e),"onUpdate:modelValue":r[0]||(r[0]=y=>J(e)?e.value=y:null),columns:o(s)},null,8,["modelValue","columns"])]),_:1})}}});export{ie as default};
