// log4j的配置文件
const path = require("path");
const basePath = path.resolve(__dirname, "../logs");
const infoPath = `${basePath}/info/info.log`; // 日志文件输出的位置
const warnPath = `${basePath}/warn/warn.log`; // 告警文件输出的位置
const errorPath = `${basePath}/error/error.log`; // 错误文件输出位置 
const config = {
  appenders: {
    info: {
      type: "dateFile",
      filename: infoPath,
      keepFileExt: true,
      alwaysIncludePattern: true,
      daysToKeep: 3,
      pattern:'yyyy-MM-dd'
    },
    warn: {
      type: "dateFile",
      filename: warnPath,
      keepFileExt: true,
      alwaysIncludePattern: true,
      daysToKeep: 7,
      pattern:'yyyy-MM-dd'
    },
    error: {
      type: "dateFile",
      filename: errorPath,
      keepFileExt: true,
      alwaysIncludePattern: true,
      daysToKeep: 15,
      pattern:'yyyy-MM-dd'
    },
    out: {
      type: "console",
      layout:{ type:'coloured' }
    }
  },
  categories: {
    default: { appenders: ["out"], level: "all" },
    info: { appenders: ["info"], level: "info" },
    warn: { appenders: ["warn"], level: "warn" },
    error: { appenders: ["error"], level: "error" }
  }
};
module.exports = config;
