import{d as e,N as a,g as l,r as t,o as s,c as o,a as d,w as r,f as u,t as m,u as n,C as i,_ as p}from"./index-bada0a94.js";const c={class:"step-2"},f=p(e({name:"Step2",__name:"Step2",props:{form:{default:()=>({payAccount:"",recAccount:"",payType:1,recName:"",amount:"0"})}},emits:["next","prev"],setup(e,{emit:p}){const f=a({password:"123456"}),_={password:[{required:!0,message:"请输入密码"}]},v=l(!1),y=l(),w=()=>{i((async()=>{var e;try{v.value=!0;await(null==(e=y.value)?void 0:e.validate())?v.value=!1:setTimeout((()=>{p("next"),v.value=!1}),1e3)}catch(a){return a}}))},b=()=>{p("prev")};return(e,a)=>{const l=t("a-descriptions-item"),i=t("a-descriptions"),p=t("a-divider"),g=t("a-input-password"),h=t("a-form-item"),x=t("a-button"),A=t("a-space"),k=t("a-form");return s(),o("div",c,[d(i,{column:1,size:"medium"},{default:r((()=>[d(l,{label:"付款账户"},{default:r((()=>[u(m(e.form.payAccount),1)])),_:1}),d(l,{label:"收款账户"},{default:r((()=>[u(m(e.form.recAccount),1)])),_:1}),d(l,{label:"收款人姓名"},{default:r((()=>[u(m(e.form.recName),1)])),_:1}),d(l,{label:"转账金额"},{default:r((()=>[u(m(e.form.amount),1)])),_:1})])),_:1}),d(p,{style:{"border-bottom-style":"dashed"}}),d(k,{ref_key:"formRef",ref:y,size:"medium",model:n(f),"auto-label-width":""},{default:r((()=>[d(h,{field:"password",label:"支付密码",rules:_.password},{default:r((()=>[d(g,{modelValue:n(f).password,"onUpdate:modelValue":a[0]||(a[0]=e=>n(f).password=e),placeholder:"请输入支付密码"},null,8,["modelValue"])])),_:1},8,["rules"]),d(h,null,{default:r((()=>[d(A,null,{default:r((()=>[d(x,{type:"primary",loading:n(v),onClick:w},{default:r((()=>[u("提交")])),_:1},8,["loading"]),d(x,{onClick:b},{default:r((()=>[u("上一步")])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])}}}),[["__scopeId","data-v-e6245a2c"]]);export{f as default};