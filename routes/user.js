const router = require('koa-router')();
router.prefix('/user');
router.all('/login', async (ctx, next) => {
    ctx.body = 'this is a login page!';
    await next();
});
module.exports = router;