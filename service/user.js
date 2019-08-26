async function login(ctx, next){
    ctx.body = 'this is a login page!';
    await next();
}

module.exports = {
    login
}