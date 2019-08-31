const rp = require('request-promise');
const cheerio = require('cheerio');
const { getRandomUserAgent } = require('../user-agent');
const { sleep } = require('../common');
const { query } = require('../../db');
const { insertList, releasePool } = require('./common.utils');
const FIRST_PAGE = 'https://www.biqugeso.com/wanben/1';

let totalCount = 0;
let currentPage = 1;

async function fetch(url){
    const html = await request(url);
    const result = processHtml(html);
    const { nextUrl, items } = result;
    totalCount += items.length;
    const opRes = await addOrUpdate(items);
    console.log(`当前页数：${ currentPage++ }已经爬取完成，当前页小说书数：${ items.length }，总共爬取数：${ totalCount }`)
    if(nextUrl){
        const sleepTime = 100 + Math.random() * 500;
        await sleep(sleepTime);
        await fetch(nextUrl);
    }
}

function processHtml(html){
    const $ = cheerio.load(html);
    let items = $('.table tr:not(:nth-child(1))');
    const nextUrl = $('a.next').attr('href') || null;
    items = Array.from(items).map(item => {
        const tds = $('td', item);
        const book_type = $(tds[0]).text().trim();
        const link = $('a' ,tds[1]);
        const book_link = link.attr('href');
        const book_name = link.text().trim();
        const chapterLink = $('a', tds[2]);
        const last_chapter_name = chapterLink.text().trim();
        const last_chapter_link = chapterLink.attr('href');
        const author = $(tds[3]).text().trim();
        const last_update_time = $(tds[4]).text().trim();
        return {
            book_type,
            book_link,
            book_name,
            last_chapter_link,
            last_chapter_name,
            author,
            last_update_time
        }
    });
    return {
        items,
        nextUrl
    }
}

async function addOrUpdate(items){
    if(items.length){
        const firstItem = items[0];
        const mainKey = 'book_link';
        const tableName = 'book';
        const keys = Object.keys(firstItem).filter(_ => _!= mainKey);
        return insertList(tableName, mainKey, keys, items);
    }
}

function request(url){
    const userAgent = getRandomUserAgent();
    return rp({
        url,
        method:'GET',
        headers:{
            'User-Agent':userAgent
        }
    });
}

fetch(FIRST_PAGE).then(() => {
    console.log('小说爬取完毕，总共爬取完本小说数目：' + totalCount);
    releasePool();
}).catch(e => {
    console.error(e);
    releasePool();
});