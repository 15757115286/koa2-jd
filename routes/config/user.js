const prefix = '/user';
const allowedMethods = true;
const routes = [
    {
        path:'/login',
        method:'all',
        service:'user',
        action:'login'
    }
];

module.exports = {
    prefix,
    routes,
    allowedMethods
}