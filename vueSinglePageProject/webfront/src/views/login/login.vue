<template>
    <div id="app" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="monitor-login-panel">
            <!--logo-->
            <div class="monitor-login-logo">
                <h1 class="monitor-login-little1">LOGIN</h1>
                <h2 class="monitor-login-little2">运维控制平台</h2>
            </div>
            <!--form-->
            <div class="monitor-login-form__Container">
                <div class="monitor-login-form__Wrapper">
                    <h4 class="monitor-login-form-little3" align="center">欢迎登录</h4>
                    <form  name="loginForm" id="loginForm">
                        <input type="hidden" name="challenge" v-model="loginParams.challenge">
                        <input type="hidden" name="seccode" v-model="loginParams.seccode">
                        <input type="hidden" name="validate" v-model="loginParams.validate">
                        <div class="monitor-form-item monitor-form-item-1" :class="{'focus':focusStyle.username}">
                            <label for="username">账号</label>
                            <div class="monitor-form-item-input" :class="{'focus':focusStyle.username}">
                                <i class="monitor-form-icon iconfont">&#xe602;</i>
                                <input type="text" placeholder="橙家云账号" id="username" name="username"
                                       v-model.trim="loginParams.userName" @keyup.enter="loginOperation"
                                       @input="verifyLoginParams.isUsernameFalse=false"
                                       @focus="focusStyle.username=true"
                                       @blur="focusStyle.username=false">
                            </div>
                        </div>
                        <div class="monitor-form-item monitor-form-item-2">
                            <label for="password">密码</label>
                            <div class="monitor-form-item-input" :class="{'focus':focusStyle.password}">
                                <i class="monitor-form-icon iconfont">&#xe63e;</i>
                                <input type="password" placeholder="橙家云密码" id="password" name="password"
                                       v-model.trim="loginParams.password" @keyup.enter="loginOperation"
                                       @input="verifyLoginParams.isPasswordFalse=false"
                                       @focus="focusStyle.password=true"
                                       @blur="focusStyle.password=false">
                            </div>
                        </div>
                        <p align="center">
                            <button type="button" class="monitor-form-button" @click="loginOperation"
                                    :disabled="isLoginBtnDisabled">
                                <span v-if="!isLoading">登录</span>
                                <span v-else>{{loadingText}}</span>
                            </button>
                        </p>
                        <p align="center" class="error-tip monitor-logo-error-tip f12">
                            <span>{{endVerifyMsgText}}</span><!--后端返回错误-->
                            <span v-if="verifyLoginParams.isUsernameFalse&&verifyLoginParams.isPasswordFalse">账户，密码不能为空</span>
                            <span v-else-if="verifyLoginParams.isUsernameFalse">账户不能为空</span>
                            <span v-else-if="verifyLoginParams.isPasswordFalse">密码不能为空</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import metaHeader from 'js/header.js';
    export default {
        props: [],
        data(){
            return {
                fullscreenLoading:false,
                isLoading:false,
                isLoginBtnDisabled:false,
                loadingConstText:"正在登录....",
                loadingText:"",
                verifyLoginParams:{
                    isUsernameFalse:false,
                    isPasswordFalse:false
                },
                endVerifyMsgText:"",
                focusStyle:{
                    username:false,
                    password:false
                },
                loginParams:{
                    userName:'',
                    password:"",
                },
                index:0,
                // errorInfo:errorInfo,
            }
        },
        watch:{
            isLoginBtnDisabled(nVal){
                console.log(nVal);
            },
            isLoading(nVal,oVal){
                if(nVal){
                    this.textEffect();
                }
            }
        },
        mounted(){

        },
        metaInfo:Object.assign({title:"登录页面"},metaHeader),
        methods:{
            textEffect(){//特效
                const textLength=this.loadingConstText.length;
                this.loadingText=this.loadingConstText.substring(0,this.index++);
                if(this.index>textLength){
                    this.index=0;
                    this.loadingText="";
                }
                setTimeout(this.textEffect,180);
            },
            loginOperation(){
                //登录时先清空后台的提示语
                this.endVerifyMsgText='';
                this.isLoading=true;
                this.isLoginBtnDisabled=true;
                if(!this.loginParams.userName){
                    this.verifyLoginParams.isUsernameFalse=true;
                }
                if(!this.loginParams.password){
                    this.verifyLoginParams.isPasswordFalse=true;
                }
                if(!this.loginParams.userName||!this.loginParams.password){
                    this.isLoginBtnDisabled=false;
                    this.isLoading=false;
                    return;
                }


                //接口
                ask.user.login(this.loginParams,res=>{
                    console.log(res.data);
                    // res=res.data;
                    if(res.code==0){
                        //登录成功之后跳转
                        ask.user.getMsg(res=>{
                            if(res.code==0){
                                this.$store.commit('changeUserMsg',res.data);
                                window.localStorage.setItem('monitorUser',JSON.stringify(res.data));
                                this.$router.push({
                                    path:"/template/list"
                                });
                            }else{
                                this.$toast(res.msg);
                            }
                        });

                    }else{
                        this.$toast(res.msg);
                        this.isLoading=false;
                        this.isLoginBtnDisabled=false;
                    }
                });


            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../styles/variable";
    #app{
        position:relative;
        width:100%;
        height:100%;
        background:url(../../assets/imgs/login-bg.jpg) no-repeat center center;
        background-size:cover;
    }
    .monitor-login-panel{
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);

    }
    .monitor-login-logo{
        position: absolute;
        top: -110px;
        left: 41%;
        color:#fff;
        letter-spacing:3px;
    }
    .monitor-login-little1{
        font-size:24px;
        font-weight:100;
        text-shadow: 2px 0px 1px rgba(1,1,1,.3);
        opacity: 0.6;
    }
    .monitor-login-little2{
        margin-top:5px;
        font-size:26px;
        font-weight: bolder;
        text-shadow: 2px 0px 1px rgba(1,1,1,.3);
    }
    .monitor-login-form__Container{
        position:relative;
        /*width:420px;*/
        /*height:254px;*/
        width: 522px;
        height: 308px;
        overflow:hidden;
        background:url(../../assets/imgs/login-bg2.jpg) no-repeat left center;
        background-size:100%;
    }
    .monitor-login-form__Wrapper{
        position: absolute;
        left: 41%;
        top: 0;
        right: 0;
        bottom: 0;
        background: #fff;
    }
    .monitor-login-form-little3{
        height:55px;
        line-height:55px;
        font-size:16px;
        border-bottom:1px solid #eee;
    }
    form{
        padding:15px 30px;
    }
    .monitor-form-item-1{
        margin-bottom:20px;
    }
    .monitor-form-item label{
        display:inline-block;
        margin-bottom:5px;
        padding-left:10px;
        font-size:12px;
    }
    .monitor-form-item-input{
        display:table;
        width:100%;
        height:30px;
        line-height:30px;
        margin-bottom:10px;
        border:1px solid #eee;
        border-radius:3px;
        font-size:0;
        &.focus{
            /*box-shadow: 0 0 0 2px #98b7e6;*/
            /*outline:2px #98b7e6 solid;*/
            border:1px solid @themeColor;
        }

    }
    .monitor-form-item-input .monitor-form-icon{
        position:relative;
        display: table-cell;
        height: 100%;
        vertical-align: middle;
        text-align: center;
        padding: 0 7px;
        font-size:14px;
        color:@themeColor;
        &:after{
            position:absolute;
            right:0;
            top:50%;
            content:"";
            transform:translateY(-50%);
            width:1px;
            height:80%;
            border-right:1px solid #eee;
        }
    }
    .monitor-form-item-input input{
        width: 93%;
        height:100%;
        border:none;
        outline:none;
        padding-left:10px;
        &::placeholder{
            color:#999;
        }


    }
    .monitor-form-button{
        width:120px;
        height:35px;
        line-height:35px;
        margin:15px 0 15px;
        background-color:@themeColor;
        text-align:center;
        border:none;
        outline:none;
        border-radius:3px;
        font-size:12px;
        letter-spacing:3px;
        color:#fff;
        &:disabled{
            background:#eee;
        }
        &:not(:disabled):hover{
            background:@btnHoverColor;
        }
    }
    .monitor-logo-error-tip{
        transform:scale(.9);
    }
</style>
