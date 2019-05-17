<template>
     <div id='drag'>
         <vuedraggable class="wrapper" v-model="list">
            <transition-group>
            <div v-for="item in list" :key="item" class="item">
                <p>{{item}}</p>
            </div>
            </transition-group>
        </vuedraggable>
     </div>   
</template>
<script>
    //拖拽
    import vuedraggable from 'vuedraggable';
    export default {
        name: 'drag',
        components: {vuedraggable},
        props: {
        },
        data() {
            return {
                list: [1,2,34,4,54,5]
            }
        },
        updated() {
            console.log(this.list)
        },
        methods: {
        }
    }
</script>
<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
}
.item{
    width: 300px;
    height: 50px;
    margin:10px;
    background-color: #42b983;
    color: #ffffff;
}
</style>

