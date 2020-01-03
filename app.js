const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koa_logger = require("koa-logger");
const initRouters = require("./routes");
const path = require("path");
const _static = require("koa-static");
const logger = require("./utils/logger");
const authenticate = require("./middleware/authenticate");
const authorizeConfig = require("./config/authorize.config");
const crossOriginConfig = require("./config/cor.config");
const cors = require("koa2-cors");
const postParser = require('./middleware/postParser');

// 初始化koa对象
const app = new Koa();
// 配置跨域处理
app.use(cors(crossOriginConfig));
// 配置静态资源，必须放在权限配置之前，否则请求会被拦截
const staticPath = path.resolve(__dirname, "./web-source");
app.use(_static(staticPath));
// originUrl
app.use(async (ctx, next) => {
  const startTime = Date.now();
  await next();
  const endTime = Date.now();
  const costTime = endTime - startTime;
  logger.info(`请求访问path:${ctx.path},请求IP：${ctx.ip}。花费时间:${costTime}ms`);
});
// 权限认证
app.use(authenticate(authorizeConfig));
// body内容解析
app.use(bodyParser());
app.use(postParser);
// 加载路由
initRouters(app);
app.on("error", e => {
  logger.error(e);
});
app.listen(3000);
logger.info("nodejs服务启动成功！访问端口：3000");
