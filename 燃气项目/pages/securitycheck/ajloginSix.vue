<template>
	<view class=" commond">
		<!-- 燃气瓶装车记录 -->
		<!-- 头部页面 返回和标题 -->
		<view class="addUser">
			<view class="addUser-button">
				<view class="icon" @click="toBack">
					<span><image src="../../static/image/LIcon.png"></image></span>
				</view>
				<view class="navs">日常安检记录</view>
			</view>
		</view>

		<!--具体数据详情页  -->
		<view class="orderInformation">
			<view class="titl" style="font-weight: 900;">安检记录查询</view>
			<view class="calendar">
				<span>起</span>
				<view class="left">
					<ruiDatePicker fields="day" start="2010-00-00" end="2030-12-30" :value="value1" @change="bindChange1" @cancel="bindCancel1"></ruiDatePicker>
					<span class="icon"><image src="../../static/image/CalendarSchedule.png"></image></span>
				</view>
				<span style="margin-left: 20rpx;">至</span>
				<view class="right">
					<ruiDatePicker fields="day" start="2010-00-00" end="2030-12-30" :value="value2" @change="bindChange2" @cancel="bindCancel2"></ruiDatePicker>
					<span class="icon"><image src="../../static/image/CalendarSchedule.png"></image></span>
				</view>
			</view>
			<view class="present ">
				<input type="text" placeholder="输入手机号码或者身份证号码查询" v-model="carNumber" style="text-indent: 0.6em; font-size: 12px;" />
				<button>查询</button>
			</view>
		</view>

		<view class="card">
			<ul class="cardinformation" v-for="(item,index) in cardList " :key="index">
				<li style="font-size: 30rpx; font-weight:bold;">安检用户:&nbsp;&nbsp;{{item.user}}</li>
				<li style="font-size: 30rpx; font-weight:bold;">安全评定:&nbsp;&nbsp;{{item.safety}}</li>
				<li style="font-size:28rpx;font-family:PingFang SC;font-weight:400;color:rgba(0,0,0,1);">燃气瓶编码：{{item.idName}}</li>
				<li style="font-size:28rpx;font-family:PingFang SC;font-weight:400;color:rgba(0,0,0,1);">联系号码：{{item.phone}}</li>
				<li style="font-size:28rpx;font-family:PingFang SC;font-weight:400;color:rgba(0,0,0,1);">配送地址：{{item.address}}</li>
				<span> {{item.time}}</span>
				<p @click="enclosure()">查看附件</p>
			</ul>
		</view>
	</view>
</template>

<script>
import ruiDatePicker from '../../components/rattenking-dtpicker/rattenking-dtpicker.vue';
export default {
	components: {
		ruiDatePicker
	},
	data() {
		return {
			cardList: [{
					user: "周大侠",
					safety: "无异常",
					idName: "10000000000",
					phone: '13888888888',
					address: '浙江省温州市鹿城区惠民路12号',
					time: '2020.5.30 14:44'
				},
				{
					user: "周大侠",
					safety: "无异常",
					idName: "10000000000",
					phone: '13888888888',
					address: '浙江省温州市鹿城区惠民路12号',
					time: '2020.5.30 14:44'
				},
				{
					user: "周大侠",
					safety: "无异常",
					idName: "10000000000",
					phone: '13888888888',
					address: '浙江省温州市鹿城区惠民路12号',
					time: '2020.5.30 14:44'
				},
				{
					user: "周大侠",
					safety: "无异常",
					idName: "10000000000",
					phone: '13888888888',
					address: '浙江省温州市鹿城区惠民路12号',
					time: '2020.5.30 14:44'
				},
				{
					user: "周大侠",
					safety: "无异常",
					idName: "10000000000",
					phone: '13888888888',
					address: '浙江省温州市鹿城区惠民路12号',
					time: '2020.5.30 14:44'
				},
			],
			value: '',
			value1: '2019-06-22',
			value2: '2020-07-16',
			carNumber: ''
		};
	},
	onBackPress(options) {
		if(options.from === 'navigateBack') {
			return false
		}
		this.toBack()
		return true
	},
	methods: {
		//日历
		bindChange1() {},
		bindChange2() {},
		bindCancel1() {},
		bindCancel2() {},
		toBack() {
			uni.navigateBack({})
		},
		enclosure() {
			uni.navigateTo({
				url:'../home/ewm'
			})
		}
		
	}
};
</script>

<style lang="less">
/deep/ .rui-picker {
	width: 250rpx;
	outline: none;
	margin-bottom: -10rpx;
	line-height: 30rpx;
	height: 60rpx;
	border: 1px solid rgba(228, 228, 228, 1);
}
.commond {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background-color: #f8f8ff;
}
.addUser {
	height: 326rpx;
	width: 100vw;
	// background-color: #005FFF;
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
			background-color: #064ed1;
			border-radius: 30rpx;
			margin-left: 24rpx;
			box-sizing: border-box;
			line-height: 30rpx;
			span {
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
			// letter-spacing:30rpx;
			text-indent: 4em;
			opacity: 1;
		}
	}
}
.orderInformation {
	margin: -140rpx 24rpx 24rpx 24rpx;
	padding: 0rpx 20rpx 0 22rpx;
	width: 654rpx;
	height: 307rpx;
	box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
	background: rgba(255, 255, 255, 1);
	border-radius: 16rpx;
	// border: 1px solid #DF5000;

	.titl {
		padding: 40rpx 0 40rpx 0;
	}
	.calendar {
		display: flex;
		height: 60rpx;
		width: 626rpx;
		// border: 1px solid #FF0000;
		span {
			height: 60rpx;
			width: 28rpx;
			margin-top: 5px;
			// border: 1px solid #0069FF;
			display: inline-block;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 60rpx;
			color: rgba(0, 0, 0, 1);
			margin-right: 20rpx;
			// padding-top: 10rpx;
			box-sizing: border-box;
		}
		.left {
			height: 60rpx;
			width: 120rpx;
			background: rgba(255, 255, 255, 1);
			flex: 1;
			position: relative;

			.icon {
				position: absolute;
				display: block;
				height: 40rpx;
				width: 40rpx;
				top: 16rpx;
				right: 15rpx;
				margin: 3rpx;
				image {
					height: 40rpx;
					width: 40rpx;
				}
			}
		}
		.right {
			height: 60rpx;
			width: 120rpx;
			background: rgba(255, 255, 255, 1);
			flex: 1;
			position: relative;
			.icon {
				position: absolute;
				display: block;
				height: 40rpx;
				width: 40rpx;
				top: 16rpx;
				right: 15rpx;
				margin: 3rpx;
				image {
					height: 40rpx;
					width: 40rpx;
				}
			}
		}
	}
}
.present {
	margin-top: 30rpx;
	width: 626rpx;
	height: 60rpx;
	// border: 1px solid #FF0000;
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
		height: 63vh;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 5px 10px rgba(0, 64, 128, 0.04);
		opacity: 1;
		border-radius: 16rpx;
		border: 1px solid #FFFDEF;
		margin: 0 auto;
		overflow: scroll;

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
