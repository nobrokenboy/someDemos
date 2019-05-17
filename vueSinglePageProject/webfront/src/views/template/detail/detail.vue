<template>
    <div class="template-detail">
        <json-viewer :value="form" :expand-depth="5" :boxed="true"></json-viewer>
        <!--<json-viewer :value="test" :expand-depth="5" :boxed="true"></json-viewer>-->
    </div>
</template>

<script>
    export default {
        name: "detail",
        data(){
            return {
                fullscreenLoading:false,
                form:{
                    job:"",
                    name:"",
                    typeId:"",
                    alertContext:{}
                },
                alarmContext:"",

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
                    if(res.code==0){
                        this.form.job=res.data.job;
                        this.form.name=res.data.name;
                        this.form.typeId=res.data.typeId;
                        this.alarmContext=res.data.alarmContext;
                        if(this.alarmContext!==''){
                            this.form.alertContext=JSON.parse(this.alarmContext);
                            console.log(this.form.alertContext);

                        }
                    }else{
                        this.$toast(res.msg);
                    }
                    this.fullscreenLoading=false;
                });
            },
            handleNodeClick(data) {
                console.log(data);
            },

        },
    }
</script>

<style scoped lang="less">

</style>
