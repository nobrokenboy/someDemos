var minimist=require('minimist');
var splitOption={
    string: 'page',//会被解析为字符串
};

var option=minimist(process.argv.slice(2),splitOption);
console.log(option);
console.log(option.page);
