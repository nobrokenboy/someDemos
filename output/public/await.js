var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(console.log('99119qqq1'));
        }, time);
    });
};

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var start = function () {
    arr.forEach(async () => {
        await sleep(2000);
    });
};
start();