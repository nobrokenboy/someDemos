//后端输出目录的前缀(相对于当前文件的路径)
var publicUrlPrefix='../src/main/resources';
var util=require('./utils/util');
const path=require('path');
const webpack = require('webpack');
function resolve(dir){
    return path.join(__dirname,dir);
}

const cdn = {
    css: ['xxx.css', 'sss.js'],
    js: ['xxxx.js', 'sss.js']
}


/*
* baseUrl:部署的根目录
*
* */
module.exports={
    lintOnSave:false,
    publicPath:util.getPublicPath(),
    outputDir:publicUrlPrefix,
    // assetsDir:"./public",//静态资源目录(相对于outputDir)
    assetsDir:"./",//静态资源目录(相对于outputDir)
    // pages:util.getPages(),
    pages:{
        admin: {
            entry: 'src/main.js',
            template: 'index.html',
            filename:process.env.NODE_ENV !== 'development'?
                `./templates/admin.ftl`:`admin.html`,
            chunks: ['chunk-vendors', 'chunk-common', 'admin']
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: "jquery",
                $:"jquery",
                "window.jQuery": "jquery"
            })

        ]
    },
    filenameHashing:process.env.NODE_ENV==='production'&&typeof process.env.VUE_APP_ISTEST==='undefined',
    productionSourceMap:false,
    devServer: {
        port:8202,
        proxy: {
            '/monitor':{//设置java 接口跨域代理
                // target:'http://10.70.7.228:8095',
                target:'http://172.16.0.175:8095',
                ws:true,
                changeOrigin:true
            }
        },
        before(app){
            console.log('哈哈哈');
        }
    },
    chainWebpack:config=>{
        //配置下那个部署的文件
        // if(process.env.NODE_ENV!=='development'){
        //     config.plugin('html')
        //         .tap(args => {
        //             args[0].cdn = cdn;
        //             return args;
        //         });
        // }

        config.resolve.alias
            .set('vue$','vue/dist/vue.js')
            .set('jquery','jquery')
            .set('@$',resolve('src'))
            .set('components',resolve('src/components'))
            .set('views',resolve(('src/views')))
            .set('router',resolve(('src/router')))
            .set('interface',resolve(('src/interface')))
            .set('styles',resolve(('src/styles')))
            .set('utils',resolve(('src/utils')))
            .set('store',resolve(('src/store')))
            .set('assets',resolve(('src/assets')))
            .set('js',resolve(('src/js')));

    }

};
