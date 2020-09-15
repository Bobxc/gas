<template>
	<!-- 微信订单页面 我要接单页面 -->
	<view class="commond">
		<view class="top_information">
			<view class="addUser-button">
				<view class="icon" @click="toHome">
					<span><image src="../../static/image/LIcon.png" mode=""></image></span>
				</view>
				<view class="navs">微信订单</view>
			</view>
			<view class="flex-button">
				<!-- <span :class="['button-two', {'button-one' : key === cut }]" v-for="(val,key) in buttonList" :key="key" @click="check(key,val.path)" v-html="val.text"> -->
				<span :class="['button-two', { 'button-one': 0 === cut }]" @click="acceptable">
					<span>可接订单</span>
					<span style="color: red;">({{ acceptOrderNum }})</span>
				</span>
				<span :class="['button-two', { 'button-one': 1 === cut }]" @click="received">
					<span>已接订单</span>
					<span style="color: red;">({{ receivedOrderNum }})</span>
				</span>
			</view>
		</view>
		<view class="bottom_information">
			<view class="content">
				<view v-if="cut === 0">
					<ul class="cardlist" v-for="(item, index) in acceptableOrders" :key="index" >
						<li style="font-size: 28rpx;height: 40rpx; padding-top: 24rpx;">钢瓶规格 :{{ item.enterprise_number }}</li>
						<li style="font-size: 28rpx;color: #0069FF;">
							<span style="color: #000000; margin-right: 5px;">数量:</span>
							{{ item.order_status_id }}瓶
						</li>
						<li>联系人 : {{ item.link_man }}</li>
						<li>配送电话 : {{ item.link_phone }}</li>
						<li>配送地址 : {{ item.link_address }}</li>
						<div class="statreWrap">
							<button v-if="cut === 0">我要接单</button>
							<div class="statre" v-else>
								<span style="color: #0069FF;">{{ item.order_type_name }}</span>
							</div>
						</div>
					</ul>
				</view>
				<view v-if="cut === 1">
					<ul class="cardlist" v-for="(item, index) in orderReceived" :key="index">
						<li style="font-size: 28rpx;height: 40rpx; padding-top: 24rpx;">钢瓶规格 :{{ item.enterprise_number }}</li>
						<li style="font-size: 28rpx;color: #0069FF;">
							<span style="color: #000000; margin-right: 5px;">数量:</span>
							{{ item.order_status_id }}瓶
						</li>
						<li>联系人 : {{ item.link_man }}</li>
						<li>配送电话 : {{ item.link_phone }}</li>
						<li>配送地址 : {{ item.link_address }}</li>
						<div class="statreWrap">
							<button v-if="cut === 0">我要接单</button>
							<div class="statre" v-else>
								<span style="color: #0069FF;">{{ item.order_type_name }}</span>
							</div>
						</div>
					</ul>
				</view>
				<!-- 空空如也 -->
				<view class="bottom_informations" v-if="empty">
					<view class="contents">
						<span><image src="../../static/image/clear.png"></image></span>
						<p>空空如也</p>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载动画 -->
		<LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>
	</view>
</template>
<script>
import LotusLoading from '../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue';
import { apiAddres, orderone, GetReceived } from '../../common/common.js';
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
			buttonList: [
				{
					className: 'button-one',
					text: '可接订单',
					num: '10',
					path: 'orderone'
				},
				{
					className: 'button-one',
					text: '已接订单',
					num: '12',
					path: 'ordertwo'
				}
			],
			acceptOrderNum: 0,
			receivedOrderNum: 0,
			cardlist: [],
			enterprise_number: '33030100001',
			data: [],
			dispatcher_number: '1002640',
			token: '',
			//可接订单
			acceptableOrders: [],
			//已接订单
			orderReceived: [],
			empty: true
		};
	},
	onLoad() {
		const loginData = uni.getStorageSync('loginData');
		this.token = loginData.F_token;
		this.loginMark = loginData.F_loginMark;
	},
	async created() {
		await this.getAcceptableList();
		await this.getReceivedList();
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
		acceptable() {
			this.cut = 0;
			this.empty = false
			if (this.acceptableOrders.length == 0) {
				this.empty = true;
			}
		},
		received() {
			this.cut = 1;
			this.empty = false
			if (this.orderReceived.length == 0) {
				this.empty = true;
			}
		},
		getAcceptableList() {
			this.lotusLoadingData.isShow = true;
			uni.request({
				url: apiAddres + orderone,
				method: 'GET',
				header: {},
				data: {
					token: this.token,
					enterprise_number: this.enterprise_number
				}
			}).then(res => {
				this.lotusLoadingData.isShow = false;
				this.acceptableOrders = res[1].data.data;
				this.acceptOrderNum = this.acceptableOrders.length;
				console.log(this.acceptableOrders);
				if(this.acceptOrderNum >0) {
					this.empty = false
				}
			});
		},
		getReceivedList() {
			uni.request({
				url: apiAddres + GetReceived,
				method: 'GET',
				header: {},
				data: {
					token: this.token,
					dispatcher_number: this.dispatcher_number
				}
			}).then(res => {
				this.orderReceived = res[1].data.data;
				this.receivedOrderNum = this.orderReceived.length;
			});
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

	.bottom_informations {
		// height: 1228rpx;
		height: 80vh;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		// padding: 0rpx 24rpx 24rpx 24rpx;
		margin-top: -80rpx;
		.contents {
			height: 1268rpx;
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
				margin: 30rpx 140rpx 0 220rpx;
				opacity: 1;
				text-align: center;
			}
		}
	}
}
</style>
