const mysql = require('mysql');
const { query, getPoolInstance, createPool, releasePool } = require('../../db');

exports.insertList = async function(tableName, mainKey, keys, items){
    let pool = getPoolInstance();
    if(pool == null) pool = createPool();
    for(let i = 0; i< items.length; i++){
        const item = items[i];
        const isExist = await checkExist(tableName, mainKey, item);
        let result = null;
        if(isExist){
            result = await update(tableName, mainKey, keys, item, pool);
        }else{
            result = await insert(tableName, mainKey, keys, item, pool);
        }
    }
}

async function checkExist(tableName, mainKey, item){
    const sql = `select count(*) as count from ${ tableName } where ${ mainKey } = ?`;
    const sqlFormat = mysql.format(sql, [item[mainKey]]);
    const result = await query(sqlFormat);
    const count = result[0].count;
    return count > 0;
}

async function update(tableName, mainKey, keys, item, pool){
    const escapeValueText = keys.reduce((accumulator, key, index) => {
        value = pool.escape(item[key]);
        accumulator += `${key} = ${value}`;
        if(index < keys.length - 1){
            accumulator += ',';
        }
        return accumulator;
    }, '');
    const sql = `update ${tableName} set ${ escapeValueText } where ${ mainKey } = ${ pool.escape(item[mainKey]) }`;
    return query(sql);
}

async function insert(tableName, mainKey, keys, item, pool){
    if(!keys.includes(mainKey)) keys.push(mainKey);
    const escapeValueText = keys.reduce((accumulator, key, index) => {
        value = pool.escape(item[key]);
        accumulator += value;
        if(index < keys.length - 1){
            accumulator += ',';
        }
        return accumulator;
    }, '');
    const sql = `insert into ${tableName} (${ keys.join() }) values (${ escapeValueText }) `;
    return query(sql);
}

exports.releasePool = releasePool;

