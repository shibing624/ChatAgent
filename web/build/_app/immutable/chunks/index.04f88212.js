import{R as c}from"./index.7deef04d.js";const l=async a=>{let n=null;const o=await fetch(`${c}/config`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}}).then(async t=>{if(!t.ok)throw await t.json();return t.json()}).catch(t=>(console.log(t),n=t.detail,null));if(n)throw n;return o},h=async(a,n)=>{let o=null;const t=await fetch(`${c}/config/update`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({...n})}).then(async e=>{if(!e.ok)throw await e.json();return e.json()}).catch(e=>(console.log(e),o=e.detail,null));if(o)throw o;return t},u=async a=>{let n=null;const o=await fetch(`${c}/query/settings`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}}).then(async t=>{if(!t.ok)throw await t.json();return t.json()}).catch(t=>(console.log(t),n=t.detail,null));if(n)throw n;return o},d=async(a,n)=>{let o=null;const t=await fetch(`${c}/query/settings/update`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({...n})}).then(async e=>{if(!e.ok)throw await e.json();return e.json()}).catch(e=>(console.log(e),o=e.detail,null));if(o)throw o;return t},p=async(a,n,o)=>{const t=new FormData;t.append("file",o),t.append("collection_name",n);let e=null;const r=await fetch(`${c}/doc`,{method:"POST",headers:{Accept:"application/json",authorization:`Bearer ${a}`},body:t}).then(async i=>{if(!i.ok)throw await i.json();return i.json()}).catch(i=>(e=i.detail,console.log(i),null));if(e)throw e;return r},w=async(a,n,o)=>{let t=null;const e=await fetch(`${c}/web`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${a}`},body:JSON.stringify({url:o,collection_name:n})}).then(async r=>{if(!r.ok)throw await r.json();return r.json()}).catch(r=>(t=r.detail,console.log(r),null));if(t)throw t;return e},f=async a=>{let n=null;const o=await fetch(`${c}/scan`,{method:"GET",headers:{Accept:"application/json",authorization:`Bearer ${a}`}}).then(async t=>{if(!t.ok)throw await t.json();return t.json()}).catch(t=>(n=t.detail,null));if(n)throw n;return o},y=async a=>{let n=null;const o=await fetch(`${c}/reset`,{method:"GET",headers:{Accept:"application/json",authorization:`Bearer ${a}`}}).then(async t=>{if(!t.ok)throw await t.json();return t.json()}).catch(t=>(n=t.detail,null));if(n)throw n;return o};export{w as a,u as b,h as c,d,l as g,y as r,f as s,p as u};
