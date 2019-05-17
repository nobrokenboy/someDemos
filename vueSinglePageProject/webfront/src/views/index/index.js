import metaHeader from 'js/header.js';
export default {
    name: "index",
    data(){
        return {
            searchType:0,//0代表的是告警类型，1代表的是模板
            keyword:"",
            breadCrumbList:[]
        }
    },
    computed:{
        menuList(){
            let res,route,routes=this.$router.options.routes;
            route=_.find(routes,item=>{
                return item.path=='/index';
            });
            let tempRoutes=typeof route!=='undefined'?route.children:[];
            res=_.filter(tempRoutes,item=>{
                return item.isMenu;
            });
            return res;
        },
        username(){//获取用户名
            return this.$store.state.userMsg!=null?this.$store.state.userMsg.name:"";
        },
    },
    metaInfo:Object.assign({title:"监控平台管理页面"},metaHeader),
    watch:{
        '$route'(){
            this.breadCrumbList=[];
            this.getBreadCrumb();
        }
    }
    ,
    mounted(){
        this.getBreadCrumb();
    },
    methods:{
        getQueryList(){
            if(this.searchType==0){//告警类型
                this.$router.replace({
                    path:"/alarm/list",
                    query:{
                        search:this.keyword
                    }
                });
            }else{//模板的
                this.$router.replace({
                    path:"/template/list",
                    query:{
                        search:this.keyword
                    }
                });
            }
        },
        clearKeyword(){//清除内容
            this.keyword='';
            this.getQueryList();
        },
        logout(){//退出登录
            ask.user.logout({},res=>{
                console.log(res);
                if(res.code==0){
                    this.$store.commit('changeUserMsg',null);
                    this.$router.push({
                        path:"/login",
                    });
                }else{
                    this.$toast(res.msg);
                }
            })
        },
        getBreadCrumb(){
            let route=this.$route,routeMatchedList=route.matched,
                regexPath=route.meta.regexPath;
            let routes=this.$router.options.routes;

            let indexRoutes=_.filter(routes,list=>{//获取到首页对于的子路由
                return list.path=='/index'
            })[0].children;

            let flag=0;
            routeMatchedList=_.filter(routeMatchedList,item=>{
                return item.path!='/index';
            });
            if(typeof regexPath!=='undefined'){
                _.forEach(indexRoutes,item=>{//匹配到regexPath的
                    if(item.path===regexPath){
                        // routeMatchedList.splice(1,0,item);
                        routeMatchedList=routeMatchedList.concat(item);
                        flag=1;
                        console.log('进来啦啦啦');
                    }
                });
            }


            _.forEach(routeMatchedList,(item,index)=>{//整理数据,目前是定死拿两层
                if(flag==1){
                    if(item.path==this.$route.path||item.path.indexOf(this.$route.path)>-1){
                        item.path=this.$route.fullPath;
                        item.sort=1;
                    }else{
                        if(index==1){
                            item.sort=0;
                        }else{
                            item.sort=index;
                        }
                    }
                }else{
                    item.sort=index;
                }
                this.breadCrumbList.push(item);
            });
            this.breadCrumbList=_.sortBy(this.breadCrumbList,'sort');


        }
    }
}
