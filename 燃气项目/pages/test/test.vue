<template>
	<!-- 供应站-->
	<view class="container">
		<!-- <comera></comera> -->
		<view class="contented">
			<div class="inputWarp">
				<!-- 地址图标 -->
				<view class="Addressicon">
					<image src="../../static/image/Marker.png" mode=""></image>
					<p>{{ this.site }}</p>
				</view>
				<!--输入框里面的小图标和输入框 -->
				<div class="searchWrop">
					<div class="imgWrop"><image src="../../static/image/SearchLoupe.png"></image></div>
					<input class="tit" type="text" v-model="phoneName" placeholder="输入手机号码查询订单" style="font-size: 24rpx; width: 100%;"  @click="toSearch"/>
					<!-- <div class="imgWrop" @click="search()"><image src="../../static/image/SearchLoupe.png"></image></div> -->
				</div>
				<!-- 输入框右边小按钮提示框 -->
				<div class="BellNotifications"><image src="../../static/image/BellNotifications.png" alt=""></image></div>
			</div>
			<!-- 头部导航栏 -->
			<view class="nav">
				<ul class="navlist">
					<button type="default" @click="emptyEnter">空瓶入库</button>
				</ul>
			</view>
		</view>
		<!-- 主体页面导航栏 -->
		<ul class="containerBodyList">
			<li v-for="(item, index) in containerBodyList" :key="index" @click="toweixinOrder(index)">
				<image :src="item.imgs"></image>
				<p>{{ item.tittle }}</p>
			</li>
		</ul>
	</view>
</template>

<script>
import { apiAddres, test, testZt, addUser } from '../../common/common.js';
export default {
	data() {
		return {
			show: false,
			// title: 'input',
			focus: false,
			inputValue: '',
			changeValue: '',
			containerBodyList: [
				{ imgs: '../../static/image/ziti.png', tittle: '自提', paths: '/pages/allocation/user' },
				{ imgs: '../../static/image/addcreatenewuser.png', tittle: '新增用户', paths: '/pages/truckcar/fullcar' },
				{ imgs: '../../static/image/myself.png', tittle: '个人中心', paths: '/pages/myself/main' }
			],
			token: '',
			loginMark: '',
			data: '',
			arrs: [],
			phoneName: '',
			database: {},
			site: ''
		};
	},
	onLoad(option) {
		uni.getStorage({
			key: 'loginData',
			success: res => {
				this.token = res.data.F_token;
				this.loginMark = res.data.F_loginMark;
			}
		});
		this.arrs = this.arrs;
		this.getAddress();
	},
	//监听手机端返回键
	onBackPress() {
		uni.showModal({
			title: '提示',
			content: '是否退出应用?',
			success: function(res) {
				if (res.confirm) {
					// 退出当前应用，改方法只在App中生效
					plus.runtime.quit();
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		return true; //return true的意思是禁止返回到上一个界面
	},
	methods: {
		//获取当前地理位置
		getAddress() {
			let that = this;
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: res => {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					console.log(res.address.district);
					that.site = res.address.district;
					console.log(that.site);
				}
			});
		},
		//通过手机号查询
		toSearch() {
			uni.navigateTo({
				url: '../search/serch'
			});
		},
		//空瓶入库
		emptyEnter() {
			uni.navigateTo({
				url: '../scancode/emptyenterInflated'
			});
		},
		// 分三种情况 （index==0 自提  index==1 新增用户  index==2 个人中心）
		toweixinOrder(index) {
			if (index == 0) {
				let parm = {
					token: this.token,
					loginMark: this.loginMark,
					data: { gcEmptys: '123', gcFulls: '9513000005', userNumber: '294617', remark: '这是一个测试' }
				};
				parm = JSON.stringify(parm);
				uni.request({
					url: apiAddres + testZt,
					method: 'POST',
					header: { 'Content-Type': 'application/json' },
					data: parm,
					success: res => {
						uni.navigateTo({
							url: '../allocation/user'
						});
					},
					fail: err => {
						// console.log(err.data.info)
					}
				});
			}
			if (index == 1) {
				uni.request({
					url: apiAddres + addUser,
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						certificate_id: '测试证件号',
						certificate_name: '营业证书',
						certificate_address: '测试地址',
						user_name: '测试用户',
						certificate_appendix_url: '/img/test/',
						user_identity_card_number: '30100001006',
						user_type_id: '5',
						delivery_region_id: '302003',
						delivery_address: '测试地址',
						principal: '法定代表',
						phone: '12233344444',
						gas_supply_agreement_attachment: '/img/test/',
						deposit_image_url: '/img/test/',
						login_username: '测试供应站',
						contract_appendix_url: '/img/test/contract1'
					},
					success: res => {
						uni.navigateTo({
							url: '../home/unit'
						});
					}
				});
			}
			if (index == 2) {
				uni.navigateTo({
					url: '../myself/main'
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.container {
	background: rgba(250, 250, 250, 1);
	height: 100vh;
	width: 100vw;
	box-sizing: border-box;
}
.contented {
	padding-top: 104rpx;
	height: 382rpx;
	width: 100vwrpx;
	background-color: #007aff;
	box-sizing: border-box;
}
.nav {
	width: 100vw;
	ul {
		padding: 40rpx;
		box-sizing: border-box;
	}
}

.navlist {
	list-style: none;
	display: flex;
	justify-content: space-between;
	margin: 0;
	padding: 0;
	height: 210rpx;
	button {
		width: 552rpx;
		height: 100rpx;
		background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(240, 253, 255, 1) 100%);
		opacity: 1;
		border-radius: 10rpx;
		font-size: 32rpx;
		line-height: 100rpx;
		color: rgba(12, 101, 255, 1);
	}
}
li {
	flex: 1;
	text-align: center;
}
image {
	width: 80rpx;
	height: 80rpx;
	padding-top: 15px;
}
p {
	height: 33rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 33rpx;
	color: rgba(255, 255, 255, 1);
	text-align: center;
}
.containerBodyList {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	box-sizing: border-box;
	li {
		height: 218rpx;
		width: 218rpx;
		margin: 25rpx;
		width: 218rpx;
		height: 218rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
		opacity: 0.8;
		border-radius: 16rpx;

		image {
			width: 128rpx;
			height: 128rpx;
		}
		p {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 700;
			color: #000000;
		}
	}
}
.inputWarp {
	display: flex;
	padding: 0 24rpx;
	height: 60rpx;
	line-height: 60rpx;
	.Addressicon {
		height: 60rpx;
		width: 96rpx;
		// border: 1px solid #FF0000;
		margin-right: 10rpx;
		display: flex;
		align-items: center;

		image {
			height: 24rpx;
			width: 24rpx;
			display: block;
			margin-bottom: 24rpx;
		}
		span {
			display: block;
			width: 72rpx;
			height: 32rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 32rpx;
			color: rgba(255, 255, 255, 1);
			display: inline-block;
			text-align: center;
		}
	}

	.searchWrop {
		width: 400rpx;

		.icon {
			width: 96rpx;
			height: 60rpx;

			image {
				border: 1px solid #000000;
				padding-top: 0;
				height: 10rpx;
				width: 10rpx;
			}

			span {
				width: 72rpx;
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 33rpx;
				color: rgba(255, 255, 255, 1);
			}
		}

		align-items: center;
		flex: 1;
		display: flex;
		// height: 60rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 33rpx;
		color: rgba(112, 112, 112, 1);
		border-radius: 30px;
		background: rgba(255, 255, 255, 1);
		width: 638rpx;

		.search {
			vertical-align: center;
			font-size: 24rpx;
		}

		.imgWrop {
			height: 60rpx;
			width: 65rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.search {
				width: 400rpx;
			}

			image {
				height: 40rpx;
				width: 40rpx;
				vertical-align: center;
				font-size: 0;
				padding: 0;
			}
		}

		.imgWropRight {
			height: 60rpx;
			width: 65rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				height: 40rpx;
				width: 40rpx;
				vertical-align: center;
				font-size: 0;
				padding: 0;
			}
		}
	}

	.BellNotifications {
		height: 60rpx;
		width: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	
		image {
			height: 48rpx;
			width: 48rpx;
			padding: 0;
		}
	}
}
</style>
