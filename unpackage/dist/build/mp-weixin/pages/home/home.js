(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/home"],{"528c":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=s(o("2425")),e=o("2f62");function s(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{},i=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(o).filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable}))),i.forEach(function(n){r(t,n,o[n])})}return t}function r(t,n,o){return n in t?Object.defineProperty(t,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[n]=o,t}var a=function(){return o.e("components/m-input").then(o.bind(null,"17df"))},u={computed:(0,e.mapState)(["forcedLogin","hasLogin","userName"]),onLoad:function(){var n=t.getSystemInfoSync();this.x=n.windowWidth-50,this.y=(n.windowHeight-40)/2},components:{mInput:a},data:function(){return{x:0,y:0,old:{x:0,y:0},CustomBar:this.CustomBar,modalName:null,radio:"radio1",providerList:[],hasProvider:!1,account:"",password:"",positionTop:0}},methods:c({},(0,e.mapMutations)(["login"]),{showModal:function(t){this.modalName=t.currentTarget.dataset.target},hideModal:function(t){this.modalName=null},bindLogin1:function(){t.navigateTo({url:"../login/login"})},bindusercenter:function(){t.navigateTo({url:"../user/user"})},bindLogin:function(){if(this.account.length<5)return console.log(this.account.length),void t.showToast({icon:"none",mask:!0,title:"账号最短为 5 个字符"});if(this.password.length<6)return console.log(this.password.length),void t.showToast({icon:"none",title:"密码最短为 6 个字符"});var n={account:this.account,password:this.password},o=i.default.getUsers().some(function(t){return n.account===t.account&&n.password===t.password});o?this.toMain(this.account):t.showToast({icon:"none",title:"用户账号或密码不正确"})},oauth:function(n){var o=this;t.login({provider:n,success:function(i){t.getUserInfo({provider:n,success:function(t){o.toMain(t.userInfo.nickName)}})},fail:function(t){console.error("授权登录失败："+JSON.stringify(t))}})},toMain:function(n){this.login(n),this.forcedLogin?t.reLaunch({url:"../home/home"}):t.navigateBack()},onChange:function(n){var o=t.getSystemInfoSync(),i=o.windowWidth-50,e=o.windowHeight-45;this.old.x=n.detail.x,this.old.y=n.detail.y,this.old.y>e-20?(console.log("1"),this.x=this.old.x,this.y=this.old.y,this.$nextTick(function(){this.y=e-20,this.x=this.old.x})):this.old.y<-10?(console.log("1"),this.x=this.old.x,this.y=this.old.y,this.$nextTick(function(){this.y=-10,this.x=this.old.x})):this.old.x>i||this.old.x>i/2?(console.log("2"),this.x=this.old.x,this.y=this.old.y,this.$nextTick(function(){this.y=this.old.y,this.x=i+25})):(this.old.x<-25||this.old.x<i/2)&&(console.log("2"),this.x=this.old.x,this.y=this.old.y,this.$nextTick(function(){this.y=this.old.y,this.x=-25}))}})};n.default=u}).call(this,o("543d")["default"])},7461:function(t,n,o){"use strict";o.r(n);var i=o("528c"),e=o.n(i);for(var s in i)"default"!==s&&function(t){o.d(n,t,function(){return i[t]})}(s);n["default"]=e.a},"8a1f":function(t,n,o){"use strict";var i=o("d457"),e=o.n(i);e.a},c522:function(t,n,o){"use strict";o.r(n);var i=o("ce3c"),e=o("7461");for(var s in e)"default"!==s&&function(t){o.d(n,t,function(){return e[t]})}(s);o("8a1f");var c=o("2877"),r=Object(c["a"])(e["default"],i["a"],i["b"],!1,null,null,null);n["default"]=r.exports},ce3c:function(t,n,o){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c},e=[];o.d(n,"a",function(){return i}),o.d(n,"b",function(){return e})},d457:function(t,n,o){}},[["9fca","common/runtime","common/vendor"]]]);