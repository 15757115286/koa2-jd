const user = require('./user');
const logger = require('../utils/logger');

const routersList = [user];

function initRouters(app){
    routersList.forEach(router => {
        app.use(router.routes());
        app.use(router.allowedMethods());
    });
}
logger.info('路由(user)加载成功!');

module.exports = initRouters;