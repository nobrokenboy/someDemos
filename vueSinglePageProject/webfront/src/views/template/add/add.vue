<template>
    <div class="template-add" v-loading.lock="fullscreenLoading">
        <div>
            <el-form ref="templateForm" :model="form" :rules="rules" label-width="140px" class="m-form" >
                <el-form-item label="job名称" style="width:400px" prop="job">
                    <el-input v-model="form.job"  placeholder="请输入job名称" ></el-input>
                </el-form-item>
                <el-form-item label="模板名称" style="width:400px" prop="name">
                    <el-input v-model="form.name"  placeholder="请输入模板名称" ></el-input>
                </el-form-item>
                <el-form-item label="	告警类型ID" style="width:400px" prop="typeId" >
                    <el-select v-model="form.typeId" placeholder="请输入告警类型ID" style="width:100%" >
                        <el-option
                                v-for="item in alarmTypeList"
                                :key="item.id"
                                :label="item.code"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<span>{{form.alarmContextArr}}</span>-->
                <el-form-item label="自定义告警Json串" style="width:600px" prop="alarmContextArr">
                    <a class="font-text-btn" @click="addItem">新增</a>
                    <div class="m-table-wrapper">
                        <el-table
                            :data="form.alarmContextArr"
                            empty-text="暂无数据" :max-height="300">
                            <el-table-column
                                    label="键"
                                    >
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.key"  placeholder="请输入key" style="width:120px"
                                        @blur="verifyKey(scope.row)" @focus="isTestObjError=false" @keyup="isTestObjError=false"></el-input>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    label="值"
                                   >
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.val"  placeholder="请输入val" style="width:120px"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <a class="font-text-btn" @click="deleteItem(scope.row)">删除</a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--<p v-if="isTestObjError" align="left" class="is-error">{{testErrorObjStr}}</p>-->
                </el-form-item>
                <p align="center">
                    <button type="button" class="btn btn-common" @click="submit">提交</button>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add",
        data(){
            return {
                alarmContextArr:[
                ],
                form:{
                    job:"",
                    name:"",
                    typeId:"",
                    alarmContext:"",
                    alarmContextArr:[]
                },
                alarmContextIndex:0,
                alarmTypeList:[],
                requestParams:{
                    search:"",
                    pageNo:1,
                    pageSize:100,
                },
                fullscreenLoading:false,
                currentTestObj:{},
                testErrorObjStr:'',
                testErrorObjArr:'',
                isTestObjError:false,
                rules: {
                    job: [
                        { required: true, message: '请输入job名称', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入模板名称', trigger: 'blur' }
                    ],
                    typeId: [
                        { required: true, message: '请输入告警类型ID', trigger: 'change' }
                    ],
                    alarmContextArr:[
                        {
                            validator:(rule,value,callback)=>{
                                console.log(rule);
                                var errors=[];
                                this.testErrorObjArr=[];
                                this.testErrorObjStr='';
                                //找出重复的
                                for (var i = 0; i < value.length; i++) {
                                    for (var j = i + 1; j < value.length; j++) {
                                        if (value[i].key == value[j].key) {
                                            this.testErrorObjArr.push(value[i].key);
                                        }
                                    }

                                }

                                //去重
                                this.testErrorObjArr=Array.from(new Set(this.testErrorObjArr));
                                if(this.testErrorObjArr.length>0){
                                    this.isTestObjError=true;
                                    this.testErrorObjStr='已存在相同的key值:'+this.testErrorObjArr.join(',')+'请检查';
                                    errors.push(this.testErrorObjStr);
                                }

                                //这个必须加上
                                callback(errors);

                                return errors;
                            }
                        }
                    ]


                }

            }
        },
        mounted(){
            //获取告警类型列表
            this.getAlarmList();
        },
        methods:{
            getAlarmList(){
                ask.typeSetting.list(this.requestParams,res=>{
                    if(res.code==0){
                        this.alarmTypeList=res.data.list;
                    }else{
                        this.$toast(res.msg);
                    }
                });
            },
            addItem(){
                this.form.alarmContextArr.push({
                    id:++this.alarmContextIndex,
                    key:"",
                    val:"",
                    isError:false,
                });
            },
            deleteItem(row){
                // _.forEach(this.alarmContextArr,(item,key)=>{
                //     if(row.id===item.id){
                //         console.log('进来啦');
                //         console.log(key);
                //         this.alarmContextArr.splice(key,1);
                //     }
                // });


                //先确认下是否删除
                this.$confirm('是否确定删除该键值对?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.form.alarmContextArr=_.filter(this.form.alarmContextArr,item=>{
                        return item.id!==row.id;
                    });
                }).catch(()=>{

                });


            },
            dealWidthAlarmItem(){//处理一下alarmContext
                let tempObj={};
                _.forEach(this.form.alarmContextArr,item=>{
                    tempObj[item.key]=item.val;
                });
                this.form.alarmContext=JSON.stringify(tempObj);
            },
            verifyKey(param){//验证是否出现重复key
                // _.forEach(this.form.alarmContextArr,item=>{
                //     // console.log('222'); console.log(item.key);
                //     if(param.key===item.key&&param.id!==item.id){
                //         this.$toast('已存在相同的key值');
                //     }
                // });

                this.currentTestObj=param;
                this.isTestObjError=false;
            }
        }
    }
</script>

<style scoped lang="less">

</style>