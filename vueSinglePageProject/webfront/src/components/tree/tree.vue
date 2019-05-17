<template>
    <div class="m-tree">
        <div class="tree-item">JSON数据结构</div>
        <ul class="m-tree-parent">
            <li v-for="(value,key) in form" >
                <div v-if="typeof value==='object'" class="tree-item">
                    <span>{{key}}</span>
                    <ul class="m-tree m-tree-parent">
                        <li v-for="(item,index) in value" class="tree-item">
                            <span class="tree-item-child">{{index}}</span>
                            <span class="tree-item-child">:</span>
                            <span class="tree-item-child">{{item}}</span>
                        </li>
                    </ul>
                </div>
                <div v-else class="tree-item">
                    <span class="tree-item-child">{{key}}</span>
                    <span class="tree-item-child">:</span>
                    <span class="tree-item-child">{{value}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

</script>

<style scoped lang="less">
    .m-tree{
        text-align: center;
        li{
            display:inline-block;
            vertical-align:top;
        }
        .m-tree-parent{
            position:relative;
        }
        .tree-item{
            /*position:relative;*/
            position:relative;
            display:inline-block;
            width:120px;
            height:60px;
            line-height:60px;
            background:#ff8922;
            margin:20px;
            text-align:center;
            color:#fff;
        }
    }
</style>

