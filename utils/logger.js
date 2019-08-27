const log4js = require('log4js');
const log4jsConfig = require('../config/log4js.config');
log4js.configure(log4jsConfig);
const log = log4js.getLogger('console');
const info = log4js.getLogger('info');
const warn = log4js.getLogger('warn');
const error = log4js.getLogger('error');

const logger = {
    log(str){
        log.info(str);
    },
    info(str){
        this.log(str)
        info.info(str);
    },
    warn(str){
        this.log(str);
        warn.warn(str);
    },
    error(errorOrStr){
        this.info(errorOrStr);
        error.error(errorOrStr);
    }
}

module.exports = logger;