import{_ as I}from"./GiTable-BfV5Lbdd.js";import{_ as N}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-BZ7_A1X3.js";import{_ as O}from"./GiCellGender.vue_vue_type_script_setup_true_lang-dcSAiGZA.js";import{_ as F}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import{_ as z}from"./index.vue_vue_type_script_setup_true_lang-ChZBomrs.js";import{b as A}from"./index-Bf4Op5cr.js";import"./index-D1V-3yfm.js";import{u as $}from"./useTable-CK5kmjjD.js";import{e as K,aa as M,h as l,j as V,k as E,a1 as s,X as p,l as n,t as e,y as c,m as j}from"./vue-CNbhFRxi.js";import{aF as J,a9 as r}from"./arco-DTGWTKTH.js";const W=`<template>
  <GiPageLayout :margin="true">
    <template #left>
      <Tree @node-click="TableRef?.search" />
    </template>
    <template #header>
      <GiForm v-model="form" search :columns="columns"
        :grid-item-props="{ span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 8, xxl: 8 } }" @search="TableRef?.search"
        @reset="TableRef?.search">
      </GiForm>
    </template>
    <Table ref="TableRef" />
  </GiPageLayout>
</template>

<script lang="ts" setup>
import { useSearchColumns } from '../_hooks/useSearchColumns'
import Table from '../components/Table.vue'
import Tree from '../components/Tree.vue'

defineOptions({ name: 'LayoutDemo1' })
const TableRef = useTemplateRef('TableRef')
const form = reactive({})

const { columns } = useSearchColumns()
<\/script>
`,X=`<template>
  <GiPageLayout :margin="true" :header-style="{ padding: 0, borderBottom: 'none' }">
    <template #left>
      <Tree @node-click="TableRef?.search" />
    </template>
    <template #header>
      <a-tabs v-model:active-key="activeKey" size="large" hide-content @change="handleChange">
        <a-tab-pane key="1" title="页签1"></a-tab-pane>
        <a-tab-pane key="2" title="页签2"></a-tab-pane>
        <a-tab-pane key="3" title="页签3"></a-tab-pane>
        <template #extra>
          <a-button>返回</a-button>
        </template>
      </a-tabs>
    </template>
    <Table ref="TableRef" />
  </GiPageLayout>
</template>

<script lang="ts" setup>
import Table from '../components/Table.vue'
import Tree from '../components/Tree.vue'

defineOptions({ name: 'LayoutDemo2' })
const TableRef = useTemplateRef('TableRef')

const activeKey = ref(1)
const handleChange = () => {
  TableRef.value?.search()
}
<\/script>
`,q=`<template>
  <GiPageLayout :margin="true">
    <template #header>
      <GiForm v-model="form" search :columns="columns"
        :grid-item-props="{ span: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 6 } }" :suffix="false"
        @search="TableRef?.search" @reset="TableRef?.search">
      </GiForm>
    </template>
    <Table ref="TableRef" />
  </GiPageLayout>
</template>

<script lang="ts" setup>
import { useSearchColumns } from '../_hooks/useSearchColumns'
import Table from '../components/Table.vue'

defineOptions({ name: 'LayoutDemo3' })
const TableRef = useTemplateRef('TableRef')
const form = reactive({})

const { columns } = useSearchColumns()
<\/script>
`,H=`<template>
  <GiPageLayout :margin="true">
    <Table />
  </GiPageLayout>
</template>

<script lang="ts" setup>
import Table from '../components/Table.vue'

defineOptions({ name: 'LayoutDemo4' })
<\/script>
`,Q=`<template>
  <GiPageLayout :margin="true" :header-style="{ padding: 0, borderBottom: 'none' }" :body-style="{ padding: 0 }">
    <template #header>
      <a-tabs v-model:active-key="activeKey" size="large" hide-content @change="TableRef?.search">
        <a-tab-pane key="1" title="页签1"></a-tab-pane>
        <a-tab-pane key="2" title="页签2"></a-tab-pane>
        <a-tab-pane key="3" title="页签3"></a-tab-pane>
      </a-tabs>
    </template>

    <GiPageLayout collapsed>
      <template #header>
        <GiForm v-model="form" search :columns="columns"
          :grid-item-props="{ span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 8, xxl: 8 } }" @search="TableRef?.search"
          @reset="TableRef?.search">
        </GiForm>
      </template>
      <template #left>
        <Tree @node-click="TableRef?.search" />
      </template>
      <Table ref="TableRef" />
    </GiPageLayout>
  </GiPageLayout>
</template>

<script lang="ts" setup>
import { useSearchColumns } from '../_hooks/useSearchColumns'
import Table from '../components/Table.vue'
import Tree from '../components/Tree.vue'

defineOptions({ name: 'LayoutDemo1' })
const TableRef = useTemplateRef('TableRef')
const form = reactive({})
const activeKey = ref(1)

const { columns } = useSearchColumns()
<\/script>
`,U=["src"],ce=K({__name:"Table",setup(Y,{expose:u}){const d=M(),f={"/layout/demo1":W,"/layout/demo2":X,"/layout/demo3":q,"/layout/demo4":H,"/layout/demo5":Q}[d.path],b=[{title:"序号",width:66,align:"center",render:({rowIndex:t})=>p("span",{},t+1)},{title:"姓名",dataIndex:"name",width:120,render:({record:t})=>p(J,{onClick:()=>C(t)},{default:()=>t.name})},{title:"头像",width:80,align:"center",slotName:"avatar"},{title:"手机号",dataIndex:"phone",width:150},{title:"性别",dataIndex:"gender",width:100,align:"center",slotName:"gender"},{title:"账户",dataIndex:"account",width:120},{title:"状态",width:100,slotName:"status",align:"center"},{title:"创建时间",dataIndex:"createTime",ellipsis:!0,tooltip:!0,sortable:{sortDirections:["ascend","descend"]}},{title:"地址",dataIndex:"address",ellipsis:!0,tooltip:!0},{title:"操作",width:200,slotName:"action",align:"center"}],{tableData:g,getTableData:_,pagination:h,search:T,loading:y}=$(t=>A.getList(t));function C(t){r.success(`点击了${t.name}`)}const R=()=>{r.info("点击了新增")},v=()=>{r.error("点击了批量删除")},k=()=>{r.warning("点击了导入")},x=()=>new Promise(t=>setTimeout(()=>t(!0),300));return u({search:T}),(t,a)=>{const m=z,G=F,L=l("a-avatar"),D=O,P=N,i=l("a-button"),w=l("a-popconfirm"),S=l("a-space"),B=I;return E(),V(B,{"row-key":"id",loading:s(y),columns:b,data:s(g),scroll:{x:"100%",y:"100%",minWidth:1300},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:s(h),"disabled-column-keys":["序号","name"],onRefresh:s(_)},{"custom-title":n(()=>[e(m,{type:"add",onClick:R}),e(m,{type:"delete",onClick:v}),e(m,{type:"import",onClick:k}),e(G,{code:s(f)},null,8,["code"])]),avatar:n(({record:o})=>[e(L,{size:28,shape:"circle"},{default:n(()=>[j("img",{src:o.avatar},null,8,U)]),_:2},1024)]),gender:n(({record:o})=>[e(D,{gender:o.gender},null,8,["gender"])]),status:n(({record:o})=>[e(P,{status:o.status},null,8,["status"])]),action:n(()=>[e(S,null,{default:n(()=>[e(i,{type:"primary",size:"mini"},{default:n(()=>a[0]||(a[0]=[c("修改",-1)])),_:1,__:[0]}),e(i,{size:"mini"},{default:n(()=>a[1]||(a[1]=[c("详情",-1)])),_:1,__:[1]}),e(w,{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:x},{default:n(()=>[e(i,{type:"primary",status:"danger",size:"mini"},{default:n(()=>a[2]||(a[2]=[c("删除",-1)])),_:1,__:[2]})]),_:1})]),_:1})]),_:1},8,["loading","data","pagination","onRefresh"])}}});export{ce as _};
