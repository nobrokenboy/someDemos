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
        path:path.join(__dirname,"dist"),//��������·��
        filename:"bundle.js",//���֮��İ���
        publicPath:""//html���õ�·��
    },
    devServer:{
        historyApiFallback: true,
        noInfo: true,
        inline:true
    },
    plugins:[
        //js�ļ�ѹ��
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