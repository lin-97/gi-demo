import{_ as W}from"./index-Zwwi5Ftb.js";import{_ as F}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-BZ7_A1X3.js";import{_ as H}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import{_ as Q}from"./index.vue_vue_type_script_setup_true_lang-ChZBomrs.js";import{b as g}from"./index-Bf4Op5cr.js";import{c as X}from"./index-D1V-3yfm.js";import{u as Y}from"./useTable-CK5kmjjD.js";import"./dept-BHuwfU5l.js";import{u as Z}from"./useDict-Btldr1OX.js";import"./role-B9mLd4Sk.js";import ee from"./index-C71h-Te3.js";import{e as te,a7 as ne,r as ae,ae as oe,h as s,j as le,k as se,l as t,t as e,a1 as n,y as u,z as ie}from"./vue-CNbhFRxi.js";import{a9 as b}from"./arco-DTGWTKTH.js";const re=`<template>
  <GiPageLayout collapsed>
    <template #left>
      <CateTree placeholder="请输入搜索关键词" @node-click="pagination.onChange(1)"></CateTree>
    </template>

    <a-row justify="space-between">
      <a-space wrap>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onMulDelete"></GiButton>
        <GiButton type="export" @click="onExport"></GiButton>
        <GiCodeButton :code="CodeJson"></GiCodeButton>
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
        <a-table-column title="序号" :width="68" align="center">
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
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/person'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { useTabsStore } from '@/stores'
import CateTree from './CateTree/index.vue'
import CodeJson from './Pane1.vue?raw'

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
<\/script>

<style lang="scss" scoped></style>
`,De=te({__name:"Pane1",setup(ce){const d=ne(),{setTabTitle:h}=X(),{data:k}=Z({code:"status"}),r=ae({name:"",status:""}),{loading:C,tableData:D,getTableData:m,pagination:y,selectedKeys:p,select:T,selectAll:x,handleDelete:w,fixed:v}=Y(l=>g.getList({...r,...l}),{immediate:!1,formatResult:l=>l.map(a=>({...a,isEdit:!1}))}),A=l=>l<30?"danger":l<60?"warning":"success";oe(()=>{m()});const G=()=>{d.push({path:"/data/form"})},B=async()=>{await d.push({path:"/data/form",query:{id:"ID123456"}}),h("编辑")},I=l=>{d.push({name:"DataDetailId",params:{id:l.id}})},P=l=>w(()=>g.delete({ids:[l.id]}),{content:`是否删除-${l.name}?`,showModal:!1}),S=()=>{if(!p.value.length)return b.warning("请选择删除项！");w(()=>g.delete({ids:p.value}),{successTip:"批量删除成功！"})},M=()=>{if(!p.value.length)return b.warning("请勾选数据");b.success("点击了导出")};return(l,a)=>{const _=Q,E=H,f=s("a-space"),V=s("a-select"),$=s("a-input"),z=s("icon-search"),c=s("a-button"),L=s("a-input-group"),K=s("icon-refresh"),R=s("a-row"),i=s("a-table-column"),j=s("a-progress"),J=F,N=s("a-popconfirm"),q=s("a-table"),O=W;return se(),le(O,{collapsed:""},{left:t(()=>[e(ee,{placeholder:"请输入搜索关键词",onNodeClick:a[0]||(a[0]=o=>n(y).onChange(1))})]),default:t(()=>[e(R,{justify:"space-between"},{default:t(()=>[e(f,{wrap:""},{default:t(()=>[e(_,{type:"add",onClick:G}),e(_,{type:"delete",onClick:S}),e(_,{type:"export",onClick:M}),e(E,{code:n(re)},null,8,["code"])]),_:1}),e(f,{wrap:""},{default:t(()=>[e(V,{modelValue:n(r).status,"onUpdate:modelValue":a[1]||(a[1]=o=>n(r).status=o),class:"gi_select_input",options:n(k),placeholder:"请选择","allow-clear":""},null,8,["modelValue","options"]),e(L,null,{default:t(()=>[e($,{modelValue:n(r).name,"onUpdate:modelValue":a[2]||(a[2]=o=>n(r).name=o),placeholder:"请输入搜索关键词","allow-clear":""},null,8,["modelValue"]),e(c,{type:"primary",onClick:n(m)},{default:t(()=>[e(z)]),_:1},8,["onClick"])]),_:1}),e(c,{type:"primary",onClick:n(m)},{icon:t(()=>[e(K)]),_:1},8,["onClick"])]),_:1})]),_:1}),e(q,{class:"gi_table","row-key":"id",loading:n(C),bordered:{cell:!0},data:n(D),scroll:{x:"100%",y:"100%",minWidth:1e3},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:n(y),"selected-keys":n(p),onSelect:n(T),onSelectAll:n(x)},{columns:t(()=>[e(i,{title:"序号",width:68,align:"center"},{cell:t(o=>[u(ie(o.rowIndex+1),1)]),_:1}),e(i,{title:"姓名","data-index":"name"}),e(i,{title:"地址","data-index":"address",ellipsis:"",tooltip:""}),e(i,{title:"比例",width:200},{cell:t(({record:o})=>[e(j,{status:A(o.proportion),percent:o.proportion/100},null,8,["status","percent"])]),_:1}),e(i,{title:"状态",width:100,align:"center"},{cell:t(({record:o})=>[e(J,{status:o.status},null,8,["status"])]),_:1}),e(i,{title:"创建时间","data-index":"createTime",width:180}),e(i,{title:"操作",width:200,align:"center",fixed:n(v)},{cell:t(({record:o})=>[e(f,null,{default:t(()=>[e(c,{type:"primary",size:"mini",onClick:B},{default:t(()=>a[3]||(a[3]=[u("修改",-1)])),_:1,__:[3]}),e(c,{size:"mini",onClick:U=>I(o)},{default:t(()=>a[4]||(a[4]=[u("详情",-1)])),_:2,__:[4]},1032,["onClick"]),e(N,{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:U=>P(o)},{default:t(()=>[e(c,{type:"primary",status:"danger",size:"mini"},{default:t(()=>a[5]||(a[5]=[u("删除",-1)])),_:1,__:[5]})]),_:2},1032,["onBeforeOk"])]),_:2},1024)]),_:1},8,["fixed"])]),_:1},8,["loading","data","pagination","selected-keys","onSelect","onSelectAll"])]),_:1})}}});export{De as _};
