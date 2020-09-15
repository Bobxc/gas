<template>
	<!-- 操作记录页面 -->
	<view class=" commond">
		<!-- 头部页面 返回和标题 -->
		<view class="addUser">
			<view class="addUser-button">
				<view class="icon" @click="toHome">
					<span><image src="../../static/image/LIcon.png" mode=""></image></span>
				</view>
				<view class="navs">操作记录</view>
			</view>
		</view>

		<!--具体数据详情页  -->
		<view class="orderInformation">
			<ul class="cardlist">
				<li v-for="(item, index) in lis" :key="index" :class="{ evenLine: index % 2 == 1 }">
					<span>
						{{ item.time }} 添加了用户&nbsp;&nbsp;&nbsp;&nbsp;
						<span style="margin-left: 15px; color: #0048FF;">{{ item.addUser }}</span>
					</span>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			lis: [
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
				{ time: '2020.5.23  13:33:22', addUser: '新泽西' },
			]
		};
	},
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		this.toHome();
		return true;
	},
	methods: {
		toHome() {
			uni.navigateBack({})
		}
	}
};
</script>

<style lang="less">
.commond {
	height: 100vh;
	width: 100%;
	box-sizing: border-box;
	overflow: hidden;
	background-color: #f8f8ff;
}

.addUser {
	height: 340rpx;
	width: 100vw;
	background-image: url(../../static/image/backg_top.png);
	align-items: center;
	.addUser-button {
		display: flex;
		height: 200rpx;
		justify-content: center;
		align-items: center;
		.icon {
			height: 80rpx;
			width: 80rpx;
			background-color: #064ed1;
			border-radius: 30rpx;
			margin-left: 24rpx;
			box-sizing: border-box;
			line-height: 30rpx;
			span {
				font-size: 75rpx;
				color: #fffdef;
				image {
					height: 80rpx;
					line-height: 80rpx;
					width: 80rpx;
				}
			}
		}
		.navs {
			flex: 1;
			width: 100vw;
			text-indent: 4.8em;
			color: #ffffff;
			width: 164rpx;
			height: 56rpx;
			font-size: 38rpx;
			font-family: PingFang SC;
			font-weight: 700;
			line-height: 56rpx;
			color: rgba(255, 255, 255, 1);
			letter-spacing: 6rpx;
			opacity: 1;
		}
	}
}
.orderInformation {
	box-sizing: border-box;
	height: 88vh;
	padding: 0 24rpx 24rpx 24rpx;
	margin-top: -120rpx;
	.cardlist { 
		// height: calc(100% - 3%);
		height: calc(100% - 40rpx);
		width: 700rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
		border-radius: 10rpx;
		padding: 24rpx;
		box-sizing: border-box;
		overflow: scroll;
		li {
			width: 654rpx;
			height: 60rpx;
			background: rgba(245, 247, 255, 1);
			margin: 0 auto;
			text-indent: 0.5em;
			span {
				width: 510rpx;
				height: 33rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 30rpx;
				// color: rgba(0, 69, 255, 1);
			}
		}
	}
	.evenLine {
		background: #e8eeff !important;
	}
}
</style>
