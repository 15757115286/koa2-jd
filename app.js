const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const initRouters = require("./routes");
const log4js = require('log4js');
const  log4jsConfig = require('./config/log4js-config');

// 配置log4js
log4js.configure(log4jsConfig);
const log = log4js.getLogger();
const loginfo = log4js.getLogger('info');
const logwarn = log4js.getLogger('warn');
const logerror = log4js.getLogger('error');
// 初始化koa对象
const app = new Koa();

// logger
app.use(
  logger((str, args) => {
    // redirect koa logger to other output pipe
    // default is process.stdout(by console.log function)
    logwarn.warn(str);
  })
);
// body内容解析
app.use(bodyParser());
// 加载路由
initRouters(app);
app.on("error", e => {
    // logerror.error(e);
});

app.listen(3000);
// log.info("服务启动成功！");
