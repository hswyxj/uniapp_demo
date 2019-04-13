<template>
    <view class="content">
        <view v-if="hasLogin">
            <view class='margin-top'>
					<view class="controls-title margin-top">
						<movable-area>
						    <movable-view :x="x" :y="y" direction="all" @change="onChange" out-of-bounds="true" damping=300  @tap="bindusercenter">
							    <view class="cu-avatar lg round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
						    </movable-view>
							<view class="solid-bottom text-xl padding margin-top">
								<text class='text-black text-bold'>您好 {{userName}}，您已成功登录。</text>
							</view>
							<view class="padding">
							       <button class="cu-btn block bg-gradual-blue margin-top lg shadow" @tap="bindusercenter">个人中心</button>
							</view>
						</movable-area>
					</view>
            </view>
		  
        </view>
		
        <view v-if="!hasLogin">
            <view class="solid-bottom text-xl padding margin-top">
				<text class='text-black text-bold'>您好 游客。</text>
            </view>
            <view class="padding">
                <view>点击 “登录弹窗” 可以 “登录您的账户”</view>
				<button class="cu-btn block bg-gradual-blue margin-tb-sm lg shadow" @tap="showModal" data-target="Modal">登录弹窗</button>
            </view>
			
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar justify-end bg-gradual-blue shadow">
						<view class="content" id='login'>登 录</view>
						<view class="action" @tap="hideModal">
							<text class="icon-close"></text>
						</view>
					</view>
					<view class="padding-xl">
						<view class="input-group">
						    <view class="cu-form-group shadow">
						    	<view class="title">账号：</view>
						    	<input id='account' class="text-left" focus v-model="account" placeholder="请输入账号"></input>
						    </view>
						    <view class="cu-form-group shadow">
						    	<view class="title">密码：</view>
						    	<input id='password' password="true" class="text-left" type="password" v-model="password" placeholder="请输入密码" ></input>
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
		onLoad() {
		    const res = uni.getSystemInfoSync();
			this.x=res.windowWidth-50,
			this.y=(res.windowHeight-40)/2
			console.log(res.windowWidth)
			console.log(res.windowHeight)
	    },
		components: {
		    mInput
		},
		data(){
			return{
				x: 325,
				y: 310,
				old: {
				    x: 0,
				    y: 0
				},
				CustomBar: this.CustomBar,
				modalName: null,
				radio: 'radio1',
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				
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
					console.log(this.account.length)
			        uni.showToast({
			            icon: 'none',
						mask:true,
			            title: '账号最短为 5 个字符'
			        });
			        return;
			    }
			    if (this.password.length < 6) {
					console.log(this.password.length)
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
			                url: '../home/home',
			        });
			    } else {
			        uni.navigateBack();
			    }
			},
			onChange: function(e) {
				const res = uni.getSystemInfoSync();
				const Width=res.windowWidth-50
				const Height=res.windowHeight-45
				
			    this.old.x = e.detail.x
			    this.old.y = e.detail.y
				// console.log( this.old.y)
				if (this.old.y > Height-20){
					// console.log("1")
					this.x = this.old.x
					this.y = this.old.y
					this.$nextTick(function() {
					    this.y = Height-20
					    this.x = this.old.x
					})	
				} else if (this.old.y < -10){
					// console.log("1")
					this.x = this.old.x
					this.y = this.old.y
					this.$nextTick(function() {
					    this.y = -10
					    this.x = this.old.x
					})	
				}else if(this.old.x > Width || this.old.x > Width/2){
					// console.log("2")
					this.x = this.old.x
					this.y = this.old.y
					this.$nextTick(function() {
					    this.y = this.old.y
					    this.x = Width+25
					})
				}else if(this.old.x  < -45 || this.old.x < Width/2){
					// console.log("2")
					this.x = this.old.x
					this.y = this.old.y
					this.$nextTick(function() {
					    this.y = this.old.y
					    this.x = -45
					})
				}
			},
					
		}
		
    }
</script>

<style>
    movable-view {
		align-items: center;
	}

	movable-area {
		height: 2000upx;
		width: 100%;
		/* background-color: #D8D8D8; */
		overflow: hidden;
	}
</style>
