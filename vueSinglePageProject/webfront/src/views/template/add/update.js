import add from './add.vue';
export default {
    extends:add,
    name:'edit',
    data(){
        return {
            id:void 0
        }
    },
    mounted(){
        this.id=this.$route.query.id;
        this.getDetail();
    },
    methods:{
        getDetail(){
            this.fullscreenLoading=true;
            ask.templateSetting.detail(this.id,res=>{
                console.log('模板详情');
                console.log(res);
                if(res.code==0){
                    this.form.job=res.data.job;
                    this.form.name=res.data.name;
                    this.form.typeId=res.data.typeId;
                    this.form.alarmContext=res.data.alarmContext;
                    let tempObj={};
                    if(this.form.alarmContext!==''){
                        tempObj=JSON.parse(this.form.alarmContext);
                        console.log(tempObj);
                        _.forEach(tempObj,(value,key)=>{
                            this.form.alarmContextArr.push({
                                id:++this.alarmContextIndex,
                                key:key,
                                val:value
                            });
                        });
                    }
                }else{
                    this.$toast(res.msg);
                }
                this.fullscreenLoading=false;
            });
        },
        submit(){
            this.dealWidthAlarmItem();
            this.$refs['templateForm'].validate((valid) => {
                if (valid&&this.isTestObjError==false) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.templateSetting.update({
                        id:this.id,
                        job:this.form.job,
                        name:this.form.name,
                        typeId:this.form.typeId,
                        alarmContext:this.form.alarmContext,
                    },res=>{
                        if(res.code==0){
                            this.$router.push({
                                path:"/template/list",
                            });
                        }else{
                            this.$toast(res.msg);
                            this.submitBtnDisable=false;
                            this.fullscreenLoading=false;
                        }

                    });
                } else {
                    return false;
                }
            });


        }

    }
}

