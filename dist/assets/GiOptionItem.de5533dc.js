var g=Object.defineProperty,f=Object.defineProperties;var h=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var c=(e,t,a)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,l=(e,t)=>{for(var a in t||(t={}))y.call(t,a)&&c(e,a,t[a]);if(r)for(var a of r(t))x.call(t,a)&&c(e,a,t[a]);return e},p=(e,t)=>f(e,h(t));import{_ as m,o,c as _,s as n,d as u,h as k,a as i,l as d,N as w,y as C,E as I,X as B}from"./index.c341e803.js";const G={},b={class:"gi-option"};function O(e,t){return o(),_("ul",b,[n(e.$slots,"default",{},void 0,!0)])}var V=m(G,[["render",O],["__scopeId","data-v-0a8724a6"]]);const $={class:"wrap"},S={class:"icon-wrapper"},z=u({name:"GiOptionItem"}),N=u(p(l({},z),{props:{icon:{type:String,default:""},label:{type:String,default:""},more:{type:Boolean,default:!1},active:{type:Boolean,default:!1}},emits:["click"],setup(e,{emit:t}){const a=()=>{t("click")};return(s,D)=>{const v=k("IconRight");return o(),_("li",{class:B(["gi-option-item",{more:e.more,active:e.active}]),onClick:a},[i("section",$,[i("span",S,[n(s.$slots,"icon",{},()=>[(o(),d(w(e.icon),{size:16,"stroke-width":2}))],!0)]),n(s.$slots,"default",{},()=>[i("span",null,C(e.label),1)],!0)]),e.more?(o(),d(v,{key:0})):I("",!0)],2)}}}));var j=m(N,[["__scopeId","data-v-52606a47"]]);export{j as G,V as a};