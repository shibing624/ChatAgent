import{a as Y,c as q}from"./_commonjsHelpers.de833af9.js";let V;const $=new Uint8Array(16);function L(){if(!V&&(V=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!V))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return V($)}const m=[];for(let h=0;h<256;++h)m.push((h+256).toString(16).slice(1));function X(h,r=0){return m[h[r+0]]+m[h[r+1]]+m[h[r+2]]+m[h[r+3]]+"-"+m[h[r+4]]+m[h[r+5]]+"-"+m[h[r+6]]+m[h[r+7]]+"-"+m[h[r+8]]+m[h[r+9]]+"-"+m[h[r+10]]+m[h[r+11]]+m[h[r+12]]+m[h[r+13]]+m[h[r+14]]+m[h[r+15]]}const G=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),K={randomUUID:G};function Q(h,r,x){if(K.randomUUID&&!r&&!h)return K.randomUUID();h=h||{};const f=h.random||(h.rng||L)();if(f[6]=f[6]&15|64,f[8]=f[8]&63|128,r){x=x||0;for(let F=0;F<16;++F)r[x+F]=f[F];return r}return X(f)}var Z={exports:{}};const tt={},et=Object.freeze(Object.defineProperty({__proto__:null,default:tt},Symbol.toStringTag,{value:"Module"})),k=Y(et);/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.10.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2023
 * @license MIT
 */(function(h){(function(){var r="input is invalid type",x=typeof window=="object",f=x?window:{};f.JS_SHA256_NO_WINDOW&&(x=!1);var F=!x&&typeof self=="object",O=!f.JS_SHA256_NO_NODE_JS&&typeof process=="object"&&process.versions&&process.versions.node;O?f=q:F&&(f=self);var W=!f.JS_SHA256_NO_COMMON_JS&&!0&&h.exports,S=!f.JS_SHA256_NO_ARRAY_BUFFER&&typeof ArrayBuffer<"u",a="0123456789abcdef".split(""),M=[-2147483648,8388608,32768,128],g=[24,16,8,0],C=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],R=["hex","array","digest","arrayBuffer"],y=[];(f.JS_SHA256_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(t){return Object.prototype.toString.call(t)==="[object Array]"}),S&&(f.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW||!ArrayBuffer.isView)&&(ArrayBuffer.isView=function(t){return typeof t=="object"&&t.buffer&&t.buffer.constructor===ArrayBuffer});var D=function(t,n){return function(o){return new b(n,!0).update(o)[t]()}},_=function(t){var n=D("hex",t);O&&(n=A(n,t)),n.create=function(){return new b(t)},n.update=function(c){return n.create().update(c)};for(var o=0;o<R.length;++o){var i=R[o];n[i]=D(i,t)}return n},A=function(t,n){var o=k,i=k.Buffer,c=n?"sha224":"sha256",s;i.from&&!f.JS_SHA256_NO_BUFFER_FROM?s=i.from:s=function(e){return new i(e)};var l=function(e){if(typeof e=="string")return o.createHash(c).update(e,"utf8").digest("hex");if(e==null)throw new Error(r);return e.constructor===ArrayBuffer&&(e=new Uint8Array(e)),Array.isArray(e)||ArrayBuffer.isView(e)||e.constructor===i?o.createHash(c).update(s(e)).digest("hex"):t(e)};return l},N=function(t,n){return function(o,i){return new j(o,n,!0).update(i)[t]()}},P=function(t){var n=N("hex",t);n.create=function(c){return new j(c,t)},n.update=function(c,s){return n.create(c).update(s)};for(var o=0;o<R.length;++o){var i=R[o];n[i]=N(i,t)}return n};function b(t,n){n?(y[0]=y[16]=y[1]=y[2]=y[3]=y[4]=y[5]=y[6]=y[7]=y[8]=y[9]=y[10]=y[11]=y[12]=y[13]=y[14]=y[15]=0,this.blocks=y):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}b.prototype.update=function(t){if(!this.finalized){var n,o=typeof t;if(o!=="string"){if(o==="object"){if(t===null)throw new Error(r);if(S&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!Array.isArray(t)&&(!S||!ArrayBuffer.isView(t)))throw new Error(r)}else throw new Error(r);n=!0}for(var i,c=0,s,l=t.length,e=this.blocks;c<l;){if(this.hashed&&(this.hashed=!1,e[0]=this.block,e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),n)for(s=this.start;c<l&&s<64;++c)e[s>>2]|=t[c]<<g[s++&3];else for(s=this.start;c<l&&s<64;++c)i=t.charCodeAt(c),i<128?e[s>>2]|=i<<g[s++&3]:i<2048?(e[s>>2]|=(192|i>>6)<<g[s++&3],e[s>>2]|=(128|i&63)<<g[s++&3]):i<55296||i>=57344?(e[s>>2]|=(224|i>>12)<<g[s++&3],e[s>>2]|=(128|i>>6&63)<<g[s++&3],e[s>>2]|=(128|i&63)<<g[s++&3]):(i=65536+((i&1023)<<10|t.charCodeAt(++c)&1023),e[s>>2]|=(240|i>>18)<<g[s++&3],e[s>>2]|=(128|i>>12&63)<<g[s++&3],e[s>>2]|=(128|i>>6&63)<<g[s++&3],e[s>>2]|=(128|i&63)<<g[s++&3]);this.lastByteIndex=s,this.bytes+=s-this.start,s>=64?(this.block=e[16],this.start=s-64,this.hash(),this.hashed=!0):this.start=s}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},b.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,n=this.lastByteIndex;t[16]=this.block,t[n>>2]|=M[n&3],this.block=t[16],n>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},b.prototype.hash=function(){var t=this.h0,n=this.h1,o=this.h2,i=this.h3,c=this.h4,s=this.h5,l=this.h6,e=this.h7,u=this.blocks,p,v,w,E,d,U,B,H,J,T,z;for(p=16;p<64;++p)d=u[p-15],v=(d>>>7|d<<25)^(d>>>18|d<<14)^d>>>3,d=u[p-2],w=(d>>>17|d<<15)^(d>>>19|d<<13)^d>>>10,u[p]=u[p-16]+v+u[p-7]+w<<0;for(z=n&o,p=0;p<64;p+=4)this.first?(this.is224?(H=300032,d=u[0]-1413257819,e=d-150054599<<0,i=d+24177077<<0):(H=704751109,d=u[0]-210244248,e=d-1521486534<<0,i=d+143694565<<0),this.first=!1):(v=(t>>>2|t<<30)^(t>>>13|t<<19)^(t>>>22|t<<10),w=(c>>>6|c<<26)^(c>>>11|c<<21)^(c>>>25|c<<7),H=t&n,E=H^t&o^z,B=c&s^~c&l,d=e+w+B+C[p]+u[p],U=v+E,e=i+d<<0,i=d+U<<0),v=(i>>>2|i<<30)^(i>>>13|i<<19)^(i>>>22|i<<10),w=(e>>>6|e<<26)^(e>>>11|e<<21)^(e>>>25|e<<7),J=i&t,E=J^i&n^H,B=e&c^~e&s,d=l+w+B+C[p+1]+u[p+1],U=v+E,l=o+d<<0,o=d+U<<0,v=(o>>>2|o<<30)^(o>>>13|o<<19)^(o>>>22|o<<10),w=(l>>>6|l<<26)^(l>>>11|l<<21)^(l>>>25|l<<7),T=o&i,E=T^o&t^J,B=l&e^~l&c,d=s+w+B+C[p+2]+u[p+2],U=v+E,s=n+d<<0,n=d+U<<0,v=(n>>>2|n<<30)^(n>>>13|n<<19)^(n>>>22|n<<10),w=(s>>>6|s<<26)^(s>>>11|s<<21)^(s>>>25|s<<7),z=n&o,E=z^n&i^T,B=s&l^~s&e,d=c+w+B+C[p+3]+u[p+3],U=v+E,c=t+d<<0,t=d+U<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+t<<0,this.h1=this.h1+n<<0,this.h2=this.h2+o<<0,this.h3=this.h3+i<<0,this.h4=this.h4+c<<0,this.h5=this.h5+s<<0,this.h6=this.h6+l<<0,this.h7=this.h7+e<<0},b.prototype.hex=function(){this.finalize();var t=this.h0,n=this.h1,o=this.h2,i=this.h3,c=this.h4,s=this.h5,l=this.h6,e=this.h7,u=a[t>>28&15]+a[t>>24&15]+a[t>>20&15]+a[t>>16&15]+a[t>>12&15]+a[t>>8&15]+a[t>>4&15]+a[t&15]+a[n>>28&15]+a[n>>24&15]+a[n>>20&15]+a[n>>16&15]+a[n>>12&15]+a[n>>8&15]+a[n>>4&15]+a[n&15]+a[o>>28&15]+a[o>>24&15]+a[o>>20&15]+a[o>>16&15]+a[o>>12&15]+a[o>>8&15]+a[o>>4&15]+a[o&15]+a[i>>28&15]+a[i>>24&15]+a[i>>20&15]+a[i>>16&15]+a[i>>12&15]+a[i>>8&15]+a[i>>4&15]+a[i&15]+a[c>>28&15]+a[c>>24&15]+a[c>>20&15]+a[c>>16&15]+a[c>>12&15]+a[c>>8&15]+a[c>>4&15]+a[c&15]+a[s>>28&15]+a[s>>24&15]+a[s>>20&15]+a[s>>16&15]+a[s>>12&15]+a[s>>8&15]+a[s>>4&15]+a[s&15]+a[l>>28&15]+a[l>>24&15]+a[l>>20&15]+a[l>>16&15]+a[l>>12&15]+a[l>>8&15]+a[l>>4&15]+a[l&15];return this.is224||(u+=a[e>>28&15]+a[e>>24&15]+a[e>>20&15]+a[e>>16&15]+a[e>>12&15]+a[e>>8&15]+a[e>>4&15]+a[e&15]),u},b.prototype.toString=b.prototype.hex,b.prototype.digest=function(){this.finalize();var t=this.h0,n=this.h1,o=this.h2,i=this.h3,c=this.h4,s=this.h5,l=this.h6,e=this.h7,u=[t>>24&255,t>>16&255,t>>8&255,t&255,n>>24&255,n>>16&255,n>>8&255,n&255,o>>24&255,o>>16&255,o>>8&255,o&255,i>>24&255,i>>16&255,i>>8&255,i&255,c>>24&255,c>>16&255,c>>8&255,c&255,s>>24&255,s>>16&255,s>>8&255,s&255,l>>24&255,l>>16&255,l>>8&255,l&255];return this.is224||u.push(e>>24&255,e>>16&255,e>>8&255,e&255),u},b.prototype.array=b.prototype.digest,b.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),n=new DataView(t);return n.setUint32(0,this.h0),n.setUint32(4,this.h1),n.setUint32(8,this.h2),n.setUint32(12,this.h3),n.setUint32(16,this.h4),n.setUint32(20,this.h5),n.setUint32(24,this.h6),this.is224||n.setUint32(28,this.h7),t};function j(t,n,o){var i,c=typeof t;if(c==="string"){var s=[],l=t.length,e=0,u;for(i=0;i<l;++i)u=t.charCodeAt(i),u<128?s[e++]=u:u<2048?(s[e++]=192|u>>6,s[e++]=128|u&63):u<55296||u>=57344?(s[e++]=224|u>>12,s[e++]=128|u>>6&63,s[e++]=128|u&63):(u=65536+((u&1023)<<10|t.charCodeAt(++i)&1023),s[e++]=240|u>>18,s[e++]=128|u>>12&63,s[e++]=128|u>>6&63,s[e++]=128|u&63);t=s}else if(c==="object"){if(t===null)throw new Error(r);if(S&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!Array.isArray(t)&&(!S||!ArrayBuffer.isView(t)))throw new Error(r)}else throw new Error(r);t.length>64&&(t=new b(n,!0).update(t).array());var p=[],v=[];for(i=0;i<64;++i){var w=t[i]||0;p[i]=92^w,v[i]=54^w}b.call(this,n,o),this.update(v),this.oKeyPad=p,this.inner=!0,this.sharedMemory=o}j.prototype=new b,j.prototype.finalize=function(){if(b.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();b.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(t),b.prototype.finalize.call(this)}};var I=_();I.sha256=I,I.sha224=_(!0),I.sha256.hmac=P(),I.sha224.hmac=P(!0),W?h.exports=I:(f.sha256=I.sha256,f.sha224=I.sha224)})()})(Z);const at=h=>{let r="";return new TransformStream({transform(x,f){r+=x;const F=r.split(h);F.slice(0,-1).forEach(O=>f.enqueue(O)),r=F[F.length-1]},flush(x){r&&x.enqueue(r)}})},ht=h=>{const r={messages:{},currentId:null};let x=null,f=null;for(const F of h)f=Q(),x!==null&&(r.messages[x].childrenIds=[...r.messages[x].childrenIds,f]),r.messages[f]={...F,id:f,parentId:x,childrenIds:[]},x=f;return r.currentId=f,r},ot=h=>{if(!navigator.clipboard){const r=document.createElement("textarea");r.value=h,r.style.top="0",r.style.left="0",r.style.position="fixed",document.body.appendChild(r),r.focus(),r.select();try{const f=document.execCommand("copy")?"successful":"unsuccessful";console.log("Fallback: Copying text command was "+f)}catch(x){console.error("Fallback: Oops, unable to copy",x)}document.body.removeChild(r);return}navigator.clipboard.writeText(h).then(function(){console.log("Async: Copying to clipboard was successful!")},function(r){console.error("Async: Could not copy text: ",r)})},ct=(h,r)=>r==="0.0.0"?!1:r.localeCompare(h,void 0,{numeric:!0,sensitivity:"case",caseFirst:"upper"})<0,ft=h=>{const r=/\[([^\]]+)\]/g,x=[];let f;for(;(f=r.exec(h))!==null;)x.push({word:f[1],startIndex:f.index,endIndex:r.lastIndex-1});return x},xt=h=>{const r=h.split(" "),x=r.findIndex(F=>F.startsWith("#"));return x!==-1&&r.splice(x,1),r.join(" ")},lt=h=>h.toLowerCase().replace(/[^\w\s]/g,"").replace(/\s+/g,"-"),ut=h=>"mapping"in h[0]?"openai":"webui",rt=h=>{var S,a,M,g,C,R,y,D;const r=h.mapping,x=[];let f="",F=null;for(let _ in r){const A=r[_];f=_;try{if(x.length==0&&(A.message==null||((S=A.message.content.parts)==null?void 0:S[0])==""&&A.message.content.text==null))continue;{const N={id:_,parentId:F,childrenIds:A.children||[],role:((M=(a=A.message)==null?void 0:a.author)==null?void 0:M.role)!=="user"?"assistant":"user",content:((R=(C=(g=A.message)==null?void 0:g.content)==null?void 0:C.parts)==null?void 0:R[0])||((D=(y=A.message)==null?void 0:y.content)==null?void 0:D.text)||"",model:"gpt-3.5-turbo",done:!0,context:null};x.push(N),F=f}}catch(N){console.log("Error with",A,`
Error:`,N)}}let O={};return x.forEach(_=>O[_.id]=_),{history:{currentId:f,messages:O},models:["gpt-3.5-turbo"],messages:x,options:{},timestamp:h.create_time,title:h.title??"New Chat"}},st=h=>{const r=h.messages;if(r.length===0||r[r.length-1].childrenIds.length!==0||r[0].parentId!==null)return!1;for(let F of r)if(typeof F.content!="string")return!1;return!0},dt=h=>{const r=[];let x=0;for(let f of h){const F=rt(f);st(F)?r.push({id:f.id,user_id:"",title:f.title,chat:F,timestamp:f.timestamp}):x++}return console.log(x,"Conversations could not be imported"),r},Ft=h=>{let r;try{r=new URL(h)}catch{return!1}return r.protocol==="http:"||r.protocol==="https:"},it=h=>{const r=/[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;return h.replace(r,"")},pt=h=>h.split(new RegExp("(?<=[.!?])")).map(x=>it(x.trim())).filter(x=>x!==""),yt=(h,r)=>new File([h],r,{type:h.type});export{ct as a,dt as b,ot as c,ht as d,yt as e,ft as f,ut as g,pt as h,Ft as i,xt as r,at as s,lt as t,Q as v};
