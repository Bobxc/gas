<template>
	<!-- 查看车辆装瓶记录 -->
	<view class="commond">
		<!-- 车辆编号 -->
		<view class="list">
			<span>车辆编号:A-001</span>
			<!-- 统计个数 -->
			<view class="statistics"><p>空瓶装车燃气瓶数量：10个</p></view>

			<ul class="number_list">
				<li v-for="(item, index) in numberList" :key="index">{{ numberList[index] }}</li>
			</ul>
		</view>
		<button type="default" @click="close">关闭</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			role_type_id: '',
			numberList: [
				'100001011000010110000101',
				'100001011000010110000102',
				'100001011000010110000104',
				'100001011000010110000105',
				'100001011000010110000106',
				'100001011000010110000107',
				'100001011000010110000108',
				'100001011000010110000109',
				'100001011000010110000110'
			]
		};
	},
	onLoad() {
		uni.getStorage({
			key: 'loginData',
			success: res => {
				this.role_type_id = res.data.role_type_id;
			}
		});
	},
	methods: {
		close() {
			uni.navigateBack({})
		}
	}
};
</script>

<style lang="less">
.commond {
	// height: 1626rpx;
	height: 100vh;
	overflow: hidden;
	// border: 1px solid #333333;
	box-sizing: border-box;
	width: 750rpx;
	padding: 0 40rpx 0 40rpx;
	.list {
		overflow: scroll;
		height: 1148rpx;
		// border: 1px solid #FF0000;
		// margin-top: 248rpx;
		margin-top: 10vh;
		span {
			display: block;
			width: 252rpx;
			height: 45rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 45rpx;
			color: rgba(0, 0, 0, 1);
			opacity: 1;
			margin: 40rpx 209rpx 32rpx 209rpx;
		}
		.statistics {
			width: 100%;
			height: 80rpx;
			background: rgba(245, 247, 255, 1);
			opacity: 1;
			p {
				width: 350rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 40rpx;
				color: rgba(102, 102, 102, 1);
				text-align: center;
				padding: 20rpx 160rpx 20rpx 160rpx;
			}
		}

		.number_list {
			width: 100%;
			// height: 800rpx;
			height: 700rpx;
			overflow: scroll;
			// border: 1px solid #0069FF;
			li {
				// width:318px;
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 30rpx;
				color: rgba(0, 0, 0, 1);
				padding: 32rpx 188rpx 0rpx 164rpx;
			}
		}
	}
	button {
		width: 576rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: rgba(0, 110, 255, 1);
		opacity: 1;
		border-radius: 16rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		letter-spacing: 15rpx;
		text-align: center;
		margin-top: -200rpx;
	}
}
</style>
