import Vue from 'vue';
import VueMeta from 'vue-meta';
Vue.use(VueMeta)
import 'element-ui/lib/theme-chalk/index.css';
import 'styles/public.less';
import 'components';
import 'components/element.js';
import router from 'router';
import store from 'store';
import ask from 'interface';
import _ from 'utils';
import Admin from 'views/admin/admin.vue';
import lottie from 'vue-lottie';//Airbnb的一个开源动画项目
Vue.component('lottie', lottie);
import * as animationData from 'assets/lottie/2469-dino-dance.json';
window.animationData=animationData;
Vue.config.productionTip = false;

window.router=router;
window._=_;
window.ask=ask;


new Vue({
    render: h => h(Admin),
    router,
    store,
    mounted(){
        let test=_.find([1,2,3,4,4],(item)=>{
            return item%2==0;
        });
    }
}).$mount('#root')

