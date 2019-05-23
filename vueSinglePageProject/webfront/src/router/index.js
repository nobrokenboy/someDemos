import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import login from 'views/login/login.vue';
import index from 'views/index/index.vue';
import templateList from 'views/template/list/list.vue';
import templateAdd from 'views/template/add/add.js';
import templateUpdate from 'views/template/add/update.js';
import templateDetail from 'views/template/detail/detail.vue';
import alarmList from 'views/alarm/list/list.vue';
import alarmAdd from 'views/alarm/add/add.js';
import alarmEdit from 'views/alarm/add/update.js';
import error from 'views/error/error.vue';
//测试一些demo的
import drag from 'views/demo/drag/drag.vue';
import drag2 from 'views/demo/drag2/drag2.vue';
import dragDemo from 'views/demo/dragDemo/dragDemo.vue';
import dragDemo2 from 'views/demo/dragDemo/dragDemo2.vue';
import dragDemo3 from 'views/demo/dragDemo/dragDemo3.vue';
const routes=[
    {
        path:"/login",
        component:login,
        name:"登录",
        meta:{
            navText:"",
        },
    },
    {
        path:"/demo/drag",
        component:drag,
        name:"拖拽",
    },
    {
        path:"/demo/drag2",
        component:drag2,
        name:"拖拽11",
    },
    {
        path:"/demo/dragDemo",
        component:dragDemo,
        name:"拖拽1112",
    },
    {
        path:"/demo/dragDemo2",//基于vuedraggable 插件实现多个group之间的拖拽
        component:dragDemo2,
        name:"拖拽1112",
    },
    {
        path:"/demo/dragDemo3",
        component:dragDemo3,
        name:"拖拽1112",
    },
    {
        path:"/index",
        component:index,
        name:"首页",
        children:[
            {
                path:"/alarm/list",
                component:alarmList,
                name:"告警类型列表",
                icon:require("../assets/imgs/btn-list.png"),
                isMenu:true
            },
            {
                path:"/alarm/add",
                component:alarmAdd,
                name:"添加告警类型",
                icon:require("../assets/imgs/btn-add.png"),
                isMenu:true
            },
            {
                path:"/alarm/edit",
                component:alarmEdit,
                name:"编辑告警类型",
                meta:{
                    regexPath:"/alarm/list",//用于不在菜单时的路由激活状态匹配
                }
            },
            {
                path:"/template/list",
                component:templateList,
                name:"模板列表",
                icon:require("../assets/imgs/btn-list.png"),
                isMenu:true,
            },
            {
                path:"/template/add",
                component:templateAdd,
                name:"添加模板",
                icon:require("../assets/imgs/btn-add.png"),
                isMenu:true,
            },
            {
                path:"/template/edit",
                component:templateUpdate,
                name:"编辑模板",
                meta:{
                    regexPath:"/template/list",
                }
            },
            {
                path:"/template/detail",
                component:templateDetail,
                name:"模板详情",
                isMenu:false,
                meta:{
                    regexPath:"/template/list",
                }
            },

        ]
    },
    {
        path:"/error",//错误时候用的
        component:error,
        name:"错误页面",
    },
    {
        path:"*",//匹配不到时候用的
        redirect: { path: '/error' },
        name:"错误页面",
    },
];

const router=new Router({routes});
export default router;
