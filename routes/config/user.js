const prefix = '/user';
const allowedMethods = true;
const routes = [
    {
        path:'/login',
        method:'all',
        controller:'user',
        action:'login'
    },
    {
        path:'/checkLogin',
        method:'all',
        controller:'user',
        action:'checkLogin'
    },
    {
        path:'/findAllUsers',
        method:'all',
        controller:'user',
        action:'findAllUsers'
    },
    {
        path:'/reportMemory',
        method:'post',
        controller:'user',
        action:'reportMemory'
    },
    {
        path:'/upload',
        method:'post',
        controller:'user',
        action:'upload'
    }
];

module.exports = {
    prefix,
    routes,
    allowedMethods
}