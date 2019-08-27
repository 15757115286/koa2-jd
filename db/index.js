const mysql = require('mysql');
const config = require('../config/db.config');

const pool = mysql.createPool({
    connectionLimit:config.connectionLimit,
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database
});

// 和mysql的connection相同，只不过不需要传入最后一个function参数
exports.query = function query(...args){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) return void reject(err);
            connection.query(...args, (error, results, fields) => {
                if(error) {
                    reject(error);
                }else{
                    resolve(results);
                }
                connection.release();
            });
        });
    });
}

