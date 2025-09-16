import{_ as W}from"./index-BSd_cXen.js";import{_ as F}from"./GiCellStatus.vue_vue_type_script_setup_true_lang-CblanbWY.js";import{_ as H}from"./index.vue_vue_type_script_setup_true_lang-9YK9MTJc.js";import{_ as Q}from"./index.vue_vue_type_script_setup_true_lang-DJhiOHUY.js";import{b as g}from"./index-w68tMyEK.js";import{c as X}from"./index-ClEKbW6k.js";import{u as Y}from"./useTable-Ddq4CYHh.js";import"./dept-DEF04NIx.js";import{u as Z}from"./useDict-B4mBI_5g.js";import"./role-Cg_-WBBn.js";import ee from"./index-CHoEg-op.js";import{e as te,a7 as ne,r as ae,ae as oe,h as l,j as re,k as le,l as t,t as e,$ as n,y as u,z as se}from"./vue-N_SRJc_9.js";import{a9 as b}from"./arco-BfMEPP4p.js";const ie=`<template>\r
  <GiPageLayout collapsed>\r
    <template #left>\r
      <CateTree placeholder="请输入搜索关键词" @node-click="pagination.onChange(1)"></CateTree>\r
    </template>\r
\r
    <a-row justify="space-between">\r
      <a-space wrap>\r
        <GiButton type="add" @click="onAdd"></GiButton>\r
        <GiButton type="delete" @click="onMulDelete"></GiButton>\r
        <GiButton type="export" @click="onExport"></GiButton>\r
        <GiCodeButton :code="CodeJson"></GiCodeButton>\r
      </a-space>\r
\r
      <a-space wrap>\r
        <a-select v-model="form.status" class="gi_select_input" :options="options" placeholder="请选择"\r
          allow-clear></a-select>\r
        <a-input-group>\r
          <a-input v-model="form.name" placeholder="请输入搜索关键词" allow-clear> </a-input>\r
          <a-button type="primary" @click="getTableData">\r
            <icon-search />\r
          </a-button>\r
        </a-input-group>\r
        <a-button type="primary" @click="getTableData">\r
          <template #icon><icon-refresh /></template>\r
        </a-button>\r
      </a-space>\r
    </a-row>\r
\r
    <a-table class="gi_table" row-key="id" :loading="loading" :bordered="{ cell: true }" :data="tableData"\r
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"\r
      :pagination="pagination" :selected-keys="selectedKeys" @select="select" @select-all="selectAll">\r
      <template #columns>\r
        <a-table-column title="序号" :width="68" align="center">\r
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>\r
        </a-table-column>\r
        <a-table-column title="姓名" data-index="name"></a-table-column>\r
        <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>\r
        <a-table-column title="比例" :width="200">\r
          <template #cell="{ record }">\r
            <a-progress :status="getProportionColor(record.proportion)" :percent="record.proportion / 100" />\r
          </template>\r
        </a-table-column>\r
        <a-table-column title="状态" :width="100" align="center">\r
          <template #cell="{ record }">\r
            <GiCellStatus :status="record.status"></GiCellStatus>\r
          </template>\r
        </a-table-column>\r
        <a-table-column title="创建时间" data-index="createTime" :width="180"></a-table-column>\r
        <a-table-column title="操作" :width="200" align="center" :fixed="fixed">\r
          <template #cell="{ record }">\r
            <a-space>\r
              <a-button type="primary" size="mini" @click="onEdit">修改</a-button>\r
              <a-button size="mini" @click="onDetail(record)">详情</a-button>\r
              <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete(record)">\r
                <a-button type="primary" status="danger" size="mini">删除</a-button>\r
              </a-popconfirm>\r
            </a-space>\r
          </template>\r
        </a-table-column>\r
      </template>\r
    </a-table>\r
  </GiPageLayout>\r
</template>\r
\r
<script setup lang="ts">\r
import type * as T from '@/apis/person'\r
import { Message } from '@arco-design/web-vue'\r
import { baseAPI } from '@/apis/person'\r
import { useTable } from '@/hooks'\r
import { useDict } from '@/hooks/app'\r
import { useTabsStore } from '@/stores'\r
import CateTree from './CateTree/index.vue'\r
import CodeJson from './Pane1.vue?raw'\r
\r
const router = useRouter()\r
const { setTabTitle } = useTabsStore()\r
\r
const { data: options } = useDict({ code: 'status' })\r
const form = reactive({\r
  name: '',\r
  status: ''\r
})\r
\r
// 这里使用了表格hooks：useTable, 节省了大量代码\r
const { loading, tableData, getTableData, pagination, selectedKeys, select, selectAll, handleDelete, fixed } = useTable(\r
  (page) => baseAPI.getList({ ...form, ...page }),\r
  { immediate: false, formatResult: (data) => data.map((i) => ({ ...i, isEdit: false })) }\r
)\r
\r
// 比例进度条颜色\r
const getProportionColor = (proportion: number) => {\r
  if (proportion < 30) return 'danger'\r
  if (proportion < 60) return 'warning'\r
  return 'success'\r
}\r
\r
onActivated(() => {\r
  getTableData()\r
})\r
\r
const onAdd = () => {\r
  router.push({ path: '/data/form' })\r
}\r
\r
const onEdit = async () => {\r
  await router.push({ path: '/data/form', query: { id: 'ID123456' } })\r
  setTabTitle('编辑')\r
}\r
\r
const onDetail = (item: T.ListItem) => {\r
  router.push({ name: 'DataDetailId', params: { id: item.id } })\r
}\r
\r
// 删除\r
const onDelete = (item: T.ListItem) => {\r
  return handleDelete(() => baseAPI.delete({ ids: [item.id] }), { content: \`是否删除-\${item.name}?\`, showModal: false })\r
}\r
\r
// 批量删除\r
const onMulDelete = () => {\r
  if (!selectedKeys.value.length) {\r
    return Message.warning('请选择删除项！')\r
  }\r
  handleDelete(() => baseAPI.delete({ ids: selectedKeys.value as string[] }), { successTip: '批量删除成功！' })\r
}\r
\r
const onExport = () => {\r
  if (!selectedKeys.value.length) {\r
    return Message.warning('请勾选数据')\r
  }\r
  Message.success('点击了导出')\r
}\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,De=te({__name:"Pane1",setup(ce){const d=ne(),{setTabTitle:h}=X(),{data:k}=Z({code:"status"}),i=ae({name:"",status:""}),{loading:C,tableData:D,getTableData:m,pagination:y,selectedKeys:p,select:T,selectAll:x,handleDelete:w,fixed:v}=Y(r=>g.getList({...i,...r}),{immediate:!1,formatResult:r=>r.map(a=>({...a,isEdit:!1}))}),A=r=>r<30?"danger":r<60?"warning":"success";oe(()=>{m()});const G=()=>{d.push({path:"/data/form"})},B=async()=>{await d.push({path:"/data/form",query:{id:"ID123456"}}),h("编辑")},I=r=>{d.push({name:"DataDetailId",params:{id:r.id}})},P=r=>w(()=>g.delete({ids:[r.id]}),{content:`是否删除-${r.name}?`,showModal:!1}),S=()=>{if(!p.value.length)return b.warning("请选择删除项！");w(()=>g.delete({ids:p.value}),{successTip:"批量删除成功！"})},M=()=>{if(!p.value.length)return b.warning("请勾选数据");b.success("点击了导出")};return(r,a)=>{const _=Q,$=H,f=l("a-space"),E=l("a-select"),V=l("a-input"),z=l("icon-search"),c=l("a-button"),L=l("a-input-group"),K=l("icon-refresh"),R=l("a-row"),s=l("a-table-column"),j=l("a-progress"),J=F,N=l("a-popconfirm"),q=l("a-table"),O=W;return le(),re(O,{collapsed:""},{left:t(()=>[e(ee,{placeholder:"请输入搜索关键词",onNodeClick:a[0]||(a[0]=o=>n(y).onChange(1))})]),default:t(()=>[e(R,{justify:"space-between"},{default:t(()=>[e(f,{wrap:""},{default:t(()=>[e(_,{type:"add",onClick:G}),e(_,{type:"delete",onClick:S}),e(_,{type:"export",onClick:M}),e($,{code:n(ie)},null,8,["code"])]),_:1}),e(f,{wrap:""},{default:t(()=>[e(E,{modelValue:n(i).status,"onUpdate:modelValue":a[1]||(a[1]=o=>n(i).status=o),class:"gi_select_input",options:n(k),placeholder:"请选择","allow-clear":""},null,8,["modelValue","options"]),e(L,null,{default:t(()=>[e(V,{modelValue:n(i).name,"onUpdate:modelValue":a[2]||(a[2]=o=>n(i).name=o),placeholder:"请输入搜索关键词","allow-clear":""},null,8,["modelValue"]),e(c,{type:"primary",onClick:n(m)},{default:t(()=>[e(z)]),_:1},8,["onClick"])]),_:1}),e(c,{type:"primary",onClick:n(m)},{icon:t(()=>[e(K)]),_:1},8,["onClick"])]),_:1})]),_:1}),e(q,{class:"gi_table","row-key":"id",loading:n(C),bordered:{cell:!0},data:n(D),scroll:{x:"100%",y:"100%",minWidth:1e3},"row-selection":{type:"checkbox",showCheckedAll:!0},pagination:n(y),"selected-keys":n(p),onSelect:n(T),onSelectAll:n(x)},{columns:t(()=>[e(s,{title:"序号",width:68,align:"center"},{cell:t(o=>[u(se(o.rowIndex+1),1)]),_:1}),e(s,{title:"姓名","data-index":"name"}),e(s,{title:"地址","data-index":"address",ellipsis:"",tooltip:""}),e(s,{title:"比例",width:200},{cell:t(({record:o})=>[e(j,{status:A(o.proportion),percent:o.proportion/100},null,8,["status","percent"])]),_:1}),e(s,{title:"状态",width:100,align:"center"},{cell:t(({record:o})=>[e(J,{status:o.status},null,8,["status"])]),_:1}),e(s,{title:"创建时间","data-index":"createTime",width:180}),e(s,{title:"操作",width:200,align:"center",fixed:n(v)},{cell:t(({record:o})=>[e(f,null,{default:t(()=>[e(c,{type:"primary",size:"mini",onClick:B},{default:t(()=>a[3]||(a[3]=[u("修改",-1)])),_:1,__:[3]}),e(c,{size:"mini",onClick:U=>I(o)},{default:t(()=>a[4]||(a[4]=[u("详情",-1)])),_:2,__:[4]},1032,["onClick"]),e(N,{type:"warning",content:"您确定要删除该项吗?",onBeforeOk:U=>P(o)},{default:t(()=>[e(c,{type:"primary",status:"danger",size:"mini"},{default:t(()=>a[5]||(a[5]=[u("删除",-1)])),_:1,__:[5]})]),_:2},1032,["onBeforeOk"])]),_:2},1024)]),_:1},8,["fixed"])]),_:1},8,["loading","data","pagination","selected-keys","onSelect","onSelectAll"])]),_:1})}}});export{De as _};
