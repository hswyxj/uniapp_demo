<template>
	<scroll-view class="page">
		<view class="content" v-if="hasLogin">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">个人中心</block>
			</cu-custom>
			
			<view class="cu-list menu sm-border card-menu margin-top">
				<view class="cu-item cu-form-group">
					<view class="content">
						<text class="icon-circlefill text-grey"></text>
						<text class="text-grey">普通选择</text>
					</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
						    {{index>-1?picker[index]:'单选项'}}
						</view>
					</picker>
				</view>
		    	<view class="cu-item arrow">
					<view class="content">
						<image src="/static/logo.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">日期选项</text>
					</view>
					<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
						<view class="picker">
							{{date}}
						</view>
					</picker>
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
			<view class="cu-list sm-border card-menu ">
			    <button class="cu-btn block bg-gradual-blue margin-tb-sm lg" @tap="bindLogout">退出登录</button>
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
				index: -1,
				skin: false,
				picker: ['选择1', '选择2', '选择3'],
				date: '2018-12-25'
			}
		},
        methods: {
            ...mapMutations(['logout']),
			PickerChange(e) {
				this.index = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			
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
