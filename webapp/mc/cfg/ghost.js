var log4js = require('log4js');

log4js.loadAppender("dateFile");
log4js.addAppender(log4js.appenderMakers['dateFile']({  
    filename:"C:/Workspace/hn/project/cloudy-dscm/flog/mc.log",  
    pattern: '.yyyy-MM-dd',alwaysIncludePattern: true,  
    layout: {
        type: 'pattern',
        pattern: '[%d %p %c] %m%n'
    }  
}), 'mc'); 

module.exports = {
    getLogger:function() {
        return log4js.getLogger('mc');
    },
    dscm:{
        mcc:{
            addr:'192.168.0.218',
            port:5522
        }
    },
    wapLoginHost:{
        url: "http://www.51myd.com/mc"
    },
    uploadHost: {
        url: "http://adtp.51myd.com"
    }
}