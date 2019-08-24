const log4js = require('log4js');
const log4jsConfig = require('../config/log4js-config');
log4js.configure(log4jsConfig);
const log = log4js.getLogger();
const info = log4js.getLogger('info');
const warn = log4js.getLogger('warn');
const error = log4js.getLogger('error');

function formatText(type, str){
    const startTag = `******************** ${type} ********************`;
    const end
}

const logger = {
    log(str){

    },
    warn(str){

    },
    info(str){

    },
    error(errorOrStr){

    }
}

module.exports = logger;