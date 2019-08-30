const mysql = require('mysql');
const config = require('../config/db.config');

const DATABASE_CONFIG = {
    connectionLimit:config.connectionLimit,
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database
}

let pool = null;

const createPool = exports.createPool = function createPool(config = {}){
    const mergedConfig = Object.assign({}, DATABASE_CONFIG, config);
    return mysql.createPool(mergedConfig);
}

const releasePool = exports.releasePool = function releasePool(cb){
    if(pool) {
        pool.end(typeof cb === 'function' ? cb : errorHandler);
        pool = null;
    }
}

exports.getPoolInstance = function getPoolInstance(){
    return pool;
}

function errorHandler(err){
    err && console.error(err);
}

// 和mysql的connection相同，只不过不需要传入最后一个function参数
const query = exports.query = function query(...args){
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

const insertList = exports.insertList = function insertList(tableName, keyList, list){
    const keys = `(${keyList.join()})`;
    const result = [];
    list.forEach(l => {
        const value = `(${keyList.map(key => mysql.escape(l[key]))})`;
        result.push(value);
    })
    const sql = `insert into ${tableName} ${keys} values ${result.join()}`;
    return query(sql);
}

// 预先建立连接池
pool = createPool();

