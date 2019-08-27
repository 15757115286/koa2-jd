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
    }
];

module.exports = {
    prefix,
    routes,
    allowedMethods
}