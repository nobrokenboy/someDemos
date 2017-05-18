/**
 * Created by jessic on 2017/5/18.
 */
var path=require("path");
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob = require('glob');

module.exports={
    entry:"./index.js",
    output:{
        path:path.join(__dirname,"dist"),//打包输出的路径
        filename:"bundle.js",//打包之后的包名
        publicPath:""//html引用的路径
    },
    devServer:{
        historyApiFallback: true,
        noInfo: true,
        inline:true
    },
    plugins:[
        //js文件压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
            sourceMap: true
        })
    ]

};