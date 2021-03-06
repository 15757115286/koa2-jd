/**
 * 权限认证组件。如果不填options或缺失callback与includes则默认不进行验证操作。
 * @param {*} options 
 * options.includes 数组或者*，*的时候会验证包含的所有路由。数组可以是字符串或者正则
 * options.excludes 排除不需要认证的path。只能为数组，包含正则或者字符串。
 * options.callback(ctx) 权限认证函数，当且仅当返回true的时候会进行接下去的操作。否则会执行unauthorized函数。可以为异步函数
 * options.unauthorized(ctx) 验证失败时候返回的函数。一般会设置ctx.status与ctx.body。可以是异步函数
 */
function authenticate(options) {
  return async function (ctx, next) {
    if (options == undefined) {
      return void (await next());
    }
    const path = ctx.path;
    const includes = options.includes || [];
    const excludes = options.excludes || [];
    if (Array.isArray(excludes)) {
      for (let re of excludes) {
        if (test(re, path)) {
          return void (await next());
        }
      }
    }
    const callback = options.callback || cb;
    const unauthorized =
      typeof options.unauthorized === "function"
        ? options.unauthorized
        : _unauthorized;
    if (Array.isArray(includes)) {
      for (let re of includes) {
        if (test(re, path)) {
          let result = await callback(ctx);
          if (result !== true) {
            return void await unauthorized(ctx);
          } 
          break;
        }
      }
    } else if (includes === "*") {
      let result = await callback(ctx);
      if (result !== true) {
        return void await unauthorized(ctx);
      } 
    }
    await next();
  };
}

// 默认的验证函数，一直返回true，等于不认证
function cb(ctx) {
  return true;
}
// 验证失败时候执行的操作，这里默认是
function _unauthorized(ctx) {
  ctx.status = 401;
  ctx.body = "unauthorized";
}
// 验证是否符合规则
function test(re, path) {
  return (typeof re === "string" && re === path) ||
    (re instanceof RegExp && re.test(path))
}

module.exports = authenticate;
