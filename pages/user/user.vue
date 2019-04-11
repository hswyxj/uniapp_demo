<template>
	<view class="content">
    <view class="content" v-if="hasLogin">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人中心</block>
		</cu-custom>
		
		<view class="cu-list menu margin-top card-menu ">
			<view class="cu-item arrow">
				<view class="content">
					<text class="icon-circlefill text-grey"></text>
					<text class="text-grey">图标 + 标题</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">图片 + 标题</text>
				</view>
			</view>
			
			<view class="btn-row margin-top card-menu">
			    <button class="cu-btn block bg-gradual-blue margin-tb" @tap="bindLogout">退出登录</button>
			</view>
		</view>
		
    </view>
	</view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        computed: {
            ...mapState(['hasLogin', 'forcedLogin'])
        },
		onLoad() {
		    if (!this.hasLogin) {
				uni.navigateTo({
				    url: '../home/home',
				});
			}
		},
        methods: {
            ...mapMutations(['logout']),
            bindLogin() {
                uni.navigateTo({
                    url: '../home/home',
                });
            },
            bindLogout() {
                this.logout();
				console.log(this.forcedLogin)
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../home/home',
                    });
                } 
            }
        }
    }
</script>

<style>

</style>
