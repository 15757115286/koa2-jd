const logger = require('../utils/logger');
const verify = require('../utils/token').verify;

const config = {
    includes: '*',
    excludes: [
        /^\/user/,
        '/favicon.ico'
    ],
    async callback(ctx) {
        const token = ctx.get('token');
        try{
            const decode = await verify(token);
            ctx.userInfo = decode;
            return true;
        }catch(e){
            ctx.authenError = e;
        }
        return false;
    },
    async unauthorized(ctx) {
        ctx.status = 401;
        ctx.body = JSON.stringify(ctx.authenError);
    }
}

module.exports = config;