<template>
    <transition>
        <div class="toast" :class="{'hidden':!isVisible}" :style="{'zIndex':zindex}">
            <span>{{message}}</span>
        </div>
    </transition>

</template>

<script>
    export default {
        name: "toast",
        data(){
            return {
                isVisible:true,
                message:"",
                zindex:""
            }

        },
    }
</script>

<style scoped lang="less">
    .toast{
        position:fixed;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        z-index:9;
        min-width:8rem;
        min-height:3rem;
        padding:1rem;
        background:rgba(1,1,1,.6);
        border-radius:.2rem;
        opacity:1;
        transition:all ease-in .3s;
        font-size:.875rem;
        color:#fff;

    }
    .hidden{
        visibility: hidden;
        opacity:0;
    }


</style>
