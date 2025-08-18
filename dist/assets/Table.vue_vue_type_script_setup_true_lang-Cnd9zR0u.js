import{_ as B}from"./GiTable-CidmdBfK.js";import{_ as O}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-Dsi2Injn.js";import{_ as F}from"./GiCellGender.vue_vue_type_script_setup_true_lang-CrlnTWU_.js";import{_ as z}from"./index.vue_vue_type_script_setup_true_lang-8NeouZCX.js";import{_ as A}from"./index.vue_vue_type_script_setup_true_lang-DNvpXvPA.js";import{b as $}from"./index-CAe3hmMw.js";import"./index-DBvjnvFZ.js";import{u as M}from"./useTable-g4NRrMBs.js";import{e as V,aa as E,h as l,j as K,k as j,a1 as o,X as c,l as t,t as e,y as p,m as J}from"./vue-_iYK9Zi6.js";import{ah as S,a9 as s}from"./arco-CDZlpuCh.js";const W=`<template>\r
  <GiPageLayout :margin="true">\r
    <template #header>\r
      <GiForm v-model="form" search :columns="searchColumns"\r
        :grid-item-props="{ span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 8, xxl: 8 } }" @search="TableRef?.search"\r
        @reset="TableRef?.search">\r
      </GiForm>\r
    </template>\r
    <template #left>\r
      <Tree @node-click="TableRef?.search" />\r
    </template>\r
    <Table ref="TableRef" />\r
  </GiPageLayout>\r
</template>\r
\r
<script lang="ts" setup>\r
import type { ColumnItem } from '@/components/GiForm'\r
import Table from '../components/Table.vue'\r
import Tree from '../components/Tree.vue'\r
\r
defineOptions({ name: 'LayoutDemo1' })\r
const TableRef = useTemplateRef('TableRef')\r
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
    label: '性别',\r
    field: 'gender',\r
    props: {\r
      options: [\r
        { label: '男', value: 1 },\r
        { label: '女', value: 0 }\r
      ]\r
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
<\/script>\r
`,X=`<template>\r
  <GiPageLayout :margin="true" :header-style="{ padding: 0, borderBottom: 'none' }">\r
    <template #left>\r
      <Tree @node-click="TableRef?.search" />\r
    </template>\r
    <template #header>\r
      <a-tabs v-model:active-key="activeKey" size="large" hide-content @change="handleChange">\r
        <a-tab-pane key="1" title="页签1"></a-tab-pane>\r
        <a-tab-pane key="2" title="页签2"></a-tab-pane>\r
        <a-tab-pane key="3" title="页签3"></a-tab-pane>\r
        <template #extra>\r
          <a-button>返回</a-button>\r
        </template>\r
      </a-tabs>\r
    </template>\r
    <Table ref="TableRef" />\r
  </GiPageLayout>\r
</template>\r
\r
<script lang="ts" setup>\r
import Table from '../components/Table.vue'\r
import Tree from '../components/Tree.vue'\r
\r
defineOptions({ name: 'LayoutDemo2' })\r
const TableRef = useTemplateRef('TableRef')\r
\r
const activeKey = ref(1)\r
const handleChange = () => {\r
  TableRef.value?.search()\r
}\r
<\/script>\r
`,q=`<template>\r
  <GiPageLayout :margin="true">\r
    <template #header>\r
      <GiForm v-model="form" search :columns="searchColumns"\r
        :grid-item-props="{ span: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 6 } }" :suffix="false"\r
        @search="TableRef?.search" @reset="TableRef?.search">\r
      </GiForm>\r
    </template>\r
    <Table ref="TableRef" />\r
  </GiPageLayout>\r
</template>\r
\r
<script lang="ts" setup>\r
import type { ColumnItem } from '@/components/GiForm'\r
import Table from '../components/Table.vue'\r
\r
defineOptions({ name: 'LayoutDemo3' })\r
const TableRef = useTemplateRef('TableRef')\r
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
    label: '性别',\r
    field: 'gender',\r
    props: {\r
      options: [\r
        { label: '男', value: 1 },\r
        { label: '女', value: 0 }\r
      ]\r
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
<\/script>\r
`,H=`<template>\r
  <GiPageLayout :margin="true">\r
    <Table />\r
  </GiPageLayout>\r
</template>\r
\r
<script lang="ts" setup>\r
import Table from '../components/Table.vue'\r
\r
defineOptions({ name: 'LayoutDemo4' })\r
<\/script>\r
`,Q=["src"],me=V({__name:"Table",setup(U,{expose:d}){const u=E(),f={"/layout/demo1":W,"/layout/demo2":X,"/layout/demo3":q,"/layout/demo4":H}[u.path],b=[{title:"序号",width:66,align:"center",render:({rowIndex:n})=>c("span",{},n+1)},{title:"姓名",dataIndex:"name",width:120,render:({record:n})=>c(S,{onClick:()=>C(n)},{default:()=>n.name})},{title:"头像",width:80,align:"center",slotName:"avatar"},{title:"手机号",dataIndex:"phone",width:150},{title:"性别",dataIndex:"gender",width:100,align:"center",slotName:"gender"},{title:"账户",dataIndex:"account",width:120},{title:"状态",width:100,slotName:"status",align:"center"},{title:"创建时间",dataIndex:"createTime",ellipsis:!0,tooltip:!0,sortable:{sortDirections:["ascend","descend"]}},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"操作",width:200,slotName:"action",align:"center"}],{tableData:_,getTableData:g,pagination:y,search:h,loading:T}=M(n=>$.getList(n));function C(n){s.success(`点击了${n.name}`)}const v=()=>{s.info("点击了新增")},x=()=>{s.error("点击了批量删除")},k=()=>{s.warning("点击了导入")},R=()=>new Promise(n=>setTimeout(()=>n(!0),300));return d({search:h}),(n,r)=>{const i=A,G=z,L=l("a-avatar"),w=F,D=O,m=l("a-button"),I=l("a-popconfirm"),P=l("a-space"),N=B;return j(),K(N,{"row-key":"id",loading:o(T),columns:b,data:o(_),scroll:{x:"100%",y:"100%",minWidth:1300},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:o(y),"disabled-column-keys":["序号","name"],onRefresh:o(g)},{"custom-title":t(()=>[e(i,{type:"add",onClick:v}),e(i,{type:"delete",onClick:x}),e(i,{type:"import",onClick:k}),e(G,{code:o(f)},null,8,["code"])]),avatar:t(({record:a})=>[e(L,{size:28,shape:"circle"},{default:t(()=>[J("img",{src:a.avatar},null,8,Q)]),_:2},1024)]),gender:t(({record:a})=>[e(w,{gender:a.gender},null,8,["gender"])]),status:t(({record:a})=>[e(D,{status:a.status},null,8,["status"])]),action:t(()=>[e(P,null,{default:t(()=>[e(m,{type:"primary",size:"mini"},{default:t(()=>r[0]||(r[0]=[p("修改",-1)])),_:1,__:[0]}),e(m,{size:"mini"},{default:t(()=>r[1]||(r[1]=[p("详情",-1)])),_:1,__:[1]}),e(I,{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:R},{default:t(()=>[e(m,{type:"primary",status:"danger",size:"mini"},{default:t(()=>r[2]||(r[2]=[p("删除",-1)])),_:1,__:[2]})]),_:1})]),_:1})]),_:1},8,["loading","data","pagination","onRefresh"])}}});export{me as _};
