<template>
    <view class="content">
        <view v-if="hasLogin" class="hello">
            <view class='flex-sub text-center'>
            	<view class='solid-bottom text-xl padding'>
            		<text class='text-black text-bold'>
						您好 {{userName}}，您已成功登录。
					</text>
            	</view>
				<button class="cu-btn block bg-gradual-blue margin-tb-sm" @tap="bindusercenter">个人中心</button>
            </view>
			<movable-area class="area1">
				<movable-view :x="x" :y="y" direction="all" @change="onChange" damping=100 out-of-bounds=ture >
					<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
					<!-- 我 -->
				</movable-view>
			</movable-area>
        </view>
        <view v-if="!hasLogin">
            <view class="solid-bottom text-xl padding">
				<text class='text-black text-bold'>您好 游客。</text>
            </view>
            <view class="padding">
                <view>点击 “登录弹窗” 可以 “登录您的账户”</view>
				<button class="cu-btn block bg-gradual-blue margin-tb-sm lg shadow" @tap="showModal" data-target="Modal">登录弹窗</button>
				<!-- <button class="cu-btn block bg-gradual-blue margin-tb-sm lg shadow" @tap="bindLogin1" data-target="Modal">登录跳转</button> -->
            </view>
			
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar justify-end bg-gradual-blue shadow">
						<view class="content" id='login'>登 录</view>
						<view class="action" @tap="hideModal">
							<text class="icon-close"></text>
						</view>
					</view>
					<view class="padding-xl shadow">
						<view class="input-group">
						    <view class="cu-form-group shadow">
						    	<view class="title">账号：</view>
						    	<m-input id='account' class="text-left" focus v-model="account" placeholder="请输入账号" name="input"></m-input>
						    </view>
						    <view class="cu-form-group shadow">
						    	<view class="title">密码：</view>
						    	<m-input id='password' class="text-left" type="password" displayable v-model="password" placeholder="请输入密码" ></m-input>
						    </view>
						</view>
						<view class="btn-row">
							<button class="cu-btn block bg-gradual-blue margin-tb-sm lg shadow" @tap="bindLogin">登 录</button>
						</view>
						<view class="cu-btn block shadow">
						    <navigator class="text-blue padding" url="../reg/reg">注册账号</navigator>
						    <text>|</text>
						    <navigator class="text-blue padding" url="../pwd/pwd">忘记密码</navigator>
						</view>
					</view>
				</view>
			</view>
			
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
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		components: {
		    mInput
		},
		data(){
			return{
				CustomBar: this.CustomBar,
				modalName: null,
				radio: 'radio1',
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0
			}
		},
		methods: {
			...mapMutations(['login']),
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			bindLogin1() {
			    uni.navigateTo({
			        url: '../login/login',
			    });
			},
			bindusercenter() {
			    uni.navigateTo({
			        url: '../user/user',
			    })
			},
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
						console.log(data)
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
			                    url: '../home/home',
			                });
			            } else {
			                uni.navigateBack();
			            }
			
			        }
		}
		
    }
</script>

<style>
</style>
