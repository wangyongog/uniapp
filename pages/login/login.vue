<template>
    <view class="zai-box">
        <scroll-view scroll-y class="page">
            <view style="text-align: center;" :style="[{animation: 'show ' + 0.4+ 's 1'}]">
                <image src="/static/login3.png" mode='aspectFit' class="zai-logo"></image>
                <view class="zai-title">JEECG BOOT</view>
            </view>
            <view class="box padding-lr-xl login-paddingtop" :style="[{animation: 'show ' + 0.6+ 's 1'}]">

                <view class="cu-form-group margin-top round shadow-blur">
                    <view class="title">账号:</view>
                    <input placeholder="请输入账号" name="input" v-model="userName"></input>
                </view>
                <view class="cu-form-group margin-top round">
                    <view class="title">密码:</view>
                    <input placeholder="请输入密码" name="input" type="password" v-model="password"></input>
                </view>
                <view class="padding  flex  flex-direction">
                    <button class="cu-btn bg-green shadow-blur round lg" :loading="loading"
                            @tap="onLogin"> {{loading ? "登录中...":"登 录"}}
                    </button>
                </view>
                <!-- #ifdef APP-PLUS -->
                <view class="padding flex flex-direction  text-center  ">
                    当前版本:{{version}}
                </view>
                <!-- #endif -->

            </view>
        </scroll-view>
        <!-- 登录加载弹窗 -->
<!--        <view class="cu-load load-modal" v-if="loading">-->
<!--            &lt;!&ndash; <view class="cuIcon-emojifill text-orange"></view> &ndash;&gt;-->
<!--            <image src="/static/login3.png" mode="aspectFit"></image>-->
<!--            <view class="gray-text">登录中...</view>-->
<!--        </view>-->
        <!-- <my-image-upload></my-image-upload>
        <my-select></my-select> -->
        <!-- <my-page></my-page> -->
    </view>

</template>

<script>
    ///import Request from '@/utils/luch-request/index.js'
    //const http = new Request();
    import {
            mapState,
            mapMutations,
            mapActions
        } from 'vuex';


    export default {
        data() {
            return {
                loading: false,
                userName: '',
                password: '',
                phoneNo: '',
                smsCode: '',
                showPassword: false, //是否显示明文
                loginWay: 1, //1: 账密，2：验证码
                smsCountDown: 0,
                smsCountInterval: null,
                toggleDelay: false,
                version:''
            };
        },
        onLoad:function(){
            // #ifdef APP-PLUS
            var that=this
            plus.runtime.getProperty( plus.runtime.appid, function ( wgtinfo ) {
                that.version = wgtinfo.version
            } );
            // #endif
        },
        methods: {
            ...mapActions(["mLogin"]),

            onLogin: function (){
                if(!this.userName || this.userName.length==0){
                    this.$tip.toast('请填写用户名');
                    return;
                }
                if(!this.password || this.password.length==0){
                    this.$tip.toast('请填写密码');
                    return;
                }
                let loginParams = {
                    tel:this.userName,
                    pwd:this.password
                }
                this.loading=true;
                // http.get('/login/index.html', {params: {userName: 'name', password: '123456'}}).then(res => {
                //
                // }).catch(err => {
                //
                // })
                // return;
                this.mLogin(loginParams).then((res) => {
                    this.loading=false;
                    if(res.data.status == 1){
                        this.$tip.success('登录成功!')
                        //this.$Router.replaceAll({name:'index'})
                        /* uni.reLaunch({
                           url: '/pages/index/index'
                         }); */
                    }else{
                        this.$tip.alert(res.data.msg);
                    }
                }).catch((err) => {

                }).finally(()=>{

                })
            }
        }
    }
</script>

<style>
    .login-paddingtop {
        padding-top: 200 upx;
    }

    .zai-box {
        padding: 0 20 upx;
        padding-top: 100 upx;
        position: relative;
    }

    .zai-logo {
        width: 200upx;
        height: 300 upx;
    }

    .zai-title {
        font-size: 58upx;
        color: #000000;
        text-align: center;
    }

    .input-placeholder, .zai-input {
        color: #94afce;
    }

    .zai-label {
        padding: 60 upx 0;
        text-align: center;
        font-size: 30 upx;
        color: #a7b6d0;
    }

    .zai-btn {
        background: #ff65a3;
        color: #fff;
        border: 0;
        border-radius: 100 upx;
        font-size: 36 upx;
    }

    .zai-btn:after {
        border: 0;
    }

    /*按钮点击效果*/
    .zai-btn.button-hover {
        transform: translate(1 upx, 1 upx);
    }

</style>
