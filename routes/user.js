const Router = require('koa-router');
const child_router = new Router();
child_router.all('/login', async (ctx, next) => {
    ctx.body = 'this is a login page!';
    await next();
});
const router = new Router();
router.use('/user',child_router.routes(),child_router.allowedMethods());
module.exports = router;