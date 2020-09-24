<template>
	<view class=" commond">
		<!-- 燃气装车记录 -->
		<!-- 头部页面 返回和标题 -->
		<view class="addUser">
			<ul class="information">
				<li style="width: 80rpx;">
					<span @click="toBack()" style="margin-top: -10rpx;"><image src="../../static/image/LIcon.png"></image></span>
				</li>
				<li>订单统计</li>
				<!-- <li style="width: 80rpx;"><span @click="toMyself" style="background-color: #064ED1;border-radius: 15rpx;"><image style="height: 50rpx;width: 50rpx;" src="../../static/image/order_statistics.png"></image></span></li> -->
				<li style="width: 80rpx;">
					<span @click="toMyself"><image style="top: 0; right: 14rpx;" src="../../static/image/order_statistics.png"></image></span>
				</li>
			</ul>
		</view>

		<!--具体数据详情页  -->
		<view class="orderInformation">
			<view class="titl">
				<p class="left">订单查询</p>
				<p class="right">共计:{{ this.total }}个</p>
			</view>
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
		</view>

		<view class="bottom_information">
			<view class="content">
				<ul class="cardlist" v-for="(item, index) in cardlists" :key="index">
					<li style="font-size: 28rpx;height: 40rpx; padding-top: 24rpx;">钢瓶规格 :{{ item.specification_id }}</li>
					<li style="font-size: 28rpx;">
						数量 :
						<span style="color: #0069FF;">{{ item.num }}瓶</span>
					</li>
					<li>联系人 : {{ item.link_man }}</li>
					<li>配送电话 : {{ item.link_phone }}</li>
					<li style="width: 100%;">配送地址 : {{ item.link_address }}</li>
					<!-- <button> 完成确认</button> -->
					<div class="complete">完成确认</div>
				</ul>
			</view>
		</view>
		<!-- 分页 -->
		<view style="display: flex;">
			<view class="content" style="width: 710rpx; height: 120rpx; display: flex; align-items: center; background-color: #fff; margin: 0 auto; border-radius: 20rpx;">
				<!-- <paging background="#E8EEFF" color="#000000" :total="total" activecolor="#ffffff" activebackground="#0045FF" :pageSize="2" v-model="curren" @changes="dd"></paging> -->
				<paging
					:total="total"
					:pageSize="this.pageSize"
					background="#e8eeff"
					color="#000000"
					activecolor="#ffffff"
					activebackground="#0045ff"
					:first="false"
					v-model="pageNo"
					@changes="dd"
				>
					<template slot="arrow-left">
						<uni-icons type="arrowleft" size="15" color="#0045ff" background="#e8eeff" style="font-weight: 900;"></uni-icons>
					</template>
					<template slot="arrow-right">
						<uni-icons type="arrowright" size="15" color="#0045ff" background="#e8eeff" style="font-weight: 900;"></uni-icons>
					</template>
				</paging>
			</view>
		</view>
		<!-- 加载动画 -->
		<LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>
	</view>
</template>

<script>
import { apiAddres, statistics } from '../../common/common.js';
import wCalendar from '../../components/w-calendar/w-calendar.vue';
import paging from '../../components/yang-paging/yang-paging.vue';
import LotusLoading from '../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue';
import ruiDatePicker from '../../components/rattenking-dtpicker/rattenking-dtpicker.vue';
export default {
	components: {
		paging,
		ruiDatePicker,
		LotusLoading
	},
	onLoad() {
		const loginData = uni.getStorageSync('loginData');
		console.log(loginData);
		this.role_type_id = loginData.role_type_id;
		this.token = loginData.F_token;
		this.GetOrderInfoByCorpDispatcher();
	},

	data() {
		return {
			lotusLoadingData: {
				isShow: false //设置显示加载中组件true显示false隐藏
			},
			token: '',
			value1: '2019-06-22',
			value2: '2020-07-16',
			start: '',
			end: '',
			isShow: false,
			cardlists: [],
			role_type_id: '',
			current: '',
			total: 0,
			pageNo: 1,
			pageSize: 2
		};
	},
	//手机物理返回键
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		this.toBack();
		return true;
	},
	methods: {
		GetOrderInfoByCorpDispatcher() {
			this.cardlists = [];
			this.lotusLoadingData.isShow = true;
			uni.request({
				url: apiAddres + statistics,
				method: 'GET',
				header: {},
				data: {
					token: this.token,
					start_time: this.value1,
					end_time: this.value2,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				},
				success: res => {
					console.log(res);

					this.lotusLoadingData.isShow = false;
					if (res.data.code == 200) {
						this.total = res.data.data.total;
						this.cardlists = res.data.data.result;
					}
				}
			});
		},
		//分页按钮和输入页面跳转
		dd(index) {
			console.log(index);
			if (index > this.total / this.pageSize) {
				uni.showModal({
					title: '提示',
					content: '输入的页码值大于总页数!',
					showCancel: false,
					success(res) {
						if (res.confirm) {
						} else if (res.cancel) {
						}
					}
				});
				return;
			}
			if (index <= 0) {
				uni.showModal({
					title: '提示',
					content: '输入的页码值不能小于1!',
					showCancel: false,
					success(res) {
						if (res.confirm) {
						} else if (res.cancel) {
						}
					}
				});
				return;
			}
			this.pageNo = index;
			this.GetOrderInfoByCorpDispatcher();
		},

		//返回主页
		toBack() {
			uni.navigateBack({});
		},
		//送气工订单查询
		bindChange1(value) {
			console.log(value);
			this.value1 = value;
			let valu1 = Number(this.value1.split('-').join(''));
			let valu2 = Number(this.value2.split('-').join(''));
			if (valu1 < valu2) {
				this.GetOrderInfoByCorpDispatcher();
			} else {
				this.value1 = '2019-06-22';
				uni.showModal({
					title: '提示',
					content: '起始日期大于截止日期！',
					showCancel: false,
					success(res) {
						if (res.confirm) {
						} else if (res.cancel) {
						}
					}
				});
			}
		},

		bindChange2(value) {
			let _this = this;
			console.log(value);
			this.value2 = value;
			let val1 = Number(this.value1.split('-').join(''));
			let val2 = Number(this.value2.split('-').join(''));
			if (val1 > val2) {
				uni.showModal({
					title: '提示',
					content: '截止日期小于起始日期！',
					showCancel: false,
					success(res) {
						if (res.confirm) {
						} else if (res.cancel) {
						}
					}
				});
				return;
			}
			this.GetOrderInfoByCorpDispatcher();
		},
		bindCancel1() {
			console.log(this.value1);
		},
		bindCancel2() {
			console.log(222);
		},
		toMyself() {
			console.log(333);
		}
	}
};
</script>

<style lang="less">
/deep/ .rui-picker {
	width: 250rpx;
	outline: none;
	margin-bottom: -10rpx;
	border: none;
	line-height: 50rpx;
	height: 64rpx;
}

.commond {
	// height: 1626rpx;
	height: 100vh;
	width: 100%;
	overflow: hidden;
	box-sizing: border-box;
	background-color: #f8f8ff;
}
.addUser {
	height: 326rpx;
	width: 100vw;
	// background-color: #005FFF;
	background-image: url(../../static/image/backg_top.png);
	align-items: center;
	.information {
		padding: 24rpx;
		height: 111rpx;
		width: 100%;
		box-sizing: border-box;
		padding-top: 87rpx;
		display: flex;
		justify-content: space-between;
		li {
			height: 80rpx;
			color: rgba(255, 255, 255, 1);
			font-size: 40rpx;
			text-align: center;
			line-height: 80rpx;
			span {
				position: relative;
				display: block;
				height: 80rpx;
				width: 80rpx;
				image {
					height: 80rpx;
					width: 80rpx;
					right: 15rpx;
					top: 15rpx;
					position: absolute;
				}
			}
		}
	}
}
.orderInformation {
	margin: -120rpx 24rpx 24rpx 24rpx;
	padding: 0rpx 22rpx 0 22rpx;
	width: 654rpx;
	// width: 87.9%;
	height: 264rpx;
	box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
	background: rgba(255, 255, 255, 1);
	border-radius: 16rpx;
	box-sizing: border-box;
	width: 93.7%;

	.titl {
		position: relative;
		// display: flex;
		// justify-content: space-around;
		width: 100%;
		padding: 40rpx 0 40rpx 0;
		height: 60rpx;
		.left {
			float: left;
			flex: 1;
			height: 40rpx;
			width: 300rpx;
			line-height: 40rpx;
			font-size: 32rpx;
			color: #000000;
			font-weight: 700;
			float: left;
		}
		.right {
			flex: 1;
			float: right;
			right: 0;
			height: 40rpx;
			width: 200rpx;
			line-height: 40rpx;
			font-size: 32rpx;
			color: rgba(77, 200, 7, 1);
			font-weight: 700;
		}
	}
	.calendar {
		display: flex;
		height: 60rpx;
		width: 626rpx;
		// border: 1px solid #FF0000;
		span {
			height: 60rpx;
			width: 28rpx;
			// border: 1px solid #0069FF;
			display: inline-block;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 70rpx;
			color: rgba(0, 0, 0, 1);
			margin-right: 20rpx;
			// padding: ;
			box-sizing: border-box;
		}
		.left {
			padding: 0;
			height: 60rpx;
			width: 120rpx;
			height: 60rpx;
			background: rgba(255, 255, 255, 1);
			// border:1px solid rgba(228,228,228,1);
			flex: 1;
			position: relative;
			.icon {
				position: absolute;
				display: block;
				height: 40rpx;
				width: 40rpx;
				top: 10rpx;
				right: 20rpx;
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
			height: 60rpx;
			background: rgba(255, 255, 255, 1);
			// border:1px solid rgba(228,228,228,1);
			flex: 1;
			position: relative;
			.icon {
				position: absolute;
				display: block;
				height: 40rpx;
				width: 40rpx;
				top: 10rpx;
				right: 20rpx;
				margin: 3rpx;
				image {
					height: 40rpx;
					width: 40rpx;
				}
			}
		}
	}
}

.bottom_information {
	// height: 1000rpx;
	// height: 61vh;
	height: calc(100vh - 600rpx);
	width: 750rpx;
	box-sizing: border-box;
	padding: 0rpx 24rpx 24rpx 24rpx;
	margin-top: -60rpx;
	.content {
		// height: 96%;
		height: calc(100vh - 650rpx);
		box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
		opacity: 1;
		border-radius: 0rpx 0rpx 16rpx 16rpx;
		overflow: scroll;
		background: rgba(255, 255, 255, 1);
		padding: 20rpx;
		padding-bottom: 10rpx;
	}
	.cardlist {
		// width: 654rpx;
		height: 280rpx;
		// background:rgba(245,247,255,1);
		background-color: #e8eeff;
		opacity: 1;
		border-radius: 10rpx;
		margin-bottom: 24rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		position: relative;
		li {
			width: 474rpx;
			height: 30rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 30rpx;
			color: rgba(0, 0, 0, 1);
			opacity: 1;
			padding-left: 24rpx;
		}
		.complete {
			width: 175rpx;
			height: 60rpx;
			// background-color: #f5f7ff;
			position: absolute;
			top: 12rpx;
			right: 6rpx;
			font-size: 28rpx;
			text-align: center;
			font-family: PingFang SC;
			line-height: 60rpx;
			color: #4dc807;
		}
	}
}
</style>
