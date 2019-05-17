import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';//vuex持久化解决插件
Vue.use(Vuex);

const store=new Vuex.Store({
    plugins: [createPersistedState()],
    state:{
        userMsg:null
    },
    mutations:{
        changeUserMsg(state,list){//更改用户信息的
            state.userMsg=list;
        }

    }
});

export default store;

