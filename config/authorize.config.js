const logger = require('../utils/logger');

const config = {
    includes: '*',
    excludes: [
        /^\/user\//,
        '/favicon.ico'
    ],
    callback(ctx) {
        logger.log('callback');
        return false;
    },
    unauthorized(ctx) {
        ctx.status = 401;
        ctx.body = '该操作没有权限！';
    }
}

module.exports = config;