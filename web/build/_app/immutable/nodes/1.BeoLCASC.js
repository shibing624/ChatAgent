import{s as D,e as p,t as u,c as v,a as _,b as g,d as f,f as b,i as I,g as l,h as y,n as E,j as V}from"../chunks/scheduler.DiJq6vPF.js";import{S as $,i as k}from"../chunks/index.BHjMAGPu.js";import{p as S}from"../chunks/stores.BW9SmnG1.js";function j(i){let t,a,e,r=i[0].status+"",c,h,n=i[0].error.message+"",d;return{c(){t=p("div"),a=p("div"),e=p("div"),c=u(r),h=u(": "),d=u(n),this.h()},l(s){t=v(s,"DIV",{class:!0});var o=_(t);a=v(o,"DIV",{class:!0});var x=_(a);e=v(x,"DIV",{class:!0});var m=_(e);c=g(m,r),h=g(m,": "),d=g(m,n),m.forEach(f),x.forEach(f),o.forEach(f),this.h()},h(){b(e,"class","m-auto my-10 dark:text-gray-300 text-3xl font-semibold"),b(a,"class","flex h-full"),b(t,"class","bg-white dark:bg-gray-800 min-h-screen")},m(s,o){I(s,t,o),l(t,a),l(a,e),l(e,c),l(e,h),l(e,d)},p(s,[o]){o&1&&r!==(r=s[0].status+"")&&y(c,r),o&1&&n!==(n=s[0].error.message+"")&&y(d,n)},i:E,o:E,d(s){s&&f(t)}}}function q(i,t,a){let e;return V(i,S,r=>a(0,e=r)),[e]}class A extends ${constructor(t){super(),k(this,t,q,j,D,{})}}export{A as component};
