const crypto = require('crypto');

function md5(content){
    return crypto.createHash('md5').update(content).digest('hex');
}

exports.encrypt = function(username, password){
    return md5(md5(password) + username);
}