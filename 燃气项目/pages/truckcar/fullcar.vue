<template>
	<!-- 微信订单页面 我要接单页面 -->
	<view class="commond">
		<view class="top_information">
			<view class="addUser-button">
				<view class="icon" @click="toHome">
					<span><image src="../../static/image/LIcon.png" mode=""></image></span>
				</view>
				<view class="navs">车上燃气瓶</view>
			</view>
			<view class="flex-button">
				<span :class="['button-two', { 'button-one': 0 === cut }]" @click="check(0)">
					<span>空瓶数量</span>
					<span style="color: red;">({{ emptynum }})</span>
				</span>
				<span :class="['button-two', { 'button-one': 1 === cut }]" @click="check(1)">
					<span>满瓶数量</span>
					<span style="color: red;">({{ fullnum }})</span>
				</span>
			</view>
		</view>
		<view class="orderInformation">
			<view class="content">
				<ul class="cardlist" v-if="data.length > 0">
					<li v-for="(item, index) in emptyList" :key="index" v-if="cut == 0" :class="{ evenLine: index % 2 == 1 }">
						<span>{{ ++index }}、燃气瓶编号：{{ item.gas_label_number }}</span>
					</li>
					<li v-for="(item, index) in fullList" :key="index" v-if="cut == 1" :class="{ evenLine: index % 2 == 1 }">
						<span>{{ ++index }}、燃气瓶编号：{{ item.gas_label_number }}</span>
					</li>
				</ul>
				<!-- 空空如也 -->
				<view class="empty" v-if="data.length == 0">
					<view class="emptyContent">
						<view class="emptyImg"><image src="../../static/image/clear.png"></image></view>
						<view class="emptyTitle">空空如也</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载动画 -->
		<LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>
		<!--  <view class="test">自定义</view>  -->
	</view>
</template>
<script>
import LotusLoading from '../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue';
import { apiAddres, fullcar } from '../../common/common.js';
export default {
	components: {
		LotusLoading
	},
	data() {
		return {
			lotusLoadingData: {
				isShow: false //设置显示加载中组件true显示false隐藏
			},
			cut: 0,
			emptynum: 0,
			fullnum: 0,
			emptyList: [],
			fullList: [],
			buttonList: [
				{
					className: 'button-one',
					text: '空瓶数量'
				},
				{
					className: 'button-one',
					text: '满瓶数量'
				}
			],
			data: [],
			token: ''
		};
	},
	onLoad() {
		const value = uni.getStorageSync('loginData')
		console.log(value)
		this.token = value.F_token
		this.loginMark = value.F_loginMark
		this.fullcarList();
	},
	//手机端物理返回
	//由于 uni.navigateBack() 同样会触发 onBackPress 函数。因此在 onBackPress 中直接调用 uni.navigateBack() 并始终返回 true 会引发死循环
	onBackPress(options) {
		console.log(options);
		if (options.from === 'navigateBack') {
			return false;
		}
		this.toHome();
		return true;
	},
	methods: {
		fullcarList() {
			this.lotusLoadingData.isShow = true
			uni.request({
				url: apiAddres + fullcar,
				method: 'GET',
				header: {},
				data: {
					employee_number: 'sx201800002',
					token: this.token
				},
				success: res => {
					this.data = res.data.data;
					this.lotusLoadingData.isShow = false
					this.data.forEach(item => {
						console.log(item);
						if (item.bool_is_full == false) {
							this.emptyList.push(item);
							this.emptynum = this.emptyList.length;
						}
						if (item.bool_is_full == true) {
							this.fullList.push(item);
							this.fullnum = this.fullList.length;
						}
					});
				}
			});
		},
		//获取车内气瓶数量 缺接口
		check(key) {
			this.cut = key;
		},
		toHome() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>
<style lang="less">
.commond {
	height: 100vh;
	width: 750rpx;
	overflow: hidden;
	// border: 1px solid #FF0000;
	box-sizing: border-box;
	background-color: #f8f8ff;
}

.top_information {
	// position: relative;
	top: 0;
	left: 0;
	right: 0;
	bottom: 326rpx;
	background-image: url(../../static/image/backg_top.png);
	height: 400rpx;
	width: 750rpx;
	box-sizing: border-box;

	// border: 1px solid #0069FF;
	.addUser-button {
		height: 240rpx;
		display: flex;
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

	.flex-button {
		width: 100%;
		// position: absolute;
		bottom: -10rpx;
		left: 0;
		right: 0;

		.button-one {
			color: #0045ff;
			padding: 10rpx;
		}

		.button-two {
			margin-left: 24rpx;
			width: 210rpx;
			line-height: 76rpx;
			display: inline-block;
			font-size: 35rpx;
			border-radius: 20rpx 20rpx 0 0;
			background-color: #fff;
			box-sizing: border-box;
			border: 1px solid #fff;
			display: inline-block;
			text-align: center;
			font-family: PingFang SC;
			box-shadow: 0 2rpx 3rpx #fff;
		}

		.button-two:nth-child(2) {
			margin-left: 5rpx;
		}
	}
}

.bottom_information {
	// height: 1740rpx;
	width: 750rpx;
	box-sizing: border-box;
	// border: 1px solid #4CD964;
	overflow: scroll;
	padding: 0rpx 24rpx 24rpx 24rpx;
	margin-top: -80rpx;

	.content {
		// height:1240rpx;
		height: 76vh;
		box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
		opacity: 1;
		border-radius: 0rpx 0rpx 16rpx 16rpx;
		overflow: scroll;
		background: rgba(255, 255, 255, 1);
		padding: 20rpx;
	}

	.cardlist {
		// width: 654rpx;
		height: 280rpx;
		// background: rgba(245, 247, 255, 1);
		background-color: #e8eeff;
		opacity: 1;
		border-radius: 10rpx;
		margin-bottom: 24rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		position: relative;

		.statreWrap {
			.statre {
				width: 175rpx;
				height: 60rpx;
				opacity: 1;
				border-radius: 10rpx;
				position: absolute;
				top: 24rpx;
				right: 24rpx;
				font-size: 28rpx;
				text-align: center;
				font-family: PingFang SC;
				line-height: 60rpx;
				color: #0045ffff;
			}

			button {
				width: 175rpx;
				height: 60rpx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(0, 69, 255, 1);
				opacity: 1;
				border-radius: 10rpx;
				position: absolute;
				top: 24rpx;
				right: 24rpx;
				font-size: 28rpx;
				text-align: center;
				font-family: PingFang SC;
				line-height: 60rpx;
				color: rgba(0, 69, 255, 1);
			}
		}

		li {
			// width:474rpx;
			width: 100%;
			height: 30rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 30rpx;
			color: rgba(0, 0, 0, 1);
			opacity: 1;
			padding-left: 24rpx;
		}

		button {
			width: 175rpx;
			height: 60rpx;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(0, 69, 255, 1);
			opacity: 1;
			border-radius: 10rpx;
			position: absolute;
			top: 24rpx;
			right: 24rpx;
			font-size: 28rpx;
			text-align: center;
			font-family: PingFang SC;
			// font-weight:400;
			line-height: 60rpx;
			color: rgba(0, 69, 255, 1);
		}
	}
}
.orderInformation {
	box-sizing: border-box;
	// height: 1320rpx;
	width: 100vw;
	height: 82%;
	padding: 0 24rpx 24rpx 24rpx;
	overflow: scroll;
	// margin-top: -120rpx;
	margin-top: -80rpx;
	margin-right: 26rpx;
	.content {
		// height:1240rpx;
		height: 77vh;
		box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
		opacity: 1;
		border-radius: 0rpx 0rpx 16rpx 16rpx;
		overflow: scroll;
		background: rgba(255, 255, 255, 1);
		// padding: 20rpx;
	}

	.cardlist {
		// height: 1280rpx;
		height: 77vh;
		width: 700rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
		// border-radius: 10rpx;
		padding: 24rpx;
		box-sizing: border-box;

		li {
			width: 654rpx;
			height: 60rpx;
			background: rgba(245, 247, 255, 1);
			margin: 0 auto;
			border-radius: 10rpx;
			text-indent: 0.5em;

			span {
				width: 510rpx;
				height: 33rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 30rpx;
				color: rgba(0, 0, 0, 1);
			}
		}
	}

	.truckcarInformation {
		// width: 750rpx;
		width: 100%;
		height: 85vh;
		box-sizing: border-box;
		overflow: hidden;
		// padding: 0rpx 24rpx 24rpx 0;
		margin-top: -80rpx;

		.content {
			// height: 1200rpx;
			height: 85vh;
			box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
			border-radius: 0rpx 0rpx 16rpx 16rpx;
			background: rgba(255, 255, 255, 1);
			padding: 20rpx;

			span {
				height: 246.62rpx;
				width: 281.28rpx;
				display: block;
				margin: 276rpx 140rpx 0 160rpx;
				box-sizing: border-box;

				image {
					margin-left: 20px;
					height: 246.62rpx;
					width: 281.28rpx;
				}
			}

			p {
				width: 131rpx;
				height: 45rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 45rpx;
				color: rgba(102, 102, 102, 1);
				margin: 30rpx 140rpx 0 255rpx;
				opacity: 1;
				text-align: center;
			}
		}
	}
	.empty {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.emptyContent {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.emptyImg {
				width: 281.28rpx;
				height: 281.28rpx;
				margin-top: -200rpx;
				margin-bottom: 40rpx;
				image {
					width: 281.28rpx;
					height: 281.28rpx;
				}
			}
			.emptyTitle {
				font-size: 32rpx;
				color: rgba(102, 102, 102, 1);
				font-weight: 400;
			}
		}
	}

	.evenLine {
		background: #e8eeff !important;
	}
}
</style>
