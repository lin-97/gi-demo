import{d as c,G as s,o as l,c as u,a as p,j as n,ev as m,_ as d}from"./index.08f7ddde.js";const g=["xlink:href"],f=c({name:"GiSvgIcon"}),h=c({...f,props:{name:{type:String,required:!0},color:{type:String,default:""},size:{type:[Number,String],default:20}},setup(o){const t=o,a=e=>/(px|em|rem|%)$/.test(e.toString())?e:e+"px",r=s(()=>a(t.size)),i=s(()=>`#icon-${t.name}`),_=s(()=>t.name?`svg-icon icon-${t.name}`:"svg-icon");return(e,v)=>(l(),u("svg",m({"aria-hidden":"true",class:n(_)},e.$attrs,{style:{color:o.color,fill:o.color,width:n(r),height:n(r)}}),[p("use",{"xlink:href":n(i)},null,8,g)],16))}});const S=d(h,[["__scopeId","data-v-b8baa029"]]);export{S as _};