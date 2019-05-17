<template>
    <div class="login">
        <div>登录页面呢</div>
        <el-pagination
                :page-size="20"
                :pager-count="11"
                layout="prev, pager, next"
                :total="1000">
        </el-pagination>

        <el-switch
                v-model="value2"
                active-color="#13ce66"
                inactive-color="#ff4949">
        </el-switch>

        <lottie :options="defaultOptions" :height="200" :width="200" @animCreated="handleAnimation" />
        <p>
            <button @click="login">登录啦</button>
        </p>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                value2:true,
                defaultOptions: { animationData: animationData.default},
                animationSpeed: 1,
                anim: {}
            }
        },
        mounted(){
            console.log('动画json文件：');
            console.log(this);
            console.log(animationData);
        },
        methods:{
            handleAnimation(anim){
                this.anim = anim;
                console.log(this.anim); //这里可以看到 lottie 对象的全部属性
                console.log(this.anim.setSpeed(1.2));
            },
            login(){
                ask.login.login({
                    userName:"chenshuyang",
                    password:"Bgy_2008@"
                },res=>{
                    console.log(res);
                    if(res.code==0){

                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>