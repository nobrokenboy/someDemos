import {get,post} from '../tools';
const typeSetting={
    update(data,callback){
        post('/config/update',data,callback);
    },
    add(data,callback){
        post('/config/add',data,callback);
    },
    turnon(data,callback){
        post('/config/active',data,callback);
    },
    delete(data,callback){
        post('/config/delete',data,callback);
    },
    detail(id,callback){
        get('/config/info/'+id,{},callback);
    },
    list(data,callback){
        get('/config/list',data,callback);
    }
};
export default typeSetting;

