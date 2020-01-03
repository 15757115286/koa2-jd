function parser(request){
    return new Promise((resolve, reject) => {
        let data = Buffer.alloc(0);
        request.on('data', d => {
            data = Buffer.concat([data, d]);
        });
        request.on('end', () => {
            resolve(data);
        });
        request.on('error', reject);
    });
}

module.exports = async function postParser(ctx, next){
    if(ctx.path != '/user/upload'){
        let data = await parser(ctx.req);
        ctx.rawPostData = data;
        try{
            data = JSON.parse(data.toString());
        }catch(e){
            data = {};
        }
        ctx.postData = data;
    }
    await next();
}