// 文件跨域配置
module.exports = {
    origin:'*',
    maxAge: 3600,
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Accept', 'Token']
}