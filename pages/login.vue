<template>
    <div class="login">
        <div>
            <div class="title" v-bind:class="{ active: isActive }" v-on:click="tapTitle">免密码登录</div>
            <div class="title" v-bind:class="{ active: !isActive }" v-on:click="tapTitle">密码登录</div>
        </div>
        <div class="passwordlogin" v-show="isActive">
            <div class="inputline">
                <div class="local_num">中国+86 </div>
                <span class="vertical_line"></span>
                <div><input type="text" placeholder="请输入手机号"></div>
            </div>
            <div class="inputline">
                <div><input type="text" placeholder="请输入短信验证码"></div>
                <div class="getcode">获取短信验证码</div>
            </div>
        </div>
        <div class="tellogin" v-show="!isActive">
            <div class="inputline">
                <div><input type="text" placeholder="手机号或邮箱"></div>
            </div>
            <div class="inputline">
                <div><input type="text" placeholder="密码"></div>
            </div>
            <div class="fogetpsw">忘记密码？</div>
        </div>
        <div class="btn">注册/登录</div>
    </div>
</template>
<script>
export default {
    layout: 'login',
    data: function (){
        return {
            isActive: true
        }
    },
    methods: {
        tapTitle: function(event){
            if(event.currentTarget.innerHTML == "免密码登录"){
                this.isActive = true;
            }else {
                this.isActive = false;
            }
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "../assets/style/style.scss";
    .login{
        width: 401px;
        height: 330px;
        background-color: $header-bg;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 0px 20px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .title{
        font-size: 16px;
        color: $font-normal;
        display: inline-block;
        vertical-align: middle;
        margin-right: 25px;
        cursor: pointer;
        line-height: 60px;
        height: 60px;
    }
    .active{
        color: $font-active;
        font-size: 18px;
        font-weight: 600;
        border-bottom: 3px solid $border-bg;
    }
    .inputline{
        margin-top: 24px;
        border-bottom: 1px solid #ebebeb;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
    }
    .local_num{
        display: inline-block;
        min-width: 72px;
        font-size: 14px;
        color: #8590A6;
    }
    .vertical_line{
        width: 1px;
        height: 22px;
        margin: 0 12px;
        background: #ebebeb;
    }
    input{
        height: 48px;
        -webkit-box-flex: 1;
        -ms-flex: 1 1;
        flex: 1 1;
        padding: 0;
        overflow: hidden;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        background: transparent;
        border: none;
        resize: none;
        color: #1a1a1a;
        line-height: 24px;
        font-size: 14px;
    }
    input:focus{
        outline: none;
    }
    .getcode{
        font-size: 14px;
        position: absolute;
        top: 24px;
        right: 0;
        padding: 4px 0;
        color: #175199;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        cursor: pointer;
    }
    .getcode:hover{
        color: #666666;
    }
    .btn{
        color: $common-color;
        background-color: $border-bg;
        padding: 2px 22px;
        font-size: 14px;
        line-height: 32px;
        color: $common-color;
        text-align: center;
        cursor: pointer;
        border: 1px solid;
        border-radius: 3px;
        margin-top: 30px;
    }
    .btn:hover{
        background-color: $btnhover-bg;
    }
    .fogetpsw{
        color: #8590a6;
        font-size: 14px;
        text-align: right;
        margin-top: 10px;
    }
</style>
