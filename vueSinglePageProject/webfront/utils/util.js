const glob=require('glob');
const pagePath='./src/views';//页面路径相对于vue.config.js
module.exports={
    getPages:()=>{
        //获取多个页面
        let entryHtml=glob.sync(pagePath+'/*/*.html');
        //vue.config.js中pages选项
        let pages={}
        entryHtml.forEach((filePath)=>{
            //获取html 页面的名称
            let fileName=filePath.substring(filePath.lastIndexOf('/')+1,filePath.lastIndexOf('.'));
            pages[fileName]={
                entry:`src/views/${fileName}/${fileName}.js`,
                template:`src/views/${fileName}/${fileName}.html`,
                // filename:`./templates/${fileName}.ftl`,
                filename:process.env.NODE_ENV !== 'development'?
                    `./templates/${fileName}.ftl`:`${fileName}.html`,
            };
        });

        return pages;


    },
    getPublicPath:()=>{
        let prefixUrl="";
        if(process.env.NODE_ENV=='development'){
            prefixUrl="/"
        }else{
            if(process.env.VUE_APP_ISTEST==1){//测试环境
                prefixUrl="//static.test.o-home.com/monitor/";
            }else{//生产环境
                prefixUrl="//static.o-home.com/monitor/";
            }
        }
        return prefixUrl;
    }
};

