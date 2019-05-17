<template>
    <div class="error">
        <p align="center">
            <!--这个动效好像是商用的-->
            <lottie :options="defaultOptions" :height="500" :width="500" @animCreated="handleAnimation" />
        </p>
        <p align="center" class="f26">哈哈哈，页面找不到了</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                defaultOptions: { animationData: animationData.default},
            }
        },
        methods:{
            handleAnimation(anim){
                this.anim = anim;
                console.log(this.anim); //这里可以看到 lottie 对象的全部属性
                console.log(this.anim.setSpeed(1.2));
            },
        }
    }
</script>

<style>

</style>
