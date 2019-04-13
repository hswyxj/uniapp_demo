<template>
    <view class="content">
        <view class="input-group margin-top shadow">
			<view class="cu-form-group">
				<view class="title">账号：</view>
				<input focus v-model="account" placeholder="请输入账号" id="account"></input>
		    </view>
		    <view class="cu-form-group">
			    <view class="title">密码：</view>
			    <input type="password" password="true" v-model="password" id="password" placeholder="请输入密码"></input>
			</view>
		</view>
		<view class="btn-row">
			<button class="cu-btn block bg-gradual-blue margin-tb-sm lg shadow" @tap="bindLogin">登 录</button>
		</view>
		<view class="cu-btn block">
		<navigator class="text-blue padding" url="../reg/reg">注册账号</navigator>
		<text>|</text>
		<navigator class="text-blue padding" url="../pwd/pwd">忘记密码</navigator>
		</view>
    </view>
</template>


<script>
	import service from '../../service.js';
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	
	export default {
	    components: {
	        mInput
	    },
	    data() {
	        return {
	            providerList: [],
	            hasProvider: false,
	            account: '',
	            password: '',
	            positionTop: 0
	        }
	    },
	    computed: mapState(['forcedLogin']),
	    methods: {
	        ...mapMutations(['login']),
	        bindLogin() {
	            /**
	             * 客户端对账号信息进行一些必要的校验。
	             * 实际开发中，根据业务需要进行处理，这里仅做示例。
	             */
	            if (this.account.length < 5) {
	                uni.showToast({
	                    icon: 'none',
	                    title: '账号最短为 5 个字符'
	                });
	                return;
	            }
	            if (this.password.length < 6) {
	                uni.showToast({
	                    icon: 'none',
	                    title: '密码最短为 6 个字符'
	                });
	                return;
	            }
	            /**
	             * 下面简单模拟下服务端的处理
	             * 检测用户账号密码是否在已注册的用户列表中
	             * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
	             */
	            const data = {
	                account: this.account,
	                password: this.password
	            };
	            const validUser = service.getUsers().some(function (user) {
	                return data.account === user.account && data.password === user.password;
	            });
	            if (validUser) {
	                this.toMain(this.account);
	            } else {
	                uni.showToast({
	                    icon: 'none',
	                    title: '用户账号或密码不正确',
	                });
	            }
	        },
	        oauth(value) {
	            uni.login({
	                provider: value,
	                success: (res) => {
	                    uni.getUserInfo({
	                        provider: value,
	                        success: (infoRes) => {
	                            /**
	                             * 实际开发中，获取用户信息后，需要将信息上报至服务端。
	                             * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
	                             */
	                            this.toMain(infoRes.userInfo.nickName);
	                        }
	                    });
	                },
	                fail: (err) => {
	                    console.error('授权登录失败：' + JSON.stringify(err));
	                }
	            });
	        },
	        toMain(userName) {
	            this.login(userName);
	            /**
	             * 强制登录时使用reLaunch方式跳转过来
	             * 返回首页也使用reLaunch方式
	             */
	            if (this.forcedLogin) {
	                uni.reLaunch({
	                    url: '../main/main',
	                });
	            } else {
	                uni.navigateBack();
	            }
	
	        }
	    },
	}
</script>

<style>
</style>
