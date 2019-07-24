<template>
	<view>
		<movable-area class="area1">
			<movable-view :x="x" :y="y" direction="all" @change="onChange" damping=100 out-of-bounds=ture >
				<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
				<!-- 我 -->
			</movable-view>
		</movable-area>
		<view @tap="tap" class="uni-link uni-center uni-common-mt">
		    点击这里移动至 (30px, 30px)
		</view>
	</view>
</template>

<script>
	export default {
		data() {
        return {
            x: 0,
            y: 0,
            old: {
                x: 0,
                y: 0
            }
        }
    },
    methods: {
		tap: function(e) {
            this.x = this.old.x
            this.y = this.old.y
            this.$nextTick(function() {
                this.x = 30
                this.y = 30
            })
        },
        onChange: function(e) {
            this.old.x = e.detail.x
            this.old.y = e.detail.y
			console.log(this.old.x)
			uni.getSystemInfo({
			    success: function (res) {
			        console.log(res.model);
			        console.log(res.pixelRatio);
			        console.log(res.windowWidth);
			        console.log(res.windowHeight);
			        console.log(res.language);
			        console.log(res.version);
			        console.log(res.platform);
			    }
			});
        }
    }
	}
</script>

<style>
	.area1{
		width: 97%;
		height: 450px;
		background-color:#EBD4EF;
		movable-view{
			width: 100upx;
			height: 200upx;
			background-color: #CCE6FF;
		}
	}
	

</style>
