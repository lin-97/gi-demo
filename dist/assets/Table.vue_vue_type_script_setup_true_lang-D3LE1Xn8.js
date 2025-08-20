import{_ as I}from"./GiTable-7F5V-zMF.js";import{_ as N}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-Dsi2Injn.js";import{_ as O}from"./GiCellGender.vue_vue_type_script_setup_true_lang-CrlnTWU_.js";import{_ as z}from"./index.vue_vue_type_script_setup_true_lang-_BqyVsU-.js";import{_ as F}from"./index.vue_vue_type_script_setup_true_lang-BjQXGsBK.js";import{b as A}from"./index-Db42EMQL.js";import"./index-KLtyvs0j.js";import{u as $}from"./useTable-BNajLZvY.js";import{e as K,aa as M,h as s,j as V,k as E,a1 as o,X as p,l as n,t as e,y as c,m as j}from"./vue-_iYK9Zi6.js";import{ah as J,a9 as l}from"./arco-CDZlpuCh.js";const W=`<template>\r
  <GiPageLayout :margin="true">\r
    <template #header>\r
      <GiForm v-model="form" search :columns="columns"\r
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
import { useSearchColumns } from '../_hooks/useSearchColumns'\r
import Table from '../components/Table.vue'\r
import Tree from '../components/Tree.vue'\r
\r
defineOptions({ name: 'LayoutDemo1' })\r
const TableRef = useTemplateRef('TableRef')\r
const form = reactive({})\r
\r
const { columns } = useSearchColumns()\r
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
      <GiForm v-model="form" search :columns="columns"\r
        :grid-item-props="{ span: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 6 } }" :suffix="false"\r
        @search="TableRef?.search" @reset="TableRef?.search">\r
      </GiForm>\r
    </template>\r
    <Table ref="TableRef" />\r
  </GiPageLayout>\r
</template>\r
\r
<script lang="ts" setup>\r
import { useSearchColumns } from '../_hooks/useSearchColumns'\r
import Table from '../components/Table.vue'\r
\r
defineOptions({ name: 'LayoutDemo3' })\r
const TableRef = useTemplateRef('TableRef')\r
const form = reactive({})\r
\r
const { columns } = useSearchColumns()\r
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
`,Q=`<template>\r
  <GiPageLayout :margin="true" :header-style="{ padding: 0, borderBottom: 'none' }" :body-style="{ padding: 0 }">\r
    <template #header>\r
      <a-tabs v-model:active-key="activeKey" size="large" hide-content @change="TableRef?.search">\r
        <a-tab-pane key="1" title="页签1"></a-tab-pane>\r
        <a-tab-pane key="2" title="页签2"></a-tab-pane>\r
        <a-tab-pane key="3" title="页签3"></a-tab-pane>\r
      </a-tabs>\r
    </template>\r
\r
    <GiPageLayout collapsed>\r
      <template #header>\r
        <GiForm v-model="form" search :columns="columns"\r
          :grid-item-props="{ span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 8, xxl: 8 } }" @search="TableRef?.search"\r
          @reset="TableRef?.search">\r
        </GiForm>\r
      </template>\r
      <template #left>\r
        <Tree @node-click="TableRef?.search" />\r
      </template>\r
      <Table ref="TableRef" />\r
    </GiPageLayout>\r
  </GiPageLayout>\r
</template>\r
\r
<script lang="ts" setup>\r
import { useSearchColumns } from '../_hooks/useSearchColumns'\r
import Table from '../components/Table.vue'\r
import Tree from '../components/Tree.vue'\r
\r
defineOptions({ name: 'LayoutDemo1' })\r
const TableRef = useTemplateRef('TableRef')\r
const form = reactive({})\r
const activeKey = ref(1)\r
\r
const { columns } = useSearchColumns()\r
<\/script>\r
`,U=["src"],ce=K({__name:"Table",setup(Y,{expose:u}){const d=M(),f={"/layout/demo1":W,"/layout/demo2":X,"/layout/demo3":q,"/layout/demo4":H,"/layout/demo5":Q}[d.path],b=[{title:"序号",width:66,align:"center",render:({rowIndex:t})=>p("span",{},t+1)},{title:"姓名",dataIndex:"name",width:120,render:({record:t})=>p(J,{onClick:()=>C(t)},{default:()=>t.name})},{title:"头像",width:80,align:"center",slotName:"avatar"},{title:"手机号",dataIndex:"phone",width:150},{title:"性别",dataIndex:"gender",width:100,align:"center",slotName:"gender"},{title:"账户",dataIndex:"account",width:120},{title:"状态",width:100,slotName:"status",align:"center"},{title:"创建时间",dataIndex:"createTime",ellipsis:!0,tooltip:!0,sortable:{sortDirections:["ascend","descend"]}},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"操作",width:200,slotName:"action",align:"center"}],{tableData:g,getTableData:h,pagination:_,search:T,loading:y}=$(t=>A.getList(t));function C(t){l.success(`点击了${t.name}`)}const R=()=>{l.info("点击了新增")},v=()=>{l.error("点击了批量删除")},k=()=>{l.warning("点击了导入")},x=()=>new Promise(t=>setTimeout(()=>t(!0),300));return u({search:T}),(t,a)=>{const m=F,G=z,L=s("a-avatar"),D=O,P=N,i=s("a-button"),w=s("a-popconfirm"),S=s("a-space"),B=I;return E(),V(B,{"row-key":"id",loading:o(y),columns:b,data:o(g),scroll:{x:"100%",y:"100%",minWidth:1300},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:o(_),"disabled-column-keys":["序号","name"],onRefresh:o(h)},{"custom-title":n(()=>[e(m,{type:"add",onClick:R}),e(m,{type:"delete",onClick:v}),e(m,{type:"import",onClick:k}),e(G,{code:o(f)},null,8,["code"])]),avatar:n(({record:r})=>[e(L,{size:28,shape:"circle"},{default:n(()=>[j("img",{src:r.avatar},null,8,U)]),_:2},1024)]),gender:n(({record:r})=>[e(D,{gender:r.gender},null,8,["gender"])]),status:n(({record:r})=>[e(P,{status:r.status},null,8,["status"])]),action:n(()=>[e(S,null,{default:n(()=>[e(i,{type:"primary",size:"mini"},{default:n(()=>a[0]||(a[0]=[c("修改",-1)])),_:1,__:[0]}),e(i,{size:"mini"},{default:n(()=>a[1]||(a[1]=[c("详情",-1)])),_:1,__:[1]}),e(w,{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:x},{default:n(()=>[e(i,{type:"primary",status:"danger",size:"mini"},{default:n(()=>a[2]||(a[2]=[c("删除",-1)])),_:1,__:[2]})]),_:1})]),_:1})]),_:1},8,["loading","data","pagination","onRefresh"])}}});export{ce as _};
