import{_ as h}from"./index.vue_vue_type_script_setup_true_lang-DkAyNBdy.js";import{_ as C}from"./index-CCUzGR4u.js";import{_ as R}from"./GiForm-DBbhR8Ym.js";import"./index-B70cmoY5.js";import"./dept-BSg8qeXU.js";import{u as k}from"./useDict-Du0qKvqH.js";import"./role-Dunc4HEg.js";import{O as w,a as I}from"./regexp-BWv6Tqg2.js";import{c as P,d as F}from"./data-DMJbYYJT.js";import{a9 as S}from"./arco-B8E_0xxC.js";import{e as G,a as q,r as D,ac as B,c as N,X as V,t as e,h as a,y as l,j,k as E,l as n,a1 as o,Y as O,z as L}from"./vue-Bh0u9iwh.js";const z=`<template>\r
  <a-card title="配置表单-新增">\r
    <template #extra>\r
      <a-space>\r
        <a-button type="primary" @click="isNameRequired = !isNameRequired">姓名必填动态设置</a-button>\r
        <GiCodeButton :code="CodeJson"></GiCodeButton>\r
      </a-space>\r
    </template>\r
    <a-row :gutter="30">\r
      <a-col :xs="24" :sm="24" :md="12">\r
        <GiForm ref="formRef" v-model="form" :columns="columns">\r
          <template #test="{ disabled }"> 自定义插槽-禁用状态：{{ disabled }} </template>\r
          <template #btns>\r
            <a-row justify="end" class="w-full">\r
              <a-space>\r
                <a-button type="primary" @click="save">保存</a-button>\r
                <a-button @click="reset">重置</a-button>\r
              </a-space>\r
            </a-row>\r
          </template>\r
        </GiForm>\r
      </a-col>\r
      <a-col :xs="24" :sm="24" :md="12">\r
        <GiCodeView :code-json="JSON.stringify(form, null, '\\t')"></GiCodeView>\r
      </a-col>\r
    </a-row>\r
  </a-card>\r
</template>\r
\r
<script setup lang="tsx">\r
import type { ColumnItem } from '@/components/GiForm'\r
import { Message } from '@arco-design/web-vue'\r
import GiCodeView from '@/components/GiCodeView/index.vue'\r
import { GiForm } from '@/components/GiForm'\r
import { useDict } from '@/hooks/app'\r
import * as Regexp from '@/utils/regexp'\r
import CodeJson from './Card2.vue?raw'\r
import { cityOptions, deptData } from './data'\r
\r
const { data: status_options } = useDict({ code: 'status' })\r
const isNameRequired = ref(true)\r
\r
const form = reactive({\r
  name: '',\r
  phone: '',\r
  sort: 0,\r
  sex: '',\r
  birthday: '',\r
  hobbys: [],\r
  status: 1,\r
  mark: 0,\r
  hide: false,\r
  grade: 0,\r
  test: '',\r
  remark: ''\r
})\r
\r
const formRef = useTemplateRef('formRef')\r
\r
const columns = computed(() => [\r
  {\r
    type: 'group-title',\r
    label: '基本信息',\r
    field: 'base-title',\r
    span: 24,\r
    formItemProps: {\r
      labelColStyle: { display: 'none' }\r
    }\r
  },\r
  {\r
    type: 'input',\r
    label: '姓名',\r
    field: 'name',\r
    props: {\r
      maxLength: 4\r
    },\r
    rules: [\r
      { required: isNameRequired.value, message: '请输入姓名' },\r
      { maxLength: 4, message: '姓名不超过4个字符' },\r
      { match: Regexp.OnlyCh, message: '仅支持中文姓名' }\r
    ],\r
    slots: {\r
      prepend: () => <icon-face-smile-fill />,\r
      append: () => h('span', { style: { color: 'red', fontSize: '12px' } }, '中文')\r
    }\r
  },\r
  {\r
    type: 'input',\r
    label: '手机',\r
    field: 'phone',\r
    props: {\r
      maxLength: 11\r
    },\r
    rules: [\r
      { required: !!form.name, message: '请输入手机号' }, // 如果有name的时候，手机号必填（动态rules示例）\r
      { match: Regexp.Phone, message: '手机号格式不正确' }\r
    ],\r
    slots: {\r
      prepend: '+86'\r
    }\r
  },\r
  {\r
    type: 'select',\r
    label: '性别',\r
    field: 'sex',\r
    required: true,\r
    props: {\r
      options: [\r
        { label: '男', value: 1 },\r
        { label: '女', value: 0 }\r
      ]\r
    }\r
  },\r
  {\r
    type: 'date-picker',\r
    label: '生日',\r
    field: 'birthday'\r
  },\r
  {\r
    type: 'checkbox-group',\r
    label: '爱好',\r
    field: 'hobbys',\r
    span: 24,\r
    props: {\r
      options: [\r
        { label: '电影', value: '01' },\r
        { label: '音乐', value: '02' },\r
        { label: '旅行', value: '03' },\r
        { label: '游戏', value: '04' }\r
      ]\r
    },\r
    slots: {\r
      label: ({ data }) => (\r
        <span style={{ color: 'red' }}>\r
          <span>{data.label}</span>\r
          <icon-face-smile-fill />\r
        </span>\r
      )\r
    }\r
  },\r
  {\r
    type: 'input-number',\r
    label: '排序',\r
    field: 'sort',\r
    props: {\r
      min: 0\r
    }\r
  },\r
  {\r
    type: 'radio-group',\r
    label: '状态',\r
    labelRender: () => (\r
      <div>\r
        <span>状态</span>\r
        <a-tooltip content="这里使用了tsx自定义渲染">\r
          <icon-info-circle-fill style={{ color: '#52B852' }} />\r
        </a-tooltip>\r
      </div>\r
    ),\r
    field: 'status',\r
    props: {\r
      options: status_options.value // 这里使用了字典\r
    }\r
  },\r
  {\r
    label: '测试',\r
    field: 'test',\r
    disabled: (i) => i.status === 0,\r
    formItemProps: { extra: '查看这里效果请切换状态' }\r
  },\r
  {\r
    type: 'rate',\r
    label: '评分',\r
    field: 'mark',\r
    formItemSlots: {\r
      extra: () => <a-tag>这里使用了tsx自定义渲染</a-tag>\r
    }\r
  },\r
  {\r
    type: 'switch',\r
    label: '是否隐藏',\r
    field: 'hide',\r
    formItemProps: { extra: '隐藏成绩项' }\r
  },\r
  {\r
    type: 'slider',\r
    label: '成绩',\r
    field: 'grade',\r
    span: 24,\r
    hide: (i) => {\r
      i.hide && (i.grade = 0)\r
      return i.hide === true\r
    }\r
  },\r
  {\r
    type: 'group-title',\r
    label: '分组标题1',\r
    field: 'group-title1',\r
    span: 24,\r
    formItemProps: {\r
      labelColStyle: { display: 'none' }\r
    }\r
  },\r
  {\r
    type: 'cascader',\r
    label: '城市',\r
    field: 'city',\r
    props: {\r
      options: cityOptions\r
    },\r
    disabled: (i) => i.status === 0\r
  },\r
  {\r
    type: 'tree-select',\r
    label: '部门',\r
    field: 'dept',\r
    props: {\r
      data: deptData\r
    },\r
    disabled: (i) => i.status === 0\r
  },\r
  {\r
    type: 'group-title',\r
    label: '分组标题2',\r
    field: 'group-title2',\r
    span: 24,\r
    formItemProps: {\r
      labelColStyle: { display: 'none' }\r
    }\r
  },\r
  {\r
    type: 'textarea',\r
    label: '备注',\r
    field: 'remark',\r
    span: 24,\r
    formItemProps: { extra: '这里是额外信息' }\r
  },\r
  {\r
    type: 'upload',\r
    label: '附件',\r
    field: 'file',\r
    span: 24,\r
    props: {\r
      listType: 'picture-card',\r
      action: '/'\r
    },\r
    formItemProps: {\r
      extra: '上传文件只支持zip、rar、doc、docx、pdf、jpg、png格式'\r
    }\r
  },\r
  {\r
    field: 'btns',\r
    span: 24\r
  }\r
] as ColumnItem<typeof form>[])\r
\r
const save = async () => {\r
  const error = await formRef.value?.formRef?.validate()\r
  if (error) return false\r
  Message.success('验证通过')\r
}\r
\r
const reset = () => {\r
  formRef.value?.formRef?.resetFields()\r
}\r
<\/script>\r
\r
<style lang="scss" scoped></style>\r
`,Z=G({__name:"Card2",setup(J){const{data:b}=k({code:"status"}),i=q(!0),s=D({name:"",phone:"",sort:0,sex:"",birthday:"",hobbys:[],status:1,mark:0,hide:!1,grade:0,test:"",remark:""}),d=B("formRef"),y=N(()=>[{type:"group-title",label:"基本信息",field:"base-title",span:24,formItemProps:{labelColStyle:{display:"none"}}},{type:"input",label:"姓名",field:"name",props:{maxLength:4},rules:[{required:i.value,message:"请输入姓名"},{maxLength:4,message:"姓名不超过4个字符"},{match:w,message:"仅支持中文姓名"}],slots:{prepend:()=>e(a("icon-face-smile-fill"),null,null),append:()=>V("span",{style:{color:"red",fontSize:"12px"}},"中文")}},{type:"input",label:"手机",field:"phone",props:{maxLength:11},rules:[{required:!!s.name,message:"请输入手机号"},{match:I,message:"手机号格式不正确"}],slots:{prepend:"+86"}},{type:"select",label:"性别",field:"sex",required:!0,props:{options:[{label:"男",value:1},{label:"女",value:0}]}},{type:"date-picker",label:"生日",field:"birthday"},{type:"checkbox-group",label:"爱好",field:"hobbys",span:24,props:{options:[{label:"电影",value:"01"},{label:"音乐",value:"02"},{label:"旅行",value:"03"},{label:"游戏",value:"04"}]},slots:{label:({data:r})=>e("span",{style:{color:"red"}},[e("span",null,[r.label]),e(a("icon-face-smile-fill"),null,null)])}},{type:"input-number",label:"排序",field:"sort",props:{min:0}},{type:"radio-group",label:"状态",labelRender:()=>e("div",null,[e("span",null,[l("状态")]),e(a("a-tooltip"),{content:"这里使用了tsx自定义渲染"},{default:()=>[e(a("icon-info-circle-fill"),{style:{color:"#52B852"}},null)]})]),field:"status",props:{options:b.value}},{label:"测试",field:"test",disabled:r=>r.status===0,formItemProps:{extra:"查看这里效果请切换状态"}},{type:"rate",label:"评分",field:"mark",formItemSlots:{extra:()=>e(a("a-tag"),null,{default:()=>[l("这里使用了tsx自定义渲染")]})}},{type:"switch",label:"是否隐藏",field:"hide",formItemProps:{extra:"隐藏成绩项"}},{type:"slider",label:"成绩",field:"grade",span:24,hide:r=>(r.hide&&(r.grade=0),r.hide===!0)},{type:"group-title",label:"分组标题1",field:"group-title1",span:24,formItemProps:{labelColStyle:{display:"none"}}},{type:"cascader",label:"城市",field:"city",props:{options:P},disabled:r=>r.status===0},{type:"tree-select",label:"部门",field:"dept",props:{data:F},disabled:r=>r.status===0},{type:"group-title",label:"分组标题2",field:"group-title2",span:24,formItemProps:{labelColStyle:{display:"none"}}},{type:"textarea",label:"备注",field:"remark",span:24,formItemProps:{extra:"这里是额外信息"}},{type:"upload",label:"附件",field:"file",span:24,props:{listType:"picture-card",action:"/"},formItemProps:{extra:"上传文件只支持zip、rar、doc、docx、pdf、jpg、png格式"}},{field:"btns",span:24}]),g=async()=>{if(await d.value?.formRef?.validate())return!1;S.success("验证通过")},_=()=>{d.value?.formRef?.resetFields()};return(r,t)=>{const m=a("a-button"),x=h,u=a("a-space"),f=a("a-row"),c=a("a-col"),v=a("a-card");return E(),j(v,{title:"配置表单-新增"},{extra:n(()=>[e(u,null,{default:n(()=>[e(m,{type:"primary",onClick:t[0]||(t[0]=p=>i.value=!o(i))},{default:n(()=>t[2]||(t[2]=[l("姓名必填动态设置",-1)])),_:1,__:[2]}),e(x,{code:o(z)},null,8,["code"])]),_:1})]),default:n(()=>[e(f,{gutter:30},{default:n(()=>[e(c,{xs:24,sm:24,md:12},{default:n(()=>[e(o(R),{ref_key:"formRef",ref:d,modelValue:o(s),"onUpdate:modelValue":t[1]||(t[1]=p=>O(s)?s.value=p:null),columns:o(y)},{test:n(({disabled:p})=>[l(" 自定义插槽-禁用状态："+L(p),1)]),btns:n(()=>[e(f,{justify:"end",class:"w-full"},{default:n(()=>[e(u,null,{default:n(()=>[e(m,{type:"primary",onClick:g},{default:n(()=>t[3]||(t[3]=[l("保存",-1)])),_:1,__:[3]}),e(m,{onClick:_},{default:n(()=>t[4]||(t[4]=[l("重置",-1)])),_:1,__:[4]})]),_:1})]),_:1})]),_:1},8,["modelValue","columns"])]),_:1}),e(c,{xs:24,sm:24,md:12},{default:n(()=>[e(C,{"code-json":JSON.stringify(o(s),null,"	")},null,8,["code-json"])]),_:1})]),_:1})]),_:1})}}});export{Z as _};
