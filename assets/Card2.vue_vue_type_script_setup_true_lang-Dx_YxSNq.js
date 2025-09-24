import{_ as h}from"./index.vue_vue_type_script_setup_true_lang-DX7KZacw.js";import{_ as C}from"./index-DCPFMip6.js";import{_ as R}from"./GiForm-kVjMZKRM.js";import"./index-D1V-3yfm.js";import"./dept-BHuwfU5l.js";import{u as k}from"./useDict-Btldr1OX.js";import"./role-B9mLd4Sk.js";import{O as w,a as I}from"./regexp-BWv6Tqg2.js";import{c as P,d as F}from"./data-DMJbYYJT.js";import{a9 as S}from"./arco-DTGWTKTH.js";import{e as G,a as q,r as D,ac as B,c as N,X as V,t as e,h as l,y as o,j,k as E,l as t,a1 as s,Y as O,z as L}from"./vue-CNbhFRxi.js";const z=`<template>
  <a-card title="配置表单-新增">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="isNameRequired = !isNameRequired">姓名必填动态设置</a-button>
        <GiCodeButton :code="CodeJson"></GiCodeButton>
      </a-space>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm ref="formRef" v-model="form" :columns="columns">
          <template #test="{ disabled }"> 自定义插槽-禁用状态：{{ disabled }} </template>
          <template #btns>
            <a-row justify="end" class="w-full">
              <a-space>
                <a-button type="primary" @click="save">保存</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-row>
          </template>
        </GiForm>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <GiCodeView :code-json="JSON.stringify(form, null, '\\t')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="tsx">
import type { ColumnItem } from '@/components/GiForm'
import { Message } from '@arco-design/web-vue'
import GiCodeView from '@/components/GiCodeView/index.vue'
import { GiForm } from '@/components/GiForm'
import { useDict } from '@/hooks/app'
import * as Regexp from '@/utils/regexp'
import CodeJson from './Card2.vue?raw'
import { cityOptions, deptData } from './data'

const { data: status_options } = useDict({ code: 'status' })
const isNameRequired = ref(true)

const form = reactive({
  name: '',
  phone: '',
  sort: 0,
  sex: '',
  birthday: '',
  hobbys: [],
  status: 1,
  mark: 0,
  hide: false,
  grade: 0,
  test: '',
  remark: ''
})

const formRef = useTemplateRef('formRef')

const columns = computed(() => [
  {
    type: 'group-title',
    label: '基本信息',
    field: 'base-title',
    span: 24,
    formItemProps: {
      labelColStyle: { display: 'none' }
    }
  },
  {
    type: 'input',
    label: '姓名',
    field: 'name',
    props: {
      maxLength: 4
    },
    rules: [
      { required: isNameRequired.value, message: '请输入姓名' },
      { maxLength: 4, message: '姓名不超过4个字符' },
      { match: Regexp.OnlyCh, message: '仅支持中文姓名' }
    ],
    slots: {
      prepend: () => <icon-face-smile-fill />,
      append: () => h('span', { style: { color: 'red', fontSize: '12px' } }, '中文')
    }
  },
  {
    type: 'input',
    label: '手机',
    field: 'phone',
    props: {
      maxLength: 11
    },
    rules: [
      { required: !!form.name, message: '请输入手机号' }, // 如果有name的时候，手机号必填（动态rules示例）
      { match: Regexp.Phone, message: '手机号格式不正确' }
    ],
    slots: {
      prepend: '+86'
    }
  },
  {
    type: 'select',
    label: '性别',
    field: 'sex',
    required: true,
    props: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 0 }
      ]
    }
  },
  {
    type: 'date-picker',
    label: '生日',
    field: 'birthday'
  },
  {
    type: 'checkbox-group',
    label: '爱好',
    field: 'hobbys',
    span: 24,
    props: {
      options: [
        { label: '电影', value: '01' },
        { label: '音乐', value: '02' },
        { label: '旅行', value: '03' },
        { label: '游戏', value: '04' }
      ]
    },
    slots: {
      label: ({ data }) => (
        <span style={{ color: 'red' }}>
          <span>{data.label}</span>
          <icon-face-smile-fill />
        </span>
      )
    }
  },
  {
    type: 'input-number',
    label: '排序',
    field: 'sort',
    props: {
      min: 0
    }
  },
  {
    type: 'radio-group',
    label: '状态',
    labelRender: () => (
      <div>
        <span>状态</span>
        <a-tooltip content="这里使用了tsx自定义渲染">
          <icon-info-circle-fill style={{ color: '#52B852' }} />
        </a-tooltip>
      </div>
    ),
    field: 'status',
    props: {
      options: status_options.value // 这里使用了字典
    }
  },
  {
    label: '测试',
    field: 'test',
    disabled: (i) => i.status === 0,
    formItemProps: { extra: '查看这里效果请切换状态' }
  },
  {
    type: 'rate',
    label: '评分',
    field: 'mark',
    formItemSlots: {
      extra: () => <a-tag>这里使用了tsx自定义渲染</a-tag>
    }
  },
  {
    type: 'switch',
    label: '是否隐藏',
    field: 'hide',
    formItemProps: { extra: '隐藏成绩项' }
  },
  {
    type: 'slider',
    label: '成绩',
    field: 'grade',
    span: 24,
    hide: (i) => {
      i.hide && (i.grade = 0)
      return i.hide === true
    }
  },
  {
    type: 'group-title',
    label: '分组标题1',
    field: 'group-title1',
    span: 24,
    formItemProps: {
      labelColStyle: { display: 'none' }
    }
  },
  {
    type: 'cascader',
    label: '城市',
    field: 'city',
    props: {
      options: cityOptions
    },
    disabled: (i) => i.status === 0
  },
  {
    type: 'tree-select',
    label: '部门',
    field: 'dept',
    props: {
      data: deptData
    },
    disabled: (i) => i.status === 0
  },
  {
    type: 'group-title',
    label: '分组标题2',
    field: 'group-title2',
    span: 24,
    formItemProps: {
      labelColStyle: { display: 'none' }
    }
  },
  {
    type: 'textarea',
    label: '备注',
    field: 'remark',
    span: 24,
    formItemProps: { extra: '这里是额外信息' }
  },
  {
    type: 'upload',
    label: '附件',
    field: 'file',
    span: 24,
    props: {
      listType: 'picture-card',
      action: '/'
    },
    formItemProps: {
      extra: '上传文件只支持zip、rar、doc、docx、pdf、jpg、png格式'
    }
  },
  {
    field: 'btns',
    span: 24
  }
] as ColumnItem<typeof form>[])

const save = async () => {
  const error = await formRef.value?.formRef?.validate()
  if (error) return false
  Message.success('验证通过')
}

const reset = () => {
  formRef.value?.formRef?.resetFields()
}
<\/script>

<style lang="scss" scoped></style>
`,Z=G({__name:"Card2",setup(J){const{data:b}=k({code:"status"}),i=q(!0),r=D({name:"",phone:"",sort:0,sex:"",birthday:"",hobbys:[],status:1,mark:0,hide:!1,grade:0,test:"",remark:""}),d=B("formRef"),y=N(()=>[{type:"group-title",label:"基本信息",field:"base-title",span:24,formItemProps:{labelColStyle:{display:"none"}}},{type:"input",label:"姓名",field:"name",props:{maxLength:4},rules:[{required:i.value,message:"请输入姓名"},{maxLength:4,message:"姓名不超过4个字符"},{match:w,message:"仅支持中文姓名"}],slots:{prepend:()=>e(l("icon-face-smile-fill"),null,null),append:()=>V("span",{style:{color:"red",fontSize:"12px"}},"中文")}},{type:"input",label:"手机",field:"phone",props:{maxLength:11},rules:[{required:!!r.name,message:"请输入手机号"},{match:I,message:"手机号格式不正确"}],slots:{prepend:"+86"}},{type:"select",label:"性别",field:"sex",required:!0,props:{options:[{label:"男",value:1},{label:"女",value:0}]}},{type:"date-picker",label:"生日",field:"birthday"},{type:"checkbox-group",label:"爱好",field:"hobbys",span:24,props:{options:[{label:"电影",value:"01"},{label:"音乐",value:"02"},{label:"旅行",value:"03"},{label:"游戏",value:"04"}]},slots:{label:({data:n})=>e("span",{style:{color:"red"}},[e("span",null,[n.label]),e(l("icon-face-smile-fill"),null,null)])}},{type:"input-number",label:"排序",field:"sort",props:{min:0}},{type:"radio-group",label:"状态",labelRender:()=>e("div",null,[e("span",null,[o("状态")]),e(l("a-tooltip"),{content:"这里使用了tsx自定义渲染"},{default:()=>[e(l("icon-info-circle-fill"),{style:{color:"#52B852"}},null)]})]),field:"status",props:{options:b.value}},{label:"测试",field:"test",disabled:n=>n.status===0,formItemProps:{extra:"查看这里效果请切换状态"}},{type:"rate",label:"评分",field:"mark",formItemSlots:{extra:()=>e(l("a-tag"),null,{default:()=>[o("这里使用了tsx自定义渲染")]})}},{type:"switch",label:"是否隐藏",field:"hide",formItemProps:{extra:"隐藏成绩项"}},{type:"slider",label:"成绩",field:"grade",span:24,hide:n=>(n.hide&&(n.grade=0),n.hide===!0)},{type:"group-title",label:"分组标题1",field:"group-title1",span:24,formItemProps:{labelColStyle:{display:"none"}}},{type:"cascader",label:"城市",field:"city",props:{options:P},disabled:n=>n.status===0},{type:"tree-select",label:"部门",field:"dept",props:{data:F},disabled:n=>n.status===0},{type:"group-title",label:"分组标题2",field:"group-title2",span:24,formItemProps:{labelColStyle:{display:"none"}}},{type:"textarea",label:"备注",field:"remark",span:24,formItemProps:{extra:"这里是额外信息"}},{type:"upload",label:"附件",field:"file",span:24,props:{listType:"picture-card",action:"/"},formItemProps:{extra:"上传文件只支持zip、rar、doc、docx、pdf、jpg、png格式"}},{field:"btns",span:24}]),g=async()=>{if(await d.value?.formRef?.validate())return!1;S.success("验证通过")},_=()=>{d.value?.formRef?.resetFields()};return(n,a)=>{const m=l("a-button"),x=h,u=l("a-space"),f=l("a-row"),c=l("a-col"),v=l("a-card");return E(),j(v,{title:"配置表单-新增"},{extra:t(()=>[e(u,null,{default:t(()=>[e(m,{type:"primary",onClick:a[0]||(a[0]=p=>i.value=!s(i))},{default:t(()=>a[2]||(a[2]=[o("姓名必填动态设置",-1)])),_:1,__:[2]}),e(x,{code:s(z)},null,8,["code"])]),_:1})]),default:t(()=>[e(f,{gutter:30},{default:t(()=>[e(c,{xs:24,sm:24,md:12},{default:t(()=>[e(s(R),{ref_key:"formRef",ref:d,modelValue:s(r),"onUpdate:modelValue":a[1]||(a[1]=p=>O(r)?r.value=p:null),columns:s(y)},{test:t(({disabled:p})=>[o(" 自定义插槽-禁用状态："+L(p),1)]),btns:t(()=>[e(f,{justify:"end",class:"w-full"},{default:t(()=>[e(u,null,{default:t(()=>[e(m,{type:"primary",onClick:g},{default:t(()=>a[3]||(a[3]=[o("保存",-1)])),_:1,__:[3]}),e(m,{onClick:_},{default:t(()=>a[4]||(a[4]=[o("重置",-1)])),_:1,__:[4]})]),_:1})]),_:1})]),_:1},8,["modelValue","columns"])]),_:1}),e(c,{xs:24,sm:24,md:12},{default:t(()=>[e(C,{"code-json":JSON.stringify(s(r),null,"	")},null,8,["code-json"])]),_:1})]),_:1})]),_:1})}}});export{Z as _};
