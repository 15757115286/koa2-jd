const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koa_logger = require("koa-logger");
const initRouters = require("./routes");
const path = require('path');
const _static = require('koa-static');
const logger = require('./utils/logger');
const authenticate = require('./middleware/authenticate');
const authorizeConfig = require('./config/authorize.config');
const crossOriginConfig = require('./config/cor.config');
const cors = require('koa2-cors');

// 初始化koa对象
const app = new Koa();
// 配置跨域处理
app.use(cors(crossOriginConfig));
// 配置静态资源，必须放在权限配置之前，否则请求会被拦截
const staticPath = path.resolve(__dirname, './public');
app.use(_static(staticPath));
// logger
app.use(
  koa_logger((str, args) => {
    logger.info(str);
  })
);
// 权限认证
app.use(authenticate(authorizeConfig));
// body内容解析
app.use(bodyParser());
// 加载路由
initRouters(app);
app.on("error", e => {
    logger.error(e);
});
app.listen(3000);
logger.info('nodejs服务启动成功！访问端口：3000');

