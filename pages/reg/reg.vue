<template>
    <view class="content">
        <view class="input-group">
			<cu-custom bgColor="bg-gradual-blue shadow" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">注册中心</block>
			</cu-custom>
            <view class="cu-form-group margin-top shadow">
                <text class="title">账号 ：</text>
                <input focus clearable v-model="account" placeholder="请输入账号"></input>
            </view>
            <view class="cu-form-group shadow">
            	<view class="title">密码 ：</view>
            	<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
            <view class="cu-form-group shadow">
                <text class="title">邮箱 ：</text>
                <input clearable v-model="email" placeholder="请输入邮箱"></input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="cu-btn block bg-gradual-blue margin-tb-sm lg shadow" @tap="register">注 册</button>
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
                account: '',
                password: '',
                email: ''
            }
        },
        methods: {
            register() {
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
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法'
                    });
                    return;
                }

                const data = {
                    account: this.account,
                    password: this.password,
                    email: this.email
                }
				console.log(data)
                service.addUser(data);
                uni.showToast({
                    title: '注册成功'
                });
                uni.navigateBack({
                    delta: 1
                });
            }
        }
    }
</script>

<style>

</style>
