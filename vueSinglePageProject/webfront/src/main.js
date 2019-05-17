import Vue from 'vue';
import VueMeta from 'vue-meta';
Vue.use(VueMeta)
import 'components/element.js';//按需加载会自带样式
import '../theme/index.css';//重新定制主题色
import 'styles/public.less';
import 'components';
import router from 'router';
import store from 'store';
import ask from 'interface';
import _ from 'utils';
import App from './App.vue';
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer);
import lottie from 'vue-lottie';//Airbnb的一个开源动画项目
Vue.component('lottie', lottie);
import * as animationData from 'assets/lottie/2469-dino-dance.json';
window.animationData=animationData;
Vue.config.productionTip = false;
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
//拖拽
import VueDND from 'awe-dnd'
Vue.use(VueDND)

NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})
// window.router=router;
window._=_;
window.ask=ask;


//路由全局钩子
// router.beforeEach((to,from,next)=>{
//     if(to.path=='/login'){
//         window.localStorage.removeItem('monitorUser');
//     }
//     //获取用户session信息
//     let user=JSON.parse(window.localStorage.getItem('monitorUser'));
//     NProgress.start();

//     if(!user&&to.path!='/login'){
//         next({
//             path:"/login"
//         });
//     }else{
//         next();
//     }
// });

// router.afterEach(() => {
//     // 在即将进入新的页面组件前，关闭掉进度条
//     NProgress.done()
// })



new Vue({
    render: h => h(App),
    router,
    store,
    // components:{
    //     vuedraggable
    // },
    data(){
        return {
            routes:this.$router.options.routes
        }
    },
    mounted(){
        //获取table的合适高度
        // this.$nextTick(()=>{
        //     // this.tableHeight=($(window).height())*0.75;
        //     console.log(this.tableHeight);
        //     //强制更改element分页的文字显示
        //     // $('.el-pagination__jump').html($('.el-pagination__jump').html().replace(/前往/,'到第'));
        //
        // });
    },
    methods:{}
}).$mount('#root')

