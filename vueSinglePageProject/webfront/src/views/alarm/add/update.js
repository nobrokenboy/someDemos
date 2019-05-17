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
        console.log('进入编辑页面');
        this.id=this.$route.query.id;
        this.getDetail();
    },
    methods:{
        getDetail(){
            this.fullscreenLoading=true;
            ask.typeSetting.detail(this.id,res=>{
                if(res.code==0){
                    this.form.code=res.data.code;
                    this.form.msg=res.data.msg;
                }else{
                    this.$toast(res.msg);
                }
                this.fullscreenLoading=false;
            });
        },
        submit(){
            this.form.id=this.id;
            this.$refs['alarmForm'].validate((valid) => {
                if (valid) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.typeSetting.update(this.form,res=>{
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
                } else {
                    return false;
                }
            });


        }

    }
}

