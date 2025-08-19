import{_ as V}from"./index-BBlithI6.js";import{_ as $}from"./index-K-cFMhdn.js";import{_ as F}from"./GiForm-Bg7N3DTt.js";import{_ as Y}from"./index.vue_vue_type_script_setup_true_lang-C85DDMn8.js";import{ac as M,a9 as B}from"./arco-CDZlpuCh.js";import{a as G,X as z,e as k,ac as W,h as l,j as C,k as I,a1 as a,l as r,t,C as X,r as x,m as b,y as O,Y as E}from"./vue-_iYK9Zi6.js";import{b as A}from"./index-BgXxCbGK.js";import{_ as q}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-Dsi2Injn.js";import"./index-Baw_ZB-J.js";import{u as J}from"./useTable-DmLxrJMz.js";import{g as H}from"./index-Xs-ya4BM.js";import"./omit-BrdpUbAP.js";import"./index-BPv1vC5v.js";import"./useBreakpoint-DAFsyWcD.js";const R=d=>e=>{const i=G();M.open({title:e.title||d.title,content:()=>z(d.component,{ref:n=>i.value=n,multiple:e.multiple,queryParams:e.queryParams,...d.componentProps}),width:"90%",modalStyle:{maxWidth:"1000px"},bodyStyle:{overflow:"hidden",height:"500px",padding:0},onBeforeOk:async()=>{if(!i.value?.getSelectedData)return B.warning("组件必须暴露getSelectedData方法"),!1;const n=i.value?.getSelectedData?.()||[];return n.length?e?.onBeforeOk?await e.onBeforeOk(n):(e.onOk?.(n),!0):(B.warning(d.tip||"请选择数据"),!1)}})},K=k({__name:"Tree",emits:["node-click"],setup(d,{emit:e}){const i=e,n=W("treeRef"),o=G(!1),p=G([]);(async()=>{try{o.value=!0;const c=await H();p.value=c.data,X(()=>{n.value?.expandAll()})}finally{o.value=!1}})();const u=()=>{i("node-click")};return(c,y)=>{const _=l("a-input-search"),f=l("a-tree"),h=l("a-scrollbar"),s=l("a-spin");return I(),C(s,{loading:a(o),class:"gi_full_column"},{default:r(()=>[t(_,{class:"gi_mb",placeholder:"请输入关键词","allow-clear":""}),t(h,{style:{height:"100%",overflow:"auto"},"outer-style":"flex: 1;overflow: hidden"},{default:r(()=>[t(f,{ref_key:"treeRef",ref:n,"show-line":"",size:"mini",data:a(p),"field-names":{key:"id",title:"name"},onSelect:u},null,8,["data"])]),_:1})]),_:1},8,["loading"])}}}),Q=k({__name:"index",props:{multiple:{type:Boolean,default:!1},queryParams:{default:()=>({})}},setup(d,{expose:e}){const i=d,n=x({username:""}),o=[{title:"序号",width:68,render:({rowIndex:s})=>t("span",null,[s+1])},{title:"姓名",dataIndex:"name",width:180},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"状态",width:100,align:"center",render:({record:s})=>t(q,{status:s.status},null)}],{loading:p,tableData:g,pagination:u,search:c,select:y,selectAll:_,getSelectedData:f}=J(s=>A.getList({...s,...n,...i.queryParams}),{immediate:!0}),h=()=>{n.username="",c()};return e({getSelectedData:f}),(s,m)=>{const N=l("a-input"),S=l("icon-search"),w=l("a-button"),D=l("icon-refresh"),L=l("a-space"),v=l("a-row"),U=l("a-table"),T=V;return I(),C(T,null,{left:r(()=>[t(K,{onNodeClick:a(c)},null,8,["onNodeClick"])]),default:r(()=>[t(v,{justify:"end"},{default:r(()=>[t(L,{wrap:""},{default:r(()=>[t(N,{modelValue:a(n).username,"onUpdate:modelValue":m[0]||(m[0]=j=>a(n).username=j),placeholder:"输入用户名搜索","allow-clear":"",style:{"max-width":"250px"}},null,8,["modelValue"]),t(w,{type:"primary",onClick:a(c)},{icon:r(()=>[t(S)]),default:r(()=>[m[1]||(m[1]=b("span",null,"查询",-1))]),_:1,__:[1]},8,["onClick"]),t(w,{onClick:h},{icon:r(()=>[t(D)]),default:r(()=>[m[2]||(m[2]=b("span",null,"重置",-1))]),_:1,__:[2]})]),_:1})]),_:1}),t(U,{class:"gi_table","row-key":"id",loading:a(p),bordered:{cell:!0},columns:o,data:a(g),scroll:{x:"100%",y:"100%"},"row-selection":{type:i.multiple?"checkbox":"radio",showCheckedAll:!0},pagination:a(u),onSelect:a(y),onSelectAll:a(_)},null,8,["loading","data","row-selection","pagination","onSelect","onSelectAll"])]),_:1})}}}),Z=k({__name:"index",props:{multiple:{type:Boolean,default:!1},queryParams:{default:()=>({})}},setup(d,{expose:e}){const i=d,n=x({username:""}),o=[{title:"序号",width:68,render:({rowIndex:s})=>t("span",null,[s+1," "])},{title:"姓名",dataIndex:"name",width:180},{title:"创建时间",dataIndex:"createTime",width:180},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"状态",width:100,align:"center",render:({record:s})=>t(q,{status:s.status},null)}],{loading:p,tableData:g,pagination:u,search:c,select:y,selectAll:_,getSelectedData:f}=J(s=>A.getList({...s,...n,...i.queryParams}),{immediate:!0}),h=()=>{n.username="",c()};return e({getSelectedData:f}),(s,m)=>{const N=l("a-input"),S=l("icon-search"),w=l("a-button"),D=l("icon-refresh"),L=l("a-space"),v=l("a-row"),U=l("a-table"),T=V;return I(),C(T,null,{default:r(()=>[t(v,{justify:"end"},{default:r(()=>[t(L,{wrap:""},{default:r(()=>[t(N,{modelValue:a(n).username,"onUpdate:modelValue":m[0]||(m[0]=j=>a(n).username=j),placeholder:"输入用户名搜索","allow-clear":"",style:{"max-width":"250px"}},null,8,["modelValue"]),t(w,{type:"primary",onClick:a(c)},{icon:r(()=>[t(S)]),default:r(()=>[m[1]||(m[1]=b("span",null,"查询",-1))]),_:1,__:[1]},8,["onClick"]),t(w,{onClick:h},{icon:r(()=>[t(D)]),default:r(()=>[m[2]||(m[2]=b("span",null,"重置",-1))]),_:1,__:[2]})]),_:1})]),_:1}),t(U,{class:"gi_table","row-key":"id",loading:a(p),bordered:{cell:!0},columns:o,data:a(g),scroll:{x:"100%",y:"100%"},"row-selection":{type:i.multiple?"checkbox":"radio",showCheckedAll:!0},pagination:a(u),onSelect:a(y),onSelectAll:a(_)},null,8,["loading","data","row-selection","pagination","onSelect","onSelectAll"])]),_:1})}}}),P=R({title:"选择用户",component:Z}),ee=R({title:"左树右表对话框示例",component:Q}),ne=`import type { ListItem as UserListItem } from '@/apis/person'\r
import { createSelectDialog } from '@/utils/createSelectDialog'\r
import TreeUserList from './TreeUserList/index.vue'\r
import UserList from './UserList/index.vue'\r
\r
/** 选择用户列表的对话框 */\r
export const selectUserListDialog = createSelectDialog<UserListItem[]>({\r
  title: '选择用户',\r
  component: UserList\r
})\r
\r
/** 左树右表的对话框 */\r
export const selectTreeUserListDialog = createSelectDialog<UserListItem[]>({\r
  title: '左树右表对话框示例',\r
  component: TreeUserList\r
})\r
`,te=`<template>\r
  <GiPageLayout margin :body-style="{ overflowY: 'auto' }">\r
    <a-row align="center" class="gi_mb">\r
      <a-alert style="margin-right: 8px; flex: 1">通过函数调用表格弹窗</a-alert>\r
      <GiCodeButton :code="CodeJson"></GiCodeButton>\r
    </a-row>\r
