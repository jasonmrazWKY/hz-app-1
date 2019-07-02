(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/t-table/t-th"],{"74b5":function(t,e,n){"use strict";var r=n("ef60"),i=n.n(r);i.a},"85dc":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{align:String},data:function(){return{thBorder:"1",borderColor:"#d0dee5",fontSize:"15",color:"#3b4246",thAlign:"center"}},inject:["table","tr"],created:function(){this.thBorder=this.table.border,this.borderColor=this.table.borderColor,this.fontSize=this.tr.fontSize,this.color=this.tr.color,this.align?this.thAlign=this.align:this.thAlign=this.tr.align},computed:{thAlignCpd:function(){var t="";switch(this.thAlign){case"left":t="flex-start";break;case"center":t="center";break;case"right":t="flex-end";break;default:t="center";break}return t}}};e.default=r},"93f0":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return i})},c35f:function(t,e,n){"use strict";n.r(e);var r=n("93f0"),i=n("cd7d");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("74b5");var a=n("2877"),c=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,null,null);e["default"]=c.exports},cd7d:function(t,e,n){"use strict";n.r(e);var r=n("85dc"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);e["default"]=i.a},ef60:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/t-table/t-th-create-component',
    {
        'components/t-table/t-th-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("c35f"))
        })
    },
    [['components/t-table/t-th-create-component']]
]);                
