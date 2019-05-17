/*
*  二次封装axios
* */
import axios from 'axios';
import * as config from './config';
import router from 'router';
//默认axios的全局设置
axios.defaults.baseURL = config.ctx;
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

//设置拦截器拦截登录失效
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
axios.interceptors.request.use(
    config => {
        config.cancelToken = source.token; // 全局添加cancelToken
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
axios.interceptors.response.use(function (response) {
    console.log('拦截');
    console.log(response);
    if(response.data.code===4006){//拦截到登录失效，code=4006
        source.cancel();
        router.push({
           path:"/login"
        });
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});


/*
* get 请求
* @param  url :接口地址
* @param  data:接口参数
* @param  callback:成功之后的处理
* */
export const get=(url,data,callback,config={})=>{
    // let params=_.deepExtend();
    // config=typeof config!=='undefined'?config:{}
    axios.get(url,{
        params:data
    },config)
        .then(res=>{
            if(typeof callback==='function'){
                callback(res.data);
            }
        })
        .catch(error=>{
            console.log(error)
            //提示错误
        });
};
/*
* post 请求
* @param  url :接口地址
* @param  data:接口参数
* @param  callback:成功之后的处理
* */
export const post=(url,data,callback,config={})=>{
    axios.post(url,data,config)
        .then(res=>{
            if(typeof callback==='function'){
                callback(res.data);
            }
        })
        .catch(error=>{
            console.log(error)
            //提示错误
        });
};


