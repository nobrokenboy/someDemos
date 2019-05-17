import {get,post} from '../tools';
const templateSetting={
    update(data,callback){
        post('/template/update',data,callback);
    },
    add(data,callback){
        post('/template/add',data,callback);
    },
    turnon(data,callback){
        post('/template/active',data,callback);
    },
    delete(data,callback){
        post('/template/delete',data,callback);
    },
    detail(id,callback){
        get('/template/info/'+id,{},callback);
    },
    list(data,callback){
        get('/template/list',data,callback);
    }
};
export default templateSetting;
