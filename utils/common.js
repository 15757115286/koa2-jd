exports.sleep = function(time = 0){
    return new Promise(res => {
        setTimeout(res, time);
    });
}