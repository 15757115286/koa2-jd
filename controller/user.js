const userService = require('../service/user.service');
const logger = require('../utils/logger');

async function login(ctx, next){
    ctx.body = 'this is a login page!';
    const result = await userService.register('cm1', '1994');
    console.log(result);
    await next();
}

async function checkLogin(ctx, next){
    const result = await userService.checkLogin('cm1', '1994');
    console.log(result);
    ctx.body = 'this is checkLogin api'
    await next();
}

async function findAllUsers(ctx, next){
    const result = await userService.findAllUsers();
    if(result) ctx.body = result;
    await next();
}

module.exports = {
    login,
    checkLogin,
    findAllUsers
}