<template>
	<view class=" commond">
		<!-- 燃气瓶装车记录 -->
		<!-- 头部页面 返回和标题 -->
		<view class="addUser">
			<view class="addUser-button">
				<view class="icon" @click="toBack">
					<span><image src="../../static/image/LIcon.png"></image></span>
				</view>
				<view class="navs">燃气瓶装车记录</view>
			</view>
		</view>

		<!--具体数据详情页  -->
		<view class="orderInformation">
			<view class="titl" style="font-weight: 900;">装车记录查询</view>
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
				<input type="text" placeholder="车辆编号进行查询" v-model="carNumber" style="text-indent: 0.6em;" />
				<button>查询</button>
			</view>
		</view>

		<view class="card">
			<view class="content">
			<view class="cardinformation">
				<view class="settime">
					<text>车辆编号：A-001</text>
					<text style="color: #000000; font-weight: 500;">2020.5.23 14:23</text>
				</view>
				<text>满瓶燃气: 20个</text>
				<text>
					<span style="color: #000000;">燃气瓶编码：</span>
					<span @click="toAjloginTwo()">查看详情</span>
				</text>
				<text style="font-weight: 500; color: #000000;">11111</text>
			</view>
			<view class="cardinformation">
				<view class="settime">
					<text>车辆编号：A-001</text>
					<text style="color: #000000; font-weight: 500;">2020.5.23 14:23</text>
				</view>
				<text>满瓶燃气: 20个</text>
				<text>
					<span style="color: #000000;">燃气瓶编码：</span>
					<span @click="toAjloginTwo()">查看详情</span>
				</text>
				<text style="font-weight: 500; color: #000000;">11111</text>
			</view>
			<view class="cardinformation">
				<view class="settime">
					<text>车辆编号：A-001</text>
					<text style="color: #000000; font-weight: 500;">2020.5.23 14:23</text>
				</view>
				<text>满瓶燃气: 20个</text>
				<text>
					<span style="color: #000000;">燃气瓶编码：</span>
					<span @click="toAjloginTwo()">查看详情</span>
				</text>
				<text style="font-weight: 500; color: #000000;">11111</text>
			</view>
			<view class="cardinformation">
				<view class="settime">
					<text>车辆编号：A-001</text>
					<text style="color: #000000; font-weight: 500;">2020.5.23 14:23</text>
				</view>
				<text>满瓶燃气: 20个</text>
				<text>
					<span style="color: #000000;">燃气瓶编码：</span>
					<span @click="toAjloginTwo()">查看详情</span>
				</text>
				<text style="font-weight: 500; color: #000000;">11111</text>
			</view>
			</view>
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
		//装车记录查询 没有接口
		toAjloginTwo() {
			uni.request({});
			uni.navigateTo({
				url: '../securitycheck/ajloginTwo'
			});
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
	// height: 1050rpx;
	height: 62vh;
	padding-top: 4rpx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 5px 10px rgba(0, 64, 128, 0.04);
	opacity: 1;
	border-radius: 16rpx;
	// border: 1px solid #4CD964;
	margin: 0 auto;
	.content {
		height: 61vh;
		overflow: scroll;
	}
	.cardinformation {
		width: 654rpx;
		height: 280rpx;
		background: rgba(232, 238, 255, 1);
		opacity: 1;
		border-radius: 10rpx;
		margin: 23rpx auto;
		display: flex;
		flex-direction: column;
		.settime {
			display: flex;
			height: 40rpx;
			line-height: 40rpx;
			// width: 100%;
			justify-content: space-between;
		}
		text {
			// flex: 1;
			height: 30rpx;
			line-height: 30rpx;
			// width: 100%;
			padding: 24rpx;
			font-size: 28rpx;
			line-height: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(0, 69, 255, 1);
		}
	}
}
</style>
