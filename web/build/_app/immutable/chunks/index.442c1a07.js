import{d as c}from"./index.7deef04d.js";const l=async(r,n,a,e)=>{let t=null;const i=await fetch(`${c}/prompts/create`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${r}`},body:JSON.stringify({command:`/${n}`,title:a,content:e})}).then(async o=>{if(!o.ok)throw await o.json();return o.json()}).catch(o=>(t=o.detail,console.log(o),null));if(t)throw t;return i},p=async(r="")=>{let n=null;const a=await fetch(`${c}/prompts/`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${r}`}}).then(async e=>{if(!e.ok)throw await e.json();return e.json()}).then(e=>e).catch(e=>(n=e.detail,console.log(e),null));if(n)throw n;return a},h=async(r,n,a,e)=>{let t=null;const i=await fetch(`${c}/prompts/command/${n}/update`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${r}`},body:JSON.stringify({command:`/${n}`,title:a,content:e})}).then(async o=>{if(!o.ok)throw await o.json();return o.json()}).then(o=>o).catch(o=>(t=o.detail,console.log(o),null));if(t)throw t;return i},u=async(r,n)=>{let a=null;n=n.charAt(0)==="/"?n.slice(1):n;const e=await fetch(`${c}/prompts/command/${n}/delete`,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${r}`}}).then(async t=>{if(!t.ok)throw await t.json();return t.json()}).then(t=>t).catch(t=>(a=t.detail,console.log(t),null));if(a)throw a;return e};export{l as c,u as d,p as g,h as u};
