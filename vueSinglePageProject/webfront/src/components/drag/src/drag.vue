<template>
    <div id='demo'>
        <div id="source" draggable="true" class="drag">a元素</div>
        <div id="process" class="process">b元素</div>
        <div id="target" class="target">c元素</div>
    </div>
</template>
<script>
export default {
    name:"bDrag",
    data(){
        return {

        }
    },
    mounted(){
         var source = document.getElementById('source'),     // a元素
        process = document.getElementById('process'),   // b元素
        target = document.getElementById('target');     // c元素
    
        source.addEventListener('dragstart',function(ev){   // dragstart事件由a元素产生
            console.log('a元素开始被拖动');
        },false)

        process.addEventListener('dragenter',function(ev){  // dragenter事件由b元素产生
            console.log('a元素开始进入b元素');
        },false)
        process.addEventListener('dragleave',function(ev){  // dragleave事件由b元素产生
            console.log('a元素离开b元素');
        },false)

        target.addEventListener('drop',function(ev){        // drop事件由c元素产生
            console.log('a元素拖放到c元素了');
            ev.preventDefault();
        },false)
        document.ondragover = function(e){e.preventDefault();}
    }
}
</script>
<style lang='less'>
    #demo{
        padding:120px;
    }
    .drag{
        display:inline-block;
        width:120px;
        height:60px;
        line-height:60px;
        background:#ff8077;
        text-align:center;
        color:#fff;
    }
    .process{
        display:block;
        width:400px;
        height:120px;
        margin-top:20px;
        line-height:120px;
        background:#256dda;
        text-align:center;
        color:#fff;
    }

    .target{
        display:block;
        width:400px;
        height:120px;
        margin-top:20px;
        line-height:120px;
        background:#da25a4;
        text-align:center;
        color:#fff;
    }
</style>


