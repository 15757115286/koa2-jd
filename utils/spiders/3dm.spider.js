const request = require('request-promise');
const cheerio = require('cheerio');
const { insertList , releasePool, getPoolInstance, query} = require('../../db/index');

function fetchHtml(url){
    return request.get(url);
}

async function processHtml(html){
    const $ = cheerio.load(html);
    const next = $('.next:not(.disabled)');
    let nextUrl = null;
    if(next){
        nextUrl = next.children('a').attr('href');
    }
    const list = $('.ztliswrap .lis');
    const result = [];
    list.each((index ,el) => {
        el = $(el);
        const imgUrl = $('.img img', el).attr('src');
        const link = $('a:nth-child(1)', el).attr('href');
        const nameEl = el.children('.bt');
        const gameName = nameEl[0].childNodes[0].data.trim();
        const gameAlias = nameEl.children('span').text().trim();
        const info = Array.from($('.info li', el)).map(e => $(e).text().trim()).join(); 
        const describe = el.children('.miaoshu').text().trim();
        const score = $('.scorewrap font', el).text();
        result.push({ img_url:imgUrl, game_name:gameName, game_alias:gameAlias, info, game_describe:describe, score, game_link:link });
    });
    for(let i = 0; i < result.length; i++){
        const res = result[i];
        const isExist = await checkExistGame(res.game_name);
        if(isExist){
            await updateGameInfo(res);
        }else{
            await insertGameInfo(res);
        }
    }
    return { nextUrl, count:result.length };
}

async function start(url, total = 0){ 
    const html = await fetchHtml(url)
    const { nextUrl, count } = await processHtml(html);
    if(nextUrl) {
        const sleepTime = 200 + 1000 * Math.random();
        await sleep(sleepTime);
        total = await start(nextUrl, total + count);
    }else{
        total += count;
    }
    return total;
}

function sleep(time){
    return new Promise(res => {
        setTimeout(res, time);
    })
}

async function checkExistGame(name){
    const pool = getPoolInstance();
    const sql = `select count(*) as count from game where game_name = ${pool.escape(name)}`;
    const count = (await query(sql))[0].count;
    return count > 0;
}

async function insertGameInfo(obj){
    const pool = getPoolInstance();
    const keys = Object.keys(obj);
    const insertFields = keys.map(key => {
        return pool.escape(obj[key]);
    });
    const sql = `insert into game (${keys.join()}) values (${insertFields.join()})`;
    return query(sql);
}

async function updateGameInfo(obj){
    const pool = getPoolInstance();
    const keys = Object.keys(obj);
    const fields = keys.map(key => {
        return `${ key } = ${pool.escape(obj[key])}`
    }) 
    const sql = `update game set ${fields.join()} where game_name = ${ pool.escape(obj.game_name) }`
    return query(sql);
}

start('https://www.3dmgame.com/games/ns_2_1/').then((total)=>{
    console.log('执行完毕！总共获取游戏条数：' + total);
    releasePool();
}).catch(e => {
    releasePool();
    console.error(e);
})
