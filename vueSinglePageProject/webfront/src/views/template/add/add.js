import add from './add.vue';
export default {
    extends:add,
    name:'add',
    data(){
        return {

        }
    },
    mounted(){
        // this.alarmContextIndex=this.alarmContextArr.length-1;
    },
    methods:{
        submit(){
            this.dealWidthAlarmItem();
            this.$refs['templateForm'].validate((valid) => {
                if (valid&&this.isTestObjError==false) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.templateSetting.add({
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
                }else{
                    return false;
                }
            });

        }
    }
}
