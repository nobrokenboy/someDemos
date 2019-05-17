<template>
    <div class="index">
        <!--头部-->
        <!--<div class="m-progress"></div>-->
        <header class="m-header clearfix">
            <div class="fl logo-wrapper">
                <i class="icon icon-logo mr-r-m"></i>
                <span class="logo-text">运维清洗平台</span>
            </div>
            <div class="search-wrapper fr">
                <div class="filter-box mr-r-m">
                    <select name="type" id="type" v-model="searchType">
                        <option value="0">告警类型</option>
                        <option value="1">模板</option>
                    </select>
                </div>
                <div class="search-box">
                    <input type="text" placeholder="模板，告警类型" v-model='keyword' @keyup="getQueryList">
                    <i class="icon icon-clear" @click="clearKeyword"></i>
                    <i class="icon icon-search"></i>
                </div>
                <div class="user-box">
                    <span class="f12">{{username}}</span>
                </div>
                <div class="logout-box display-inline-block" @click="logout">
                    <a>
                        <i class="icon icon-logout"></i>
                    </a>
                </div>
            </div>
        </header>
        <div class="content-wrapper">
            <!--导航栏-->
            <div class="m-menu">
                <div>
                    <ul>
                        <li v-for="item in menuList" :class="{'is-active':item.path===$route.path||item.path===$route.meta.regexPath}">
                            <i class="icon" :style="{backgroundImage:'url('+item.icon+')'}"></i>
                            <router-link :to="item.path">{{item.name}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!--内容切换-->
            <div class="right-content">
                <div class="breadcrumb-wrapper">
                    <el-breadcrumb separator="/">
                        <span class="fl position-text">当前位置：</span>
                        <el-breadcrumb-item  :to="{ path: item.path}" v-for="(item,key) in breadCrumbList" :key="key">{{item.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="real-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6" src='./index'>
</script>

<style scoped lang="less">
    @import "../../styles/variable";
    .m-progress{
        position:absolute;
        width:100%;
        height:2px;
        background:linear-gradient(to left,@pageFontColor, blue);
        animation: progress ease-in 1s;
    }
    @keyframes progress {
        0%{
            width:0;
        }
        100%{
            width:100%;
        }
    }
    .m-header{
        width:100%;
        height:@headerHeight;
        line-height:@headerHeight;
        padding-left:20px;
        background:@headerBgColor;
        font-size:0;
    }
    .logo-wrapper{
        height:100%;
        font-size:0;
    }
    .logo-box{
        /*display:block;*/
        display:inline-block;
    }

    .logo-text{
        display:inline-block;
        font-size:16px;
        color:#fff;
        font-weight:bold;
        vertical-align:middle;
        letter-spacing:1px;
    }
    .search-wrapper{
        font-size:0;
        .user-box{
            display:inline-block;
            position:relative;
            height:30px;
            line-height:30px;
            vertical-align:middle;
            color:@inputPlaceholderColor;
        }
        .filter-box,.search-box{
            display:inline-block;
            position:relative;
            height:30px;
            line-height:30px;
            vertical-align:middle;
            background:@searchBoxColor;
            border-radius:20px;
        }
        .filter-box{
            width:100px;
            select{
                width:95%;
                height:100%;
                padding-left:15px;
                background:none;
                border:none;
                color:@inputPlaceholderColor;
            }
        }
        .search-box{
            width:220px;
            margin-right:50px;
            input{
                width:75%;
                height:100%;
                padding-left:20px;
                background:none;
                border:none;
                color:#fff;
                &::placeholder{
                    /*padding-left:20px;*/
                    font-size:12px;
                    color:@inputPlaceholderColor;
                }
            }
            .icon-clear,.icon-search{
                position:absolute;
                top:50%;
                transform:translateY(-50%);
            }
            .icon-clear{
                right:36px;//20px+icon-search的宽度
            }
            .icon-search{
                 right:10px;
            }
        }
    }
    .logout-box{
        width:60px;
        margin-left:20px;
        text-align:center;
        background:rgba(255,255,255,0.1);
        cursor:pointer;
        &:hover{
            background:rgba(255,255,255,0.2);
        }
    }
    .m-menu{
        width:@navWidth;
        min-width:@navWidth;
        height:calc(100vh - @headerHeight);
        padding-left:15px;
        padding-top:26px;
        background:@navBgColor;
        li{
            margin-bottom:20px;
            i{
                width:13px;
                height:15px;
            }
            a{
                display:inline-block;
                vertical-align:middle;
                margin-left:13px;
                font-size:12px;
                color:#fff;
            }
            &.is-active{
                a{
                    color:@activeFontColor;
                }
            }
        }
    }
    .content-wrapper{
        display:flex;
        width:100%;
    }
    .right-content{
        flex:1;
        height:calc(100vh - @headerHeight);
        background:#fff;
        overflow-y: auto;
    }
    .position-text{
        font-size:12px;
        color:@commonFontColor;
    }
    .real-content{
        padding:40px;
    }

     @media screen and (max-width:665px) {
           .m-header{
               height:auto;
           }
     }

</style>
