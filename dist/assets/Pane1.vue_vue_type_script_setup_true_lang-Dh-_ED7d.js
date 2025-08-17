import{_ as F}from"./index-d6X1y8sD.js";import{_ as H}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-Dsi2Injn.js";import{_ as Q}from"./index.vue_vue_type_script_setup_true_lang-DEmpfeVK.js";import{u as Y}from"./index-BPv1vC5v.js";import{b as g}from"./index-DuO8ohHr.js";import{_ as Z}from"./index-6ia8nwMc.js";import{c as ee}from"./index-BJpBVVpn.js";import{u as te}from"./useTable-CdwSk5l7.js";import"./dept-hvCAZQXb.js";import{u as oe}from"./useDict-ChW8sIaT.js";import"./role-0WIy0paV.js";import ae from"./index-YWw7olUu.js";import{e as ne,a7 as le,r as se,ae as ie,h as l,j as re,k as ce,l as t,t as e,a1 as o,y as u,z as pe,X as ue}from"./vue-_iYK9Zi6.js";import{a9 as b,ad as de}from"./arco-CDZlpuCh.js";const me=`
<template>
  <GiPageLayout>
    <template #left>
      <CateTree placeholder="请输入搜索关键词" @node-click="pagination.onChange(1)"></CateTree>
    </template>

    <a-row justify="space-between">
      <a-space wrap>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onMulDelete"></GiButton>
        <GiButton type="export" @click="onExport"></GiButton>
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
import type * as T from '@/apis/person'
import { Drawer, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { baseAPI } from '@/apis/person'
import GiCodeView from '@/components/GiCodeView/index.vue'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { useTabsStore } from '@/stores'
import CateTree from './CateTree/index.vue'
import Pane1Json from './code/pane1-json'

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
  return handleDelete(() => baseAPI.delete({ ids: [item.id] }), { content: \`是否删除 - \${ item.name }?\`, showModal: false })
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

`,Pe=ne({__name:"Pane1",setup(_e){const{width:h}=Y(),d=le(),{setTabTitle:k}=ee(),{data:C}=oe({code:"status"}),c=se({name:"",status:""}),{loading:D,tableData:T,getTableData:m,pagination:w,selectedKeys:p,select:x,selectAll:v,handleDelete:y,fixed:A}=te(s=>g.getList({...c,...s}),{immediate:!1,formatResult:s=>s.map(a=>({...a,isEdit:!1}))}),G=s=>s<30?"danger":s<60?"warning":"success";ie(()=>{m()});const P=()=>{d.push({path:"/data/form"})},S=async()=>{await d.push({path:"/data/form",query:{id:"ID123456"}}),k("编辑")},V=s=>{d.push({name:"DataDetailId",params:{id:s.id}})},I=s=>y(()=>g.delete({ids:[s.id]}),{content:`是否删除-${s.name}?`,showModal:!1}),B=()=>{if(!p.value.length)return b.warning("请选择删除项！");y(()=>g.delete({ids:p.value}),{successTip:"批量删除成功！"})},z=()=>{if(!p.value.length)return b.warning("请勾选数据");b.success("点击了导出")},M=()=>{de.open({title:"查看代码",content:()=>ue(Z,{codeJson:me,type:"vue"}),width:h.value<500?"100%":800})};return(s,a)=>{const _=Q,E=l("icon-code"),r=l("a-button"),f=l("a-space"),L=l("a-select"),$=l("a-input"),K=l("icon-search"),J=l("a-input-group"),W=l("icon-refresh"),j=l("a-row"),i=l("a-table-column"),R=l("a-progress"),N=H,q=l("a-popconfirm"),O=l("a-table"),U=F;return ce(),re(U,null,{left:t(()=>[e(ae,{placeholder:"请输入搜索关键词",onNodeClick:a[0]||(a[0]=n=>o(w).onChange(1))})]),default:t(()=>[e(j,{justify:"space-between"},{default:t(()=>[e(f,{wrap:""},{default:t(()=>[e(_,{type:"add",onClick:P}),e(_,{type:"delete",onClick:B}),e(_,{type:"export",onClick:z}),e(r,{type:"primary",status:"warning",onClick:M},{icon:t(()=>[e(E)]),_:1})]),_:1}),e(f,{wrap:""},{default:t(()=>[e(L,{modelValue:o(c).status,"onUpdate:modelValue":a[1]||(a[1]=n=>o(c).status=n),class:"gi_select_input",options:o(C),placeholder:"请选择","allow-clear":""},null,8,["modelValue","options"]),e(J,null,{default:t(()=>[e($,{modelValue:o(c).name,"onUpdate:modelValue":a[2]||(a[2]=n=>o(c).name=n),placeholder:"请输入搜索关键词","allow-clear":""},null,8,["modelValue"]),e(r,{type:"primary",onClick:o(m)},{default:t(()=>[e(K)]),_:1},8,["onClick"])]),_:1}),e(r,{type:"primary",onClick:o(m)},{icon:t(()=>[e(W)]),_:1},8,["onClick"])]),_:1})]),_:1}),e(O,{class:"gi_table","row-key":"id",loading:o(D),bordered:{cell:!0},data:o(T),scroll:{x:"100%",y:"100%",minWidth:1e3},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:o(w),"selected-keys":o(p),onSelect:o(x),onSelectAll:o(v)},{columns:t(()=>[e(i,{title:"序号",width:68},{cell:t(n=>[u(pe(n.rowIndex+1),1)]),_:1}),e(i,{title:"姓名","data-index":"name"}),e(i,{title:"地址","data-index":"address",ellipsis:"",tooltip:""}),e(i,{title:"比例",width:200},{cell:t(({record:n})=>[e(R,{status:G(n.proportion),percent:n.proportion/100},null,8,["status","percent"])]),_:1}),e(i,{title:"状态",width:100,align:"center"},{cell:t(({record:n})=>[e(N,{status:n.status},null,8,["status"])]),_:1}),e(i,{title:"创建时间","data-index":"createTime",width:180}),e(i,{title:"操作",width:200,align:"center",fixed:o(A)},{cell:t(({record:n})=>[e(f,null,{default:t(()=>[e(r,{type:"primary",size:"mini",onClick:S},{default:t(()=>a[3]||(a[3]=[u("修改",-1)])),_:1,__:[3]}),e(r,{size:"mini",onClick:X=>V(n)},{default:t(()=>a[4]||(a[4]=[u("详情",-1)])),_:2,__:[4]},1032,["onClick"]),e(q,{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:X=>I(n)},{default:t(()=>[e(r,{type:"primary",status:"danger",size:"mini"},{default:t(()=>a[5]||(a[5]=[u("删除",-1)])),_:1,__:[5]})]),_:2},1032,["onBeforeOk"])]),_:2},1024)]),_:1},8,["fixed"])]),_:1},8,["loading","data","pagination","selected-keys","onSelect","onSelectAll"])]),_:1})}}});export{Pe as _};
