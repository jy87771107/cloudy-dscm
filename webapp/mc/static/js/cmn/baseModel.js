/*! webwine 2016-06-28 version: 1.0.0*/
var baseModel=function(a,b){var c=function(a){a=a||{},this.initialize(a)};a(document).on("ajaxStart",function(b,c,d){var e='<div class="m-mask ajax"><div class="u-ing loading"><i></i></div><a href="javascript:;" onclick="javascript:history.go(-1);" class="goback">返回</a></div>';a("body").append(e),a("body>.m-mask.ajax").show()}),a(document).on("ajaxStop",function(b,c,d){a("body>.m-mask.ajax").hide(),a("body>.m-mask.ajax").remove()}),a.extend(c.prototype,{initialize:function(){},post:function(b){"string"==typeof b.data&&(b.data+="&_r="+Math.random());var c=a.extend(!0,{type:"POST",charset:"utf8",dataType:"json",cache:!1,timeout:1e4,data:{_r:Math.random()}},b);return a.ajax(c)},get:function(b){var c=a.extend(!0,{type:"GET",charset:"utf8",dataType:"json",cache:!1,timeout:1e4,data:{}},b);return a.ajax(c)},errorCode:function(a,c){var d="";switch(a){case 401:d=c||"请重新登录",b.showPopupTips(d),location.href="/webwine/login.html";break;case 500:d=c||"系统异常，请刷新重试",b.showPopupTips(d);break;default:d=c||"未知错误，请刷新重试",b.showPopupTips(d)}}}),window.tplObj=window.tplObj||{data:{},"tpl:":{}};var d=new c;return d}($,util);