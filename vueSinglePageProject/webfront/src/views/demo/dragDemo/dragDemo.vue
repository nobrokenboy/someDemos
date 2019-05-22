<template>
    <div id="root">
        <div class="playground">
            <h2 align='center'>请将选材以及酷家乐的空间进行配对</h2>
            <div class="drag-wrapper">
                <div class="drag-box">
                    <h4>选材系统</h4>
                    <div class="drag-item" v-for='(item,key) in data1' :key='key'>
                        <div class="drag-item-name">{{key|spaceType}}</div>
                        <div class="drag-item-wrapper">
                            <div class="drag-item-box" v-for='(list,index) in item' :key='index'>
                                <span class="drag-item-child-name">{{list.name}}</span>
                                <div class="drag-item-child-box drop-target-wrapper" :data-code='list.spaceCode'
                                :data-name='list.name'  @drop='drop'  @dragover="dragOver">
                                </div>
                            </div> 
                        </div>   
                    </div>
                </div> 
                <div class="drag-box">
                    <h4>酷家乐</h4>
                    <div>{{JSON.stringify(data2)}}</div>
                    <div class="drag-item" v-for='(item,key) in data2' :key='key'>
                        <div class="drag-item-name">{{key|spaceType}}</div>
                        <div >
                            <div class="dragged-item" v-for='(list,index) in item' :key='index' draggable="true" :id="'drag'+key+index" 
                            :data-list='JSON.stringify(list)' :data-type='key'
                            @dragstart='dragStart' @dragover='dragOver'>
                                <span>{{list.name}}</span>
                                <span class="icon-close" @click='remove'>X</span>
                             </div>
                        </div>   
                    </div>
                </div>    
            </div>
            <!-- <b-drag></b-drag> -->
        </div>
        <p align='center'>
            <button class="btn-confirm" @click='confirm'>确定</button>
        </p>
    </div>
</template>
<script>
    //拖拽
export default {
  data () {
    return {
        data1:{
            1:[
                {
                    id:0,
                    name:"客厅",
                    spaceCode:1,
                    alias:"过道",
                },
                {
                    id:1,
                    name:"卧室",
                    spaceCode:2,
                    alias:"主卧",
                },
                {
                    id:2,
                    name:"阳台",
                    spaceCode:3,
                    alias:"阳台",
                },
                {
                    id:3,
                    name:"厨房",
                    spaceCode:4,
                    alias:"厨房",
                },
                {
                    id:4,
                    name:"卫生间",
                    spaceCode:5,
                    alias:"卫生间",
                }
            ],
        },
        data2:{
            1:[
                {
                    id:10,
                    name:"客厅",
                    spaceCode:1,
                    alias:"走廊",
                    area:20
                },
                {
                    id:11,
                    name:"卧室",
                    spaceCode:2,
                    alias:"客卧",
                    area:30
                },
                {
                    id:12,
                    name:"阳台",
                    spaceCode:3,
                    alias:"阳台",
                    area:10
                },
                {
                    id:13,
                    name:"厨房",
                    spaceCode:4,
                    alias:"厨房",
                    area:15 
                },
                {
                    id:14,
                    name:"卫生间",
                    spaceCode:5,
                    alias:"卫生间",
                    area:10
                }
            ],
        },
        tempData:{},
        dragDom:"",
    }
  },
  filters:{
      spaceType(val){
          let res="";
          val=parseInt(val);
          switch(val){
            case 0:
                res='预选五大空间';
                break;
            case 1:
                res='五大空间';
                break;
            case 2:
                res='产品包';
                break;
            case 3:
                res='个性化';
                break;  
          }
          return res;
      }
  },
  mounted: function() {
      this.tempData=JSON.parse(JSON.stringify(this.data2));

      //监听拖放事件

    // var source=document.querySelectorAll('.dragged-item'),
    // dragElement=null;

    // for(var i = 0; i < source.length; i++){
    //     source[i].addEventListener('dragstart',function(ev){
    //         dragElement = this;
    //         ev.dataTransfer.setData("Text",ev.target.id);
    //         console.log(ev.target.getAttribute('data-type'));
    //         ev.dataTransfer.setData("type",ev.target.getAttribute('data-type'));
    //         ev.dataTransfer.setData("params",ev.target.getAttribute('data-list'));
            
    //     },false);

       
    // };

    // document.ondragover = function(e){e.preventDefault();}
    // document.ondrop = function(e){e.preventDefault();}


    // //目标对象drop
    // var self=this;
    // var target=document.querySelectorAll('.drop-target-wrapper');
    //  for(var i = 0; i < target.length; i++){
    //     target[i].addEventListener('drop',function(ev){
    //         ev.preventDefault();
    //         var data=ev.dataTransfer.getData("Text"),
    //         draggedTarget=document.getElementById(data),
    //         params=JSON.parse(ev.dataTransfer.getData('params')),
    //         code=params.spaceCode,
    //         name=params.name,
    //         id=params.id;
    //         var type=ev.dataTransfer.getData("type");
    //         console.log(params);


    //         //获取关闭按钮
    //         var closeBtn=null;
    //         for(var i=0;i<draggedTarget.children.length;i++){
    //             if(draggedTarget.children[i].className=='icon-close'){
    //                 closeBtn=draggedTarget.children[i];
    //             } 
    //         }
    //         // console.log('拖拽目标');
    //         // console.log(name);
    //         // console.log(code);

    //         var targetCode=ev.target.getAttribute('data-code'),
    //         targetName=ev.target.getAttribute('data-name');
            
    //         // console.log('结果目标');
    //         // console.log(targetCode);
    //         // console.log(targetName);
           
            
    //         if(code==targetCode&&name==targetName){
    //             ev.target.appendChild(draggedTarget);
    //             draggedTarget.setAttribute('draggable','false'); 
    //             closeBtn.style.visibility='visible'; 
    //             //拖拽成功进行移除
    //             self.tempData[type]=_.filter(self.tempData[type],item=>{
    //                 return item.id!==id;
    //             });
    //             console.log('移除结果');
    //             console.log(self.tempData);
                
    //         }else{
    //             alert('名称和编码不匹配');
    //             // self.$confirm('名称和编码不匹配，是否还要移动', '提示', {
    //             //     confirmButtonText: '确定',
    //             //     cancelButtonText: '取消',
    //             //     type: 'warning'
    //             // }).then(() => {
    //             //     ev.target.appendChild(document.getElementById(data));
    //             //     draggedTarget.setAttribute('draggable','false'); 
    //             //     closeBtn.style.visibility='visible';
    //             //      //拖拽成功进行移除
    //             //     this.data2=_.filter(this.data2,item=>{
    //             //         return item.id!==id;
    //             //     });
    //             // }).catch(() => {
                
    //             // });
    //         }
            
            
    //     });
    //  }
  
    
},
methods: {
    dragStart(ev){
        ev.dataTransfer.setData("Text",ev.target.id);
        console.log(ev.target.getAttribute('data-type'));
        ev.dataTransfer.setData("type",ev.target.getAttribute('data-type'));
        ev.dataTransfer.setData("params",ev.target.getAttribute('data-list'));
        //试一下复制的
        // this.dragDom=ev.currentTarget.cloneNode(true);
        // console.log('实现复制');
        // console.log(this.dragDom);
    },
    dragOver(e){
        e.preventDefault();
    },
    drop(ev){
        var self=this;
        ev.preventDefault();
        var data=ev.dataTransfer.getData("Text"),
        draggedTarget=document.getElementById(data),
        params=JSON.parse(ev.dataTransfer.getData('params')),
        code=params.spaceCode,
        name=params.name,
        id=params.id;
        var type=ev.dataTransfer.getData("type");
        console.log(params);


        //获取关闭按钮
        var closeBtn=null;
        for(var i=0;i<draggedTarget.children.length;i++){
            if(draggedTarget.children[i].className=='icon-close'){
                closeBtn=draggedTarget.children[i];
            } 
        }
        

        var targetCode=ev.target.getAttribute('data-code'),
        targetName=ev.target.getAttribute('data-name');
        
        
        
        if(code==targetCode&&name==targetName){
            //
            ev.target.appendChild(draggedTarget);
            //试一下用克隆的
            //  ev.target.appendChild(this.dragDom);
            //改为用数据驱动的
            draggedTarget.setAttribute('draggable','false'); 
            closeBtn.style.visibility='visible'; 
            //拖拽成功进行移除
            self.tempData[type]=_.filter(self.tempData[type],item=>{
                return item.id!==id;
            });
            // self.data2=JSON.parse(JSON.stringify(self.tempData));
            console.log('移除结果');
            console.log(self.tempData);
            
        }else{
            alert('名称和编码不匹配');
        }
    },
    remove($event){//移出目标框框
        var parent=$event.target.parentNode,
        parentWrapper=parent.parentNode;
        var data=JSON.parse($event.target.parentNode.getAttribute('data-list')),
        type=$event.target.parentNode.getAttribute('data-type');
        console.log(type);
        //更新数据(@todo:这里可能还是要更新dom节点，因为节点和vue数据操作不同步)
        console.log(data);
        this.tempData[type].push(data);
        console.log(this.tempData);
        // this.data2=this.tempData;
        console.log(this.data2);
        this.$nextTick(()=>{
            this.data2=JSON.parse(JSON.stringify(this.tempData));
        });
        //刷新dom节点
        parentWrapper.removeChild(parent);
        
        
    },
    confirm(){//确定数据

    }
},
    
}
</script>
<style scoped lang='less'>
    #root{
        padding:50px 20px;
    }
    h2{
        font-size:20px;
        font-weight:bold;
        margin-bottom:20px;
    }
    h4{
        font-size:16px;
        color:#666;
        margin-bottom:10px;
    }
    
    .drag-wrapper{
        display: flex;
    }
    
    .drag-box{
        flex:1;
    }
    .drag-box:nth-child(1){
        margin-right:10px;
    }
    .drag-item{
        display:flex;
        width:100%;
        padding:20px;
        margin-bottom:10px;
        border:2px solid rgb(235, 133, 133);
    }
    .drag-item-name{
        display:inline-block;
        width:30px;
        height: 120px;
        font-size:16px;
        margin-right:40px; 
        color:#fff;
        padding:5px;
        text-align:center;
        border-radius:50px;
        background: rgb(240, 156, 156);
    }
    .drag-item-wrapper{
        flex:1; 
    }
    .drag-item-box{
        display:table;
        height:50px;
        line-height:50px;
        &:not(:last-child){
           margin-bottom:20px;     
        }  
    }
    .drag-item-child-name{
        position:relative;
        display:inline-block;
        width:50px;
        vertical-align:middle;
        &:before{
            position: absolute;
            content:"";
            left:-10px;
            top:50%;
            transform:translateY(-50%);
            width:4px;
            height:4px;
            border-radius:50%;
            background:rgb(99, 97, 209);    
        }
    }
    .drag-item-child-box{
        display:table-cell;
        width:100%;
        border:1px solid rgb(235, 133, 133);   
    }

    .dragged-item{
        position: relative;
        display:inline-block;
        margin-right:10px;
        width:100px;
        height:40px;
        line-height:40px;
        background:rgb(235, 133, 133); 
        border-radius:30px;
        text-align:center;
        color:#fff;
        .icon-close{
            visibility: hidden;
            position:absolute;
            right:10px;
            top:50%;
            transform:translateY(-50%);
            width:20px;
            height:20px;
            line-height:20px;
            background:#eee;
            border-radius:50%;
            opacity:.8;
            font-size:12px;
            cursor: pointer;
            &:hover{
                opacity:1;     
            }
        }
    }

    .btn-confirm{
        width:120px;
        height:35px;
        margin-top:20px;
        line-height:35px;
        border:none;
        background:rgb(235, 133, 133); 
        text-align:center;
        color:#fff;
    }
</style>