\r
    <GiForm v-model="form" :columns="columns">\r
    </GiForm>\r
\r
    <a-alert type="normal" class="gi_mb">通过以下方式可以快速构建表格选择弹窗</a-alert>\r
    <GiCodeView :code-json="DialogCodeJson"></GiCodeView>\r
  </GiPageLayout>\r
</template>\r
\r
<script setup lang="ts">\r
import type { ColumnItem } from '@/components/GiForm'\r
import { selectTreeUserListDialog, selectUserListDialog } from '@/components/dialog'\r
import DialogCodeJson from '@/components/dialog/index.ts?raw'\r
import CodeJson from './index.vue?raw'\r
\r
const form = reactive({\r
  radioId: '',\r
  radioName: '',\r
  chekboxId: '',\r
  chekboxName: '',\r
  asyncId: '',\r
  asyncName: '',\r
  demoId: '',\r
  demoName: ''\r
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
  },\r
  {\r
    type: 'input-search',\r
    label: '左树右表',\r
    field: 'demoId',\r
    fieldName: 'demoName',\r
    props: {\r
      allowClear: true,\r
      onSearch: () => {\r
        selectTreeUserListDialog({\r
          multiple: true,\r
          onOk: (data) => {\r
            form.demoId = data.map((i) => i.id).join(',')\r
            form.demoName = data.map((i) => i.name).join(',')\r
          }\r
        })\r
      },\r
      onClear: () => {\r
        form.demoId = ''\r
        form.demoName = ''\r
      }\r
    }\r
  }\r
] as ColumnItem[])\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,ye=k({__name:"index",setup(d){const e=x({radioId:"",radioName:"",chekboxId:"",chekboxName:"",asyncId:"",asyncName:"",demoId:"",demoName:""}),i=x([{type:"input-search",label:"单选",field:"radioId",fieldName:"radioName",props:{allowClear:!0,onSearch:()=>{P({onOk:n=>{e.radioId=n[0].id,e.radioName=n[0].name}})},onClear:()=>{e.radioId="",e.radioName=""}}},{type:"input-search",label:"多选",field:"chekboxId",fieldName:"chekboxName",props:{allowClear:!0,onSearch:()=>{P({multiple:!0,onOk:n=>{e.chekboxId=n.map(o=>o.id).join(","),e.chekboxName=n.map(o=>o.name).join(",")}})},onClear:()=>{e.chekboxId="",e.chekboxName=""}}},{type:"input-search",label:"异步",field:"asyncId",fieldName:"asyncName",props:{allowClear:!0,onSearch:()=>{P({multiple:!0,onBeforeOk:async n=>(await new Promise(o=>setTimeout(()=>o(!0),1e3)),e.asyncId=n.map(o=>o.id).join(","),e.asyncName=n.map(o=>o.name).join(","),!0)})},onClear:()=>{e.asyncId="",e.asyncName=""}}},{type:"input-search",label:"左树右表",field:"demoId",fieldName:"demoName",props:{allowClear:!0,onSearch:()=>{ee({multiple:!0,onOk:n=>{e.demoId=n.map(o=>o.id).join(","),e.demoName=n.map(o=>o.name).join(",")}})},onClear:()=>{e.demoId="",e.demoName=""}}}]);return(n,o)=>{const p=l("a-alert"),g=Y,u=l("a-row"),c=F,y=$,_=V;return I(),C(_,{margin:"","body-style":{overflowY:"auto"}},{default:r(()=>[t(u,{align:"center",class:"gi_mb"},{default:r(()=>[t(p,{style:{"margin-right":"8px",flex:"1"}},{default:r(()=>o[1]||(o[1]=[O("通过函数调用表格弹窗",-1)])),_:1,__:[1]}),t(g,{code:a(te)},null,8,["code"])]),_:1}),t(c,{modelValue:a(e),"onUpdate:modelValue":o[0]||(o[0]=f=>E(e)?e.value=f:null),columns:a(i)},null,8,["modelValue","columns"]),t(p,{type:"normal",class:"gi_mb"},{default:r(()=>o[2]||(o[2]=[O("通过以下方式可以快速构建表格选择弹窗",-1)])),_:1,__:[2]}),t(y,{"code-json":a(ne)},null,8,["code-json"])]),_:1})}}});export{ye as default};
