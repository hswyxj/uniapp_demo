<template>
    <view class="content">
		<cu-custom bgColor="bg-gradual-blue shadow" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">忘记密码</block>
		</cu-custom>
        <view class="cu-list menu sm-border card-menu margin-top">
            <view class="cu-form-group shadow">
                <text class="title">邮箱：</text>
				<input clearable v-model="email" placeholder="请输入邮箱"></input>
            </view>
        </view>
		<view class="cu-list card-menu margin-top">
		    <button type="primary" class="cu-btn block bg-gradual-blue margin-tb-sm lg shadow" @tap="findPassword">
			    <text class="primary" id="email" @tap="bindLogin">提 交</text>
		    </button>
		</view>

    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                email: ''
            }
        },
        methods: {
            findPassword() {
                /**
                 * 仅做示例
                 */
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法',
                    });
                    return;
                }
                uni.showToast({
                    icon: 'none',
                    title: '已发送重置邮件至注册邮箱，请注意查收。',
                    duration: 3000
                });
            }
        }
    }
</script>

<style>

</style>
