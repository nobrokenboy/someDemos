<template>
    <div class="alarm-add" v-loading.lock="fullscreenLoading">
        <div>
            <el-form ref="alarmForm" :model="form" :rules="rules"  label-width="120px" class="m-form">
                <el-form-item label="	告警类型编码" style="width:400px" prop="code">
                    <el-input v-model="form.code"  placeholder="请输入告警类型编码"></el-input>
                </el-form-item>
                <el-form-item label="描述信息" prop="msg">
                    <el-input type="textarea" v-model="form.msg" maxlength="500" rows="10"
                              resize="none" placeholder="请输入描述信息"></el-input>
                </el-form-item>
                <p align="center">
                    <button type="button" class="btn btn-common" @click="submit"
                    :disabled="submitBtnDisable">提交</button>
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
                form:{
                    code:"",
                    msg:"",
                },
                fullscreenLoading:false,
                submitBtnDisable:false,
                rules: {
                    code: [
                        { required: true, message: '请输入告警类型编码', trigger: 'blur' }
                    ],
                    msg: [
                        { required: true, message: '请输入描述信息', trigger: 'blur' }
                    ]
                }
            }
        },
    }
</script>

<style scoped>

</style>