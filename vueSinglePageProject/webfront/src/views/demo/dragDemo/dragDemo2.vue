<template>
   <div class="wrapper">
       <div class="row">
        <div class="col-3">
            <h3>Draggable 2(选材,不能拖拽)</h3>
            <h4>1:XXXXX</h4>
            <draggable class="list-group" :list="list2"  @change="log" :options="{group:{name:'material',pull:false}}"
                @start="start22"
                @end="end22"
                >
                <div
                class="list-group-item"
                v-for="(element, index) in list2"
                :key="element.id"
                >
                {{ element.name }} {{ index }}
                    <span @click='removeItem(element,2)' style='position:absolute;right:10px;cursor:pointer;'>关闭</span>
                </div>
            </draggable>
            <hr/>
               <h4>2:XXXXX</h4>
            <draggable class="list-group" :list="list3"  @change="log" :options="{group:'material',sort:false}"
                @start="start22" @end="end22" :move="onMove">
                <div
                class="list-group-item"
                v-for="(element, index) in list3"
                :key="element.id"
                >
                    <span  style='position:absolute;left:10px;cursor:pointer;' v-text='element.fixed?"固定":"可动"'
                    v-on:click='element.fixed=!element.fixed'></span>
                    {{ element.name }} {{ index }}
                    <span @click='removeItem(element,3)' style='position:absolute;right:10px;cursor:pointer;'>关闭</span>
                </div>
            </draggable>
        </div>
         <div class="col-3">
            <h3>Draggable 1(酷家乐，能拖动)</h3>
            <draggable class="list-group" :list="list1"  @change="log" @remove='removeEvent' 
            :options="{group:{name: variable,pull:true},sort: false}"  >
                <div
                class="list-group-item"
                v-for="(element, index) in list1"
                :key="element.id"
                
                >
                {{ element.name }} {{ index }}
                </div>
            </draggable>
        </div>

    </div>
   </div>
</template>
<script>
//理解：group实现可以将一类的进行拖拽，设置为不同的就不能拖进去，group的pull属性可以设置是否能拖拽
//:move="onMove"  是属于什么事件呢,其实只是属于vuedraggable的一个属性，只是它是函数，这个事件结合数据的属性实现控制单个是否能够拖拽
import draggable from 'vuedraggable'
    //拖拽
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  data() {
    return {
      disabled: false,
      variable:"material",
      list1: [
        { name: "John", id: 1,fixed:false },
        { name: "Joao", id: 2,fixed:false },
        { name: "Jean", id: 3,fixed:false },
        { name: "Gerard", id: 4 ,fixed:false },
        { name: "Juan", id: 5,fixed:false  },
        { name: "Edgard", id: 6,fixed:false },
        { name: "Johnson", id: 7,fixed:false },
        { name: "Jessica", id: 11,fixed:false },
        { name: "Bell", id: 16,fixed:false },
        { name: "zhen", id: 17,fixed:false }
      ],
      list2: [
        
      ],
      list3: [
        
        ]
    };
  },
  methods: {
     start22 (event) {
      this.variable = '222222'
    },
    end22 (ev) {
      this.variable = 'material'
    },
    log(evt) {
      window.console.log(evt);
      console.log(this.list1);
      console.log(this.list2);
    },
    removeEvent(ev){
        console.log('进入这里11了');
        console.log(ev);
    },
    removeItem(item,n){
        console.log('关闭');
        if(n==2){
            this.list2=_.filter(this.list2,list=>{
                return item.id!==list.id;
            });
        
        }else if(n==3){
             this.list3=_.filter(this.list3,list=>{
                return item.id!==list.id;
            });    
        }
        this.list1.push(item);
    },
    onMove({ relatedContext, draggedContext }){//return false,实现cancel掉移动
        console.log('移动过程中');
        console.log(relatedContext);
        console.log(draggedContext);
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        console.log((!relatedElement || !relatedElement.fixed));
        console.log(!draggedElement.fixed);
        return (
            (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed);

    }
  }
};
</script>
<style scoped lang='less'>
.wrapper{
    width:1200px;
    margin:0 auto;
    padding-top:30px;
    padding-left:45px;
    padding-bottom:30px;
    text-align:center;
    background:#eee;
}
.row {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}
.col-3 {
    -ms-flex: 0 0 25%;
    -webkit-box-flex: 0;
    flex: 0 0 25%;
    max-width: 25%;
    margin-right:20px;
}
    .list-group {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
}

.list-group-item:first-child {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
}

.list-group-item {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
}

.list-group-item {
    cursor: move;
}
</style>

