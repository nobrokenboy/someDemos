const gulp = require('gulp');
const ftp = require('gulp-sftp');
var fs = require('fs');
var args = require('minimist')(process.argv.slice(2));

//测试环境
gulp.task('test', function () {
    fs.readFile('E://secret.json','utf-8',function(err,_data){
        if (err) {
            throw err;
            return
        }
        //读取服务器信息
        let uploadfiles = [
            "../src/main/resources/**/*.{css,js,jpg,png,svg,ttf,woff,ico}",
            "!../src/main/resources/public/**"
        ];
        let serverInfo1 = JSON.parse(_data)["testPhp"];
        //放静态文件
        let serverConf1 = {
            remotePath: '/srv/wwwroot/o-home/public/monitor',
            host: serverInfo1.host,
            user: serverInfo1.user,
            pass: serverInfo1.pass,
            port: serverInfo1.port
        }
        //轮到模版了
        let serverInfo2 = JSON.parse(_data)["testJava"];
        let serverConf2 = {
            remotePath:'/srv/dubbo/monitor/templates',
            host: serverInfo2.host,
            user: serverInfo2.user,
            pass: serverInfo2.pass,
            port: serverInfo2.port
        }

        gulp.src(uploadfiles)
            .pipe(ftp(serverConf1));
        gulp.src('../src/main/resources/templates/**.ftl')
            .pipe(ftp(serverConf2));
    })
})

//正式的，好像存在没法全部更新
gulp.task('pro', function () {
    fs.readFile('E://secret.json','utf-8',function(err,_data){
        if (err) {
            throw err;
            return
        }
        //读取服务器信息
        let uploadfiles = [
            "../src/main/resources/**/*.{css,js,jpg,png,svg}",
            "!../src/main/resources/public/**"
        ];
        let serverInfo1 = JSON.parse(_data)["prodPhp2"];
        //放静态文件
        let serverConf1 = {
            remotePath: '/hardisk/public/o-home.com/monitor',
            host: serverInfo1.host,
            user: serverInfo1.user,
            pass: serverInfo1.pass,
            port: serverInfo1.port
        }
        //轮到模版了
        let serverInfo2 = JSON.parse(_data)["proJava2"];
        let serverConf2 = {
            remotePath:'/srv/dubbo/monitor/templates',
            host: serverInfo2.host,
            user: serverInfo2.user,
            pass: serverInfo2.pass,
            port: serverInfo2.port
        }
        gulp.src(uploadfiles)
            .pipe(ftp(serverConf1));
        gulp.src('../src/main/resources/templates/**.ftl')
            .pipe(ftp(serverConf2));
    })
})
