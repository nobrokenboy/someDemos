export default {
    name:"list",
    data(){
        return {
            tableData: [],
            value2:true,
            currentPage3: 5,
            fullscreenLoading:true,
            requestParams:{
                search:"",
                configMsg:"",
                pageNo:1,
                pageSize:12,
            },
            paginationObj:{
                total:0,
            }
        }

    },
    watch:{
        '$route':'getTemplateList'//全局搜索时监听参数变化
    },
    mounted(){
        this.getTemplateList();
    },
    methods:{
        getTemplateList(){
            this.requestParams.search=this.$route.query.search||"";
            ask.templateSetting.list(this.requestParams,(res)=>{
                console.log(res);
                if(res.code==0){
                    this.tableData=res.data.list;
                    this.paginationObj.total=res.data.total;
                    //处理下数据
                    _.forEach(this.tableData,item=>{
                        item.isActive=item.isActive===1?true:false;
                    });
                }else{
                    this.$toast(res.msg);
                }
                this.$nextTick(()=>{
                    this.fullscreenLoading=false;
                });
            });
        },
        turnon(param){//开启
            // console.log('开启中');
            // console.log(param.isActive);
            this.fullscreenLoading=true;
            ask.templateSetting.turnon({
                id:param.id,
                status:param.isActive?1:0
            },res=>{
                if(res.code==0){
                    this.getTemplateList();
                }else{
                    this.$toast(res.msg);
                    if(res.code==-1){
                        this.getTemplateList();
                    }
                }
                this.$nextTick(()=>{
                    this.fullscreenLoading=false;
                });
            });
        },
        formatterIsActive(row, column){
            console.log(row.isActive==1?true:false);
            return row.isActive==1?true:false;
        },
        deleteOperation(id){
            console.log('哈哈哈');
            this.$confirm('是否确定删除该模板?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               //调用接口删除
                ask.templateSetting.delete({
                    id:id
                },res=>{
                    if(res.code==0){
                        this.getTemplateList();
                    }else{
                        this.$toast(res.msg);
                    }
                });
            }).catch(() => {
               // this.$toast('已取消删除');
            });
        },
        edit(id){
            this.$router.push({
                path:"/template/edit",
                query:{
                    id:id
                }
            });
        },
        goDetail(id){
            this.$router.push({
                path:"/template/detail",
                query:{
                    id:id
                }
            });
        },
        handleCurrentChange(val) {
            this.getTemplateList();
        }
    }
}
