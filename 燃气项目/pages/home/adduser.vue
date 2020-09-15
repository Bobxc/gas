<template>
	<view class=" commond">
		<!-- 日常安检纪录 -->
		<view class="addUser">
			<view class="addUser-button">
				<view class="icon" @click="toBack"><span>
						<image src="../../static/image/LIcon.png"></image>
					</span></view>
				<view class="navs">用户统计</view>
			</view>
		</view>

		<!--具体数据详情页  -->
		<view class="orderInformation">
			<view class="titl">用户查询</view>

			<view class="present ">
				<input v-model="phoneNumber" type="text" placeholder="  输入手机号码或者身份证号码查询" style="font-size: 24rpx;">
				<button @click="toQuery">查询</button>
			</view>
		</view>

		<view class="card">
			<ul class="cardinformation" v-for="(item,index) in cardList " :key="index">
				<li style="font-size: 30rpx; font-weight:bold;">用户名称:&nbsp;&nbsp;{{item.user}}</li>
				<li style="font-size: 30rpx; font-weight:bold;">押金:&nbsp;&nbsp;{{item.money}}元</li>
				<li style="font-size:28rpx;font-family:PingFang SC;font-weight:400;color:rgba(0,0,0,1);">身份证号码：{{item.idName}}</li>
				<li style="font-size:28rpx;font-family:PingFang SC;font-weight:400;color:rgba(0,0,0,1);">配送电话：{{item.phone}}</li>
				<li style="font-size:28rpx;font-family:PingFang SC;font-weight:400;color:rgba(0,0,0,1);">配送地址：{{item.address}}12号</li>
				<span> {{item.time}}</span>
				<p @click="enclosure()">查看附件</p>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardList: [{
						user: "周大侠",
						money: "300",
						idName: "10000000000",
						phone: '13888888888',
						address: '浙江省温州市鹿城区58号',
						time: '2020.5.30 15:44'
					},
					{
						user: "周大侠",
						money: "300",
						idName: "10000000000",
						phone: '13888888888',
						address: '浙江省温州市鹿城区58号',
						time: '2020.5.30 15:46'
					},
					{
						user: "周大侠",
						money: "300",
						idName: "10000000000",
						phone: '13888888888',
						address: '浙江省温州市鹿城区58号',
						time: '2020.5.30 15:46'
					},
					{
						user: "周大侠",
						money: "300",
						idName: "10000000000",
						phone: '13888888888',
						address: '浙江省温州市鹿城区58号',
						time: '2020.5.30 15:46'
					},
					{
						user: "周大侠",
						money: "300",
						idName: "10000000000",
						phone: '13888888888',
						address: '浙江省温州市鹿城区58号',
						time: '2020.5.30 15:46'
					},
				],
				phoneNumber: ''
			}
		},
		onBackPress(options) {
			if(options.from === 'navigateBack') {
				return false
			}
			this.toBack()
			return true
		},
		methods: {
			toBack() {
				uni.navigateBack({})
			},
			//查询 用户（没有接口）
			toQuery() {

			},
			// 查看附件
			enclosure() {
				console.log(555)
				uni.navigateTo({
					url: './statistics'
				})
			}
		}
	}
</script>

<style lang="less">
	.commond {
		width: 100wh;
		height: 100vh;
		overflow: hidden;
		background-color: #f8f8ff;
	}
	.addUser {
		height: 326rpx;
		width: 100vw;
		background-image: url(../../static/image/backg_top.png);
		align-items: center;
		padding-top: 40rpx;

		.addUser-button {
			display: flex;
			height: 200rpx;
			justify-content: center;
			align-items: center;

			.icon {
				height: 80rpx;
				width: 80rpx;
				background-color: #064ED1;
				border-radius: 30rpx;
				margin-left: 24rpx;
				box-sizing: border-box;
				line-height: 30rpx;

				span {
					height: 80rpx;
					line-height: 80rpx;
					font-size: 75rpx;
					color: #FFFDEF;

					image {
						height: 80rpx;
						line-height: 80rpx;
						width: 80rpx;
					}
				}
			}

			.navs {
				flex: 1;
				width: 287rpx;
				height: 56rpx;
				font-size: 40rpx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 56rpx;
				color: rgba(255, 255, 255, 1);
				text-indent: 5em;
				opacity: 1;
			}
		}

	}

	.orderInformation {
		margin: -140rpx 24rpx 24rpx 24rpx;
		padding: 0rpx 20rpx 0 22rpx;
		width: 654rpx;
		height: 223rpx;
		box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
		background: rgba(255, 255, 255, 1);
		border-radius: 16rpx;

		.titl {
			padding: 40rpx 0 0 0;
			// width: 131rpx;
			width: 100%;
			height: 45rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 45rpx;
			color: rgba(0, 0, 0, 1);
		}
	}

	.present {
		margin-top: 30rpx;
		width: 626rpx;
		height: 60rpx;
		position: relative;

		input {
			height: 60rpx;
			width: 458rpx;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(228, 228, 228, 1);
			position: absolute;
		}

		button {
			position: absolute;
			height: 60rpx;
			width: 140rpx;
			background: rgba(0, 69, 255, 1);
			text-align: center;
			line-height: 60rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			right: 0;
			top: 0;
			color: rgba(255, 255, 255, 1);
			border-radius: 0;
		}
	}

	.card {
		width: 702rpx;
		// height: 1245rpx;
		height: 68vh;
		overflow: scroll;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 5px 10px rgba(0, 64, 128, 0.04);
		opacity: 1;
		border-radius: 16rpx;
		border: 1px solid #FFFDEF;
		margin: 0 auto;

		.cardinformation {
			width: 654rpx;
			height: 300rpx;
			background: rgba(232, 238, 255, 1);
			opacity: 1;
			border-radius: 10rpx;
			margin: 23rpx auto;
			display: flex;
			flex-direction: column;
			position: relative;

			.settime {
				display: flex;
				height: 40rpx;
				line-height: 40rpx;
				justify-content: space-between;
			}

			li {
				height: 30rpx;
				line-height: 30rpx;
				padding-top: 24rpx;
				padding-left: 24rpx;
				font-size: 28rpx;
				line-height: 30rpx;
				font-family: PingFang SC;
				color: rgba(0, 69, 255, 1);
			}

			span {
				position: absolute;
				width: 197rpx;
				height: 30rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 30rpx;
				color: rgba(0, 0, 0, 1);
				right: -8rpx;
				top: 18rpx;

			}

			p {
				position: absolute;
				width: 100rpx;
				height: 30rpx;
				top: 50rpx;
				right: 32rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 30rpx;
				color: rgba(0, 69, 255, 1);
			}

		}
	}
</style>
