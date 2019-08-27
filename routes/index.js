const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const logger = require('../utils/logger');
const routesEntry = path.resolve(__dirname, './config');
const serviceEntry = path.resolve(__dirname, '../controller')
const controllerModules = new Map();
const suffixReg = /\.js$/;
const methods = 'get|put|post|patch|delete|del|all';

function loadService(){
    logger.info('开始读取并加载controller模块....');
    const moduleNames = fs.readdirSync(serviceEntry);
    moduleNames.forEach(file => {
        const _module = processFileName(serviceEntry ,file);
        if(_module === false) return;
        const moduleName = file.replace(suffixReg, '');
        controllerModules.set(moduleName, _module);
    });
    logger.info('controller模块加载完成！');
}

function initModule(_module, app, file){
    const { prefix, routes = [], allowedMethods } = _module;
    const router = new Router();
    if(prefix){
        router.prefix(prefix);
    }
    // 配置routes
    if(Array.isArray(routes)){
        const _methods = methods.split('|');
        routes.forEach(route => {
            let { path, method = 'get', action, controller } = route;
            if(path == null || action == null || controller == null){
                return void logger.warn(`路由配置文件${file}：路由配置文件path、action、controller不能为空`);
            }
            method = method.toLowerCase();
            if(!_methods.includes(method)){
                return void logger.warn(`路由配置文件${file}：${path} -> 请求方法methods只能为${_methods.join('，')}`);
            }
            const controllerModule = controllerModules.get(controller);
            if(controllerModule == null){
                return void logger.warn(`路由配置文件${file}：${path} -> controller模块${controller}不存在`);
            }
            const actionFn = controllerModule[action];
            if(typeof actionFn !== 'function'){
                return void logger.warn(`路由配置文件${file}：${path} -> action函数${action}不存在`);
            }
            router[method](path, actionFn);
        })
    }
    app.use(router.routes());
    if(allowedMethods === true){
        app.use(router.allowedMethods());
    }
}

function processFileName(entry ,file){
    if(!/^\w+\.js$/.test(file)) return false;
    return require(path.join(entry, file));
}

module.exports = function initRouters(app){
    loadService();
    logger.info('开始读取并加载routes配置....');
    const files = fs.readdirSync(routesEntry);
    files.forEach(file => {
        const _module = processFileName(routesEntry, file);
        if(_module === false) return;
        initModule(_module, app, file);
    });
    logger.info('routes配置加载完成！');
}