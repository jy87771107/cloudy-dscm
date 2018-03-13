/**
 * Copyright 2015-2115 the original author or authors.
 *
 * Licensed under the MIT Licensed
 *
 * @email   dragonmail2001@163.com
 * @author  jinglong.zhaijl
 * @date    2015-10-24
 * @Source: https://github.com/dragonmail2001
 *
 */
var path = require('path');

var config  = {   
    cluster: false,
    httpport: 8001,
    timeout: 20000,
    umfs: 2097152,                                  //上传文件总大小上限2m(2 * 1024 * 1024)
    debug: true, 
    ctcp: true,                                      //是否启动websocket
    ldir: 'D:/work/cloudy-dscm/flog',                  //日志文件目录  
    fext: {
        'jpg': true,
        'jpeg': true,
        'png': true
    },  
    cftp:{
	    host: "192.168.0.227",
	    port: 21,
	    user: "devftp",
	    password: "myddev",
	    keepalive: 10000,
	    path: "/home/devftp"
    },
    cach:[
        {
            port: 6379,
            host: '127.0.0.1'     
        }, {
            port: 6390,
            host: '192.168.18.244'     
        }, {
            port: 6390,
            host: '192.168.18.244'
        }, {
            port: 6390,
            host: '192.168.18.248'    
        }
    ],
    ccps:{
        enabled: true,
        cluster: false,
        namespace:"sdcmnp",
        link:"sdcmlk",
        chat:"dscm",
        sync:{
            addr:"",
            port:5524,
            iurl:""
        },
        auth:{
            auth:"auth",
            addr:"",
            port:"",
            iurl:""
        }
    },    
    sess:{
        domain: [
            ["*.51myd.com", ".51myd.com"],
            ["*.51myd.com:*", ".51myd.com"]
        ],        
        key: 'sdcm keyboard',
        name: 'sdcm.sid',
        cluster: false,
        time: 600000                             //10分钟
    },
    cacl:{
        //"webpc":{
        //    allow:["*.cnaidai.com"],
        //    deny:[""]
        //},
        //"webchat":{
        //    allow:["wechat.cnaidai.com"]
        //}
    },    
    code: {
        path: '/verifyService?actn=code',
        hostname: '192.168.165.251',
        port: '5524',
        type: 'dscm'        
    }, 
    fdir:'D:/work/cloudy-dscm/fup',                 //前端上传文件保存的临时目录
    dcfg:'D:/work/cloudy-dscm/node/webapp'                 //前端请求资源文件本地存放路径
};

module.exports = config;