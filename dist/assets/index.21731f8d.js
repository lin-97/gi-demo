var V=Object.defineProperty,C=Object.defineProperties;var N=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var _=(o,s,e)=>s in o?V(o,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[s]=e,p=(o,s)=>{for(var e in s||(s={}))z.call(s,e)&&_(o,e,s[e]);if(c)for(var e of c(s))E.call(s,e)&&_(o,e,s[e]);return o},m=(o,s)=>C(o,N(s));import{f as w,B as S,p as f,o as T,h as U,i as t,a as d,C as v,D as g,u as i,w as h,E as A,q as I,F as L,G as x,r as l,H as B}from"./vendor.1278e709.js";import{_ as M}from"./logo.f6fa5301.js";import{_ as R}from"./index.b20256bd.js";var q="/gi-demo/assets/login-bg.793b5b0f.svg";const G={class:"login"},H={class:"login-box animated flipInY"},Y=I('<div class="login-left" data-v-7ee2f86e><img class="login-bg" src="'+q+'" data-v-7ee2f86e><div class="system" data-v-7ee2f86e><img class="logo" src="'+M+'" data-v-7ee2f86e><div class="system-name" data-v-7ee2f86e><span data-v-7ee2f86e>Admin</span><span data-v-7ee2f86e>\u7BA1\u7406\u7CFB\u7EDF</span></div></div></div>',1),j={class:"login-right"},J={class:"form"},K={class:"form-item"},O={class:"form-item"},P={class:"check"},Q=B(" \u4FDD\u6301\u767B\u5F55\u72B6\u6001 "),W=B("\u767B\u5F55"),X=w({name:"Login"}),Z=w(m(p({},X),{setup(o){const s=L(),e=S({username:"admin",password:"123"});let u=f(!1),r=f(!1);const F=()=>{if(!e.username)return x.warning("\u8BF7\u8F93\u5165\u8D26\u6237\u540D\u79F0");if(!e.password)return x.warning("\u8BF7\u8F93\u5165\u8D26\u6237\u5BC6\u7801");r.value=!0,setTimeout(()=>{s.push("/home"),r.value=!1},800)};return($,a)=>{const k=l("icon-user"),y=l("icon-lock"),b=l("a-checkbox"),D=l("a-button");return T(),U("div",G,[t("section",H,[Y,t("div",j,[t("section",J,[t("div",K,[d(k,{"stroke-width":1,style:{fontSize:"20px"}}),v(t("input",{type:"text",placeholder:"\u8D26\u53F7","onUpdate:modelValue":a[0]||(a[0]=n=>i(e).username=n)},null,512),[[g,i(e).username]])]),t("div",O,[d(y,{"stroke-width":1,style:{fontSize:"20px"}}),v(t("input",{type:"password",placeholder:"\u5BC6\u7801","onUpdate:modelValue":a[1]||(a[1]=n=>i(e).password=n)},null,512),[[g,i(e).password]])]),t("div",P,[d(b,{modelValue:i(u),"onUpdate:modelValue":a[2]||(a[2]=n=>A(u)?u.value=n:u=n)},{default:h(()=>[Q]),_:1},8,["modelValue"])]),t("div",null,[d(D,{type:"primary",size:"large",long:"",loading:i(r),onClick:F},{default:h(()=>[W]),_:1},8,["loading"])])])])])])}}}));var ae=R(Z,[["__scopeId","data-v-7ee2f86e"]]);export{ae as default};