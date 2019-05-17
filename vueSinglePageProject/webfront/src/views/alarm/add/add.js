import add from './add.vue';
export default {
    extends:add,
    name:'add',
    data(){
        return {

        }
    },
    methods:{
        submit(){
            this.$refs['alarmForm'].validate((valid) => {
                if (valid) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.typeSetting.add(this.form,res=>{
                        if(res.code==0){
                            this.$router.push({
                                path:"/alarm/list",
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
