<template>
	<scroll-view class="page">
		<view class="content" v-if="hasLogin">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">个人中心</block>
			</cu-custom>
			
			<view class="cu-list menu sm-border card-menu margin-top">
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
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							<text class="icon-clothesfill text-blue margin-right-xs"></text> 多行Item</view>
						<view class="text-gray text-sm">
							<text class="icon-infofill margin-right-xs"></text> 小目标还没有实现！</view>
					</view>
					<view class="action">
						<switch class="switch-sex" @change="SwitchSex" :class="skin?'checked':''" :checked="skin?true:false"></switch>
					</view>
				</view>
				
			</view>
			<view class="cu-list card-menu">
			    <button class="cu-btn block bg-gradual-blue lg" @tap="bindLogout">退出登录</button>
			</view>
			
		</view>
    
	</scroll-view>
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
		data(){
			return{
				skin: false
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
            },
			SwitchSex(e) {
				this.skin = e.detail.value
			}
        }
    }
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}
	
	.page.show {
		overflow: hidden;
	}
    .switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}
</style>
