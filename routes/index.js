const user = require('./user');

const routersList = [user];

function initRouters(app){
    routersList.forEach(router => {
        app.use(router.routes());
        app.use(router.allowedMethods());
    });
    console.log('路由加载完毕！');
}

module.exports = initRouters;