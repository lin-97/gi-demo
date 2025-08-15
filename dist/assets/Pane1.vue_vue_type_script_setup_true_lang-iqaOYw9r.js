import{_ as Q}from"./index-3av5scz5.js";import{_ as Y}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-BZwOLfRP.js";import{u as Z}from"./index-Dru6jS8c.js";import{b as f}from"./index-obgcgijJ.js";import{_ as ee}from"./index-DVUDzxhH.js";import{c as te}from"./index-nN1PoSln.js";import{u as oe}from"./useTable-DZeM0WUV.js";import"./dept-GYyz1j5K.js";import{u as ae}from"./useDict-CBcDm_sa.js";import"./role-ikVY_VFV.js";import ne from"./index-f0vZd8sw.js";import{e as le,a7 as se,r as ie,ae as re,h as a,j as ce,k as pe,l as t,t as e,y as p,a1 as n,z as ue,X as me}from"./vue-sr_Z8kjA.js";import{a9 as g,ad as de}from"./arco-Buj77_8l.js";const _e=`
<template>
  <GiPageLayout>
    <template #left>
      <CateTree placeholder="请输入搜索关键词" @node-click="pagination.onChange(1)"></CateTree>
    </template>

    <a-row justify="space-between">
      <a-space wrap>
        <a-button type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="primary" status="danger" @click="onMulDelete">
          <template #icon><icon-delete /></template>
          <template #default>删除</template>
        </a-button>
        <a-button type="primary" status="success" @click="onExport">
          <template #icon><icon-export /></template>
        </a-button>
        <a-button type="primary" status="warning" @click="onViewCode">
          <template #icon><icon-code /></template>
        </a-button>
      </a-space>

      <a-space wrap>
        <a-select v-model="form.status" class="gi_select_input" :options="options" placeholder="请选择"
          allow-clear></a-select>
        <a-input-group>
          <a-input v-model="form.name" placeholder="请输入搜索关键词" allow-clear> </a-input>
          <a-button type="primary" @click="getTableData">
            <icon-search />
          </a-button>
        </a-input-group>
        <a-button type="primary" @click="getTableData">
          <template #icon><icon-refresh /></template>
        </a-button>
      </a-space>
    </a-row>

    <a-table class="gi_table" row-key="id" :loading="loading" :bordered="{ cell: true }" :data="tableData"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :pagination="pagination" :selected-keys="selectedKeys" @select="select" @select-all="selectAll">
      <template #columns>
        <a-table-column title="序号" :width="68">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="姓名" data-index="name"></a-table-column>
        <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
        <a-table-column title="比例" :width="200">
          <template #cell="{ record }">
            <a-progress :status="getProportionColor(record.proportion)" :percent="record.proportion / 100" />
          </template>
        </a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellStatus :status="record.status"></GiCellStatus>
          </template>
        </a-table-column>
        <a-table-column title="创建时间" data-index="createTime" :width="180"></a-table-column>
        <a-table-column title="操作" :width="200" align="center" :fixed="fixed">
          <template #cell="{ record }">
            <a-space>
              <a-button type="primary" size="mini" @click="onEdit">修改</a-button>
              <a-button size="mini" @click="onDetail(record)">详情</a-button>
              <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete(record)">
                <a-button type="primary" status="danger" size="mini">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { Drawer, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import CateTree from './CateTree/index.vue'
import Pane1Json from './code/pane1-json'
import { useTable } from '@/hooks'
import { baseAPI } from '@/apis/person'
import type * as T from '@/apis/person'
import { useDict } from '@/hooks/app'
import GiCodeView from '@/components/GiCodeView/index.vue'
import { useTabsStore } from '@/stores'

const { width } = useWindowSize()
const router = useRouter()
const { setTabTitle } = useTabsStore()

const { data: options } = useDict({ code: 'status' })
const form = reactive({
  name: '',
  status: ''
})

// 这里使用了表格hooks：useTable, 节省了大量代码
const { loading, tableData, getTableData, pagination, selectedKeys, select, selectAll, handleDelete, fixed } = useTable(
  (page) => baseAPI.getList({ ...form, ...page }),
  { immediate: false, formatResult: (data) => data.map((i) => ({ ...i, isEdit: false })) }
)

// 比例进度条颜色
const getProportionColor = (proportion: number) => {
  if (proportion < 30) return 'danger'
  if (proportion < 60) return 'warning'
  return 'success'
}

onActivated(() => {
  getTableData()
})

const onAdd = () => {
  router.push({ path: '/data/form' })
}

const onEdit = async () => {
  await router.push({ path: '/data/form', query: { id: 'ID123456' } })
  setTabTitle('编辑')
}

const onDetail = (item: T.ListItem) => {
  router.push({ name: 'DataDetailId', params: { id: item.id } })
}

// 删除
const onDelete = (item: T.ListItem) => {
  return handleDelete(() => baseAPI.delete({ ids: [item.id] }), { content: \`是否删除-\${item.name}?\`, showModal: false })
}

// 批量删除
const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择删除项！')
  }
  handleDelete(() => baseAPI.delete({ ids: selectedKeys.value as string[] }), { successTip: '批量删除成功！' })
}

const onExport = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请勾选数据')
  }
  Message.success('点击了导出')
}

const onViewCode = () => {
  Drawer.open({
    title: '查看代码',
    content: () => h(GiCodeView, { codeJson: Pane1Json, type: 'vue' }),
    width: width.value < 500 ? '100%' : 800
  })
}
<\/script>

<style lang="scss" scoped></style>
`,Se=le({__name:"Pane1",setup(fe){const{width:y}=Z(),m=se(),{setTabTitle:h}=te(),{data:k}=ae({code:"status"}),c=ie({name:"",status:""}),{loading:C,tableData:D,getTableData:d,pagination:b,selectedKeys:u,select:T,selectAll:x,handleDelete:w,fixed:v}=oe(s=>f.getList({...c,...s}),{immediate:!1,formatResult:s=>s.map(o=>({...o,isEdit:!1}))}),A=s=>s<30?"danger":s<60?"warning":"success";re(()=>{d()});const P=()=>{m.push({path:"/data/form"})},S=async()=>{await m.push({path:"/data/form",query:{id:"ID123456"}}),h("编辑")},V=s=>{m.push({name:"DataDetailId",params:{id:s.id}})},I=s=>w(()=>f.delete({ids:[s.id]}),{content:`是否删除-${s.name}?`,showModal:!1}),z=()=>{if(!u.value.length)return g.warning("请选择删除项！");w(()=>f.delete({ids:u.value}),{successTip:"批量删除成功！"})},M=()=>{if(!u.value.length)return g.warning("请勾选数据");g.success("点击了导出")},G=()=>{de.open({title:"查看代码",content:()=>me(ee,{codeJson:_e,type:"vue"}),width:y.value<500?"100%":800})};return(s,o)=>{const E=a("icon-plus"),i=a("a-button"),L=a("icon-delete"),K=a("icon-export"),$=a("icon-code"),_=a("a-space"),J=a("a-select"),W=a("a-input"),j=a("icon-search"),B=a("a-input-group"),R=a("icon-refresh"),N=a("a-row"),r=a("a-table-column"),q=a("a-progress"),O=Y,U=a("a-popconfirm"),X=a("a-table"),F=Q;return pe(),ce(F,null,{left:t(()=>[e(ne,{placeholder:"请输入搜索关键词",onNodeClick:o[0]||(o[0]=l=>n(b).onChange(1))})]),default:t(()=>[e(N,{justify:"space-between"},{default:t(()=>[e(_,{wrap:""},{default:t(()=>[e(i,{type:"primary",onClick:P},{icon:t(()=>[e(E)]),_:1}),e(i,{type:"primary",status:"danger",onClick:z},{icon:t(()=>[e(L)]),default:t(()=>o[3]||(o[3]=[p("删除",-1)])),_:1}),e(i,{type:"primary",status:"success",onClick:M},{icon:t(()=>[e(K)]),_:1}),e(i,{type:"primary",status:"warning",onClick:G},{icon:t(()=>[e($)]),_:1})]),_:1}),e(_,{wrap:""},{default:t(()=>[e(J,{modelValue:n(c).status,"onUpdate:modelValue":o[1]||(o[1]=l=>n(c).status=l),class:"gi_select_input",options:n(k),placeholder:"请选择","allow-clear":""},null,8,["modelValue","options"]),e(B,null,{default:t(()=>[e(W,{modelValue:n(c).name,"onUpdate:modelValue":o[2]||(o[2]=l=>n(c).name=l),placeholder:"请输入搜索关键词","allow-clear":""},null,8,["modelValue"]),e(i,{type:"primary",onClick:n(d)},{default:t(()=>[e(j)]),_:1},8,["onClick"])]),_:1}),e(i,{type:"primary",onClick:n(d)},{icon:t(()=>[e(R)]),_:1},8,["onClick"])]),_:1})]),_:1}),e(X,{class:"gi_table","row-key":"id",loading:n(C),bordered:{cell:!0},data:n(D),scroll:{x:"100%",y:"100%",minWidth:1e3},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:n(b),"selected-keys":n(u),onSelect:n(T),onSelectAll:n(x)},{columns:t(()=>[e(r,{title:"序号",width:68},{cell:t(l=>[p(ue(l.rowIndex+1),1)]),_:1}),e(r,{title:"姓名","data-index":"name"}),e(r,{title:"地址","data-index":"address",ellipsis:"",tooltip:""}),e(r,{title:"比例",width:200},{cell:t(({record:l})=>[e(q,{status:A(l.proportion),percent:l.proportion/100},null,8,["status","percent"])]),_:1}),e(r,{title:"状态",width:100,align:"center"},{cell:t(({record:l})=>[e(O,{status:l.status},null,8,["status"])]),_:1}),e(r,{title:"创建时间","data-index":"createTime",width:180}),e(r,{title:"操作",width:200,align:"center",fixed:n(v)},{cell:t(({record:l})=>[e(_,null,{default:t(()=>[e(i,{type:"primary",size:"mini",onClick:S},{default:t(()=>o[4]||(o[4]=[p("修改",-1)])),_:1,__:[4]}),e(i,{size:"mini",onClick:H=>V(l)},{default:t(()=>o[5]||(o[5]=[p("详情",-1)])),_:2,__:[5]},1032,["onClick"]),e(U,{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:H=>I(l)},{default:t(()=>[e(i,{type:"primary",status:"danger",size:"mini"},{default:t(()=>o[6]||(o[6]=[p("删除",-1)])),_:1,__:[6]})]),_:2},1032,["onBeforeOk"])]),_:2},1024)]),_:1},8,["fixed"])]),_:1},8,["loading","data","pagination","selected-keys","onSelect","onSelectAll"])]),_:1})}}});export{Se as _};
