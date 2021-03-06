const userService = require("../service/user.service");
const logger = require("../utils/logger");
const sign = require("../utils/token").sign;
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const util = require("util");
const chalk = require("chalk");
const colors = require("colors/safe");

async function login(ctx, next) {
  ctx.body = "this is a login page!";
  console.log(ctx.request.body);
  console.log(ctx.request.rawBody);
  // const result = await userService.register('cm1', '1994');
  // console.log(result);
  await next();
}

async function checkLogin(ctx, next) {
  const result = await userService.checkLogin("cm1", "1994");
  console.log(result);
  ctx.body = "this is checkLogin api";
  await next();
}

async function findAllUsers(ctx, next) {
  const result = await userService.findAllUsers();
  if (result) ctx.body = result;
  await next();
}

async function reportMemory(ctx, next) {
  const data = ctx.postData || {};
  data.ip = ctx.ip;
  const result = await userService.reportMemory(data);
  if (result && result.affectedRows == 1) {
    ctx.body = "receive report!";
  } else {
    ctx.body = "error!";
    ctx.status = 500;
  }
}

// 文件上传功能
async function upload(ctx, next) {
  let data = ctx.rawPostData;
  let parseData = ctx.postData;
  let type = ctx.get("Content-Type");
  if (/^image\//.test(type)) {
    const name = "file_" + Date.now() + ".jpg";
    const destination = fs.createWriteStream(
      path.resolve(__dirname, "../download", name)
    );
    destination.end(data);
    ctx.body = "success";
  } else {
    let form = new formidable.IncomingForm();
    const promise = new Promise((resolve, reject) => {
      form.parse(ctx.req, function(err, fields, files) {
        try {
          for (let key in files) {
            const file = files[key];
            const { path: _path, name } = file;
            const rs = fs.createReadStream(_path, { emitClose: true });
            const ws = fs.createWriteStream(
              path.resolve(__dirname, "../download", name)
            );
            rs.pipe(ws);
            rs.on("close", () => {
              console.log(colors.green(`[INFO] 删除临时文件:${_path}`));
              fs.unlink(_path, err => {
                err && console.log(err);
              });
            });
          }
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
    try{
        await promise;
        ctx.status = 200;
        ctx.body = "success";
    }catch(e){
        ctx.status = 500;
        ctx.body = e.message;
    }
  }
}

module.exports = {
  login,
  checkLogin,
  findAllUsers,
  reportMemory,
  upload
};
