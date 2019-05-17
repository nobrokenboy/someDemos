import {get,post} from '../tools';
const user={
    login(data,callback){//登录接口
        post('/user/login',data,callback);
    },
    logout(data,callback){//退出登录接口
        get('/user/logout',data,callback);
    },
    getMsg(callback){//获取用户的信息
        get('/user/current/info',{},callback);
    }
}
export default user;

