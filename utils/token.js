const jwt = require('jsonwebtoken');
const util = require('util');
const _sign = util.promisify(jwt.sign);
const _verify = util.promisify(jwt.verify);

const secret = 'KOA2-JD';

exports.sign = function sign(payload, options){
    return _sign(payload, secret, options);
}

exports.verify = function verify(token, options){
    return _verify(token, secret,options);
}