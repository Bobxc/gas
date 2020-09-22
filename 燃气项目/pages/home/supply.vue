<template>
	<!-- 供应站-->
	<view class="container">
		<view class="content">
			<div class="inputWarp">
				<!-- 地址图标 -->
				<view class="Addressicon">
					<image src="../../static/image/Marker.png" mode=""></image>
					<p>{{ this.site }}</p>
				</view>
				<!--输入框里面的小图标和输入框 -->
				<div class="searchWrop">
					<div class="imgWrop"><image src="../../static/image/SearchLoupe.png"></image></div>
					<input type="text" class="search" placeholder="输入手机号码查询订单" @click="toSearch" />
				</div>
				<!-- 输入框右边小按钮提示框 -->
				<div class="BellNotifications"><image src="../../static/image/BellNotifications.png" alt="" @click="toOperation"></image></div>
			</div>
			<!-- 头部导航栏 -->
			<view class="nav">
				<ul class="navlist">
					<li v-for="(val, key) in navList" :key="key" @click="tolever(val.patRouder, key)">
						<image :src="val.imgurl" alt="#"></image>
						<p>{{ val.text }}</p>
					</li>
				</ul>
			</view>
		</view>

		<!-- 主体页面导航栏 -->
		<ul class="containerBodyList">
			<li v-for="(item, index) in containerBodyList" :key="index" @click="toweixinOrder(index, item.paths)">
				<image :src="item.imgs"></image>
				<p>{{ item.text }}</p>
			</li>
		</ul>
		<ul class="containerBodyLists">
			<li v-for="(items, index) in containerBodyLists" :key="index" @click="toweixinOrders(items.pathss, index)">
				<image :src="items.imgs"></image>
				<p>{{ items.text }}</p>
			</li>
		</ul>
	</view>
</template>

<script>
import { apiAddres, gtestZt, Empty, Fullsupply, EmptyTo, addUser } from '../../common/common.js';
export default {
	data() {
		return {
			title: 'input',
			focus: false,
			inputValue: '',
			changeValue: '',
			navList: [
				{
					imgurl: '../../static/image/PositionFocuss.png',
					text: '满瓶入库',
					patRouder: '/pages/scancode/fullenterSupply'
				},
				{
					imgurl: '../../static/image/PositionFocus.png',
					text: '空瓶入库',
					patRouder: '/pages/scancode/emptyenterSupply'
				},
				{
					imgurl: '../../static/image/emptyOutSupply.png',
					text: '空瓶出库',
					patRouder: '/pages/scancode/emptyoutSupply'
				}
			],
			containerBodyList: [
				{
					imgs: '../../static/image/ART.png',
					text: '自提',
					paths: '/pages/allocation/user'
				},
				{
					imgs: '../../static/image/addcreatenewuser.png',
					text: '新增用户',
					paths: 'unit'
				},
				{
					imgs: '../../static/image/zu.png',
					text: '库存查询',
					paths: '/pages/station/stationStockin'
				}
			],
			containerBodyLists: [
				{
					imgs: '../../static/image/myself.png',
					text: '个人中心',
					pathss: '/pages/myself/main'
				}
			],
			token: '111',
			loginMark: '',
			data: '',
			arrs: [],
			site: ''
		};
	},
	created() {
		uni.getStorage({
			key: 'loginData',
			success: res => {
				this.token = res.data.F_token;
				this.loginMark = res.data.F_loginMark;
				console.log(this.token);
				console.log(this.F_loginMark);
				console.log(res.data, '成功接收数据111');
			}
		}),
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
		//跳转到搜索页
		toSearch() {
			uni.navigateTo({
				url: '../search/serch'
			});
		},
		//获取地理位置
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
		//跳转操作记录
		toOperation() {
			uni.navigateTo({
				url: '../truckcar/operation'
			})
		},
		tolever(path, key) {
			uni.navigateTo({
				url: path
			});
			//扫码 满瓶入库
			/* if (key == 0) {
				uni.scanCode({
					onlyFromCamera: false,
					scanType: ['qrCode'],
					success: res => {
						let src = res.result.split('/');
						this.data = src[src.length - 1]; // 6013213724  123
						//扫码成功发送请求	 字符串的格式
						var data = JSON.stringify({
							gasLabelNumber: this.data
						});
						// console.log(data)
						//这里判断data（扫码是一个还是多个） 是多个就存到data里面
						if (this.arrs.length > 1) {
							for (let i in arrs) {
								if (arrs[i].gasLabelNumber != data.gasLabelNumber) {
									data += ',' + this.data; //以对象的方式进行传值
								}
							}
						} else {
							data;
						}
						let parm = {
							token: this.token,
							loginMark: this.loginMark,
							data: data
						};
						parm = JSON.stringify(parm);
						// console.log(parm)
						uni.request({
							url: apiAddres + Fullsupply,
							header: {
								'Content-Type': 'application/json'
							},
							method: 'POST',
							data: parm,
							success: res => {
								console.log(res);
								if (res.data.code == 200) {
									uni.showToast({
										icon: 'success',
										title: '满瓶入库成功',
										duration: 1000
									});
								}
								if (res.data.code == 400) {
									uni.showToast({
										icon: 'none',
										title: '气瓶与当前责任主体类型不匹配【气瓶123】',
										duration: 2000
									});
								}
							}
						});
					}
				});
			}
			//空瓶入库
			if (key == 1) {
				uni.scanCode({
					onlyFromCamera: false,
					scanType: ['qrCode'],
					success: res => {
						let src = res.result.split('/');
						this.data = src[src.length - 1]; // 6013213724  123
						//扫码成功发送请求	 字符串的格式
						var data = JSON.stringify({
							gasLabelNumber: this.data
						});
						//这里判断data（扫码是一个还是多个） 是多个就存到data里面
						// this.data.push(data);
						if (this.arrs.length > 1) {
							for (let i in arrs) {
								if (arrs[i].gasLabelNumber != data.gasLabelNumber) {
									data += ',' + this.data; //以对象的方式进行传值
								}
							}
						} else {
							data;
						}
						let parm = {
							token: this.token,
							loginMark: this.loginMark,
							data: data
						};
						parm = JSON.stringify(parm);
						console.log(parm);
						uni.request({
							url: apiAddres + Empty,
							header: {
								'Content-Type': 'application/json'
							},
							method: 'POST',
							data: parm,
							success: res => {
								console.log(res);
								if (res.data.code == 200) {
									uni.showToast({
										icon: 'success',
										title: '空瓶入库成功',
										duration: 1000
									});
								}
								if (res.data.code == 400) {
									uni.showToast({
										icon: 'none',
										title: '无法找到气瓶状态更改类型【气瓶：123】',
										duration: 2000
									});
								}
							}
						});
					}
				});
			}
			if (key == 2) {
				uni.scanCode({
					onlyFromCamera: false,
					scanType: ['qrCode'],
					success: res => {
						let src = res.result.split('/');
						this.data = src[src.length - 1]; // 6013213724  123
						//扫码成功发送请求	 字符串的格式
						var data = JSON.stringify({
							gasLabelNumber: this.data
						});
						//这里判断data（扫码是一个还是多个） 是多个就存到data里面
						// this.data.push(data);
						if (this.arrs.length > 1) {
							for (let i in arrs) {
								if (arrs[i].gasLabelNumber != data.gasLabelNumber) {
									data += ',' + this.data; //以对象的方式进行传值
								}
							}
						} else {
							data;
						}
						let parm = {
							token: this.token,
							loginMark: this.loginMark,
							data: data
						};
						parm = JSON.stringify(parm);
						uni.request({
							url: apiAddres + EmptyTo,
							header: {
								'Content-Type': 'application/json'
							},
							method: 'POST',
							data: parm,
							success: res => {
								console.log(res);
								if (res.data.code == 200) {
									uni.showToast({
										icon: 'success',
										title: '空瓶出库成功',
										duration: 1000
									});
								}
								if (res.data.code == 400) {
									uni.showToast({
										icon: 'none',
										title: '气瓶现有责任主体类型无法使气瓶转为空【气瓶：123】',
										duration: 2000
									});
								}
							}
						});
					}
				});
			} */
		},
		//自提
		toweixinOrder(index, paths) {
			uni.navigateTo({
				url: paths
			});
		},
		toweixinOrders(pathss, index) {
			uni.navigateTo({
				url: pathss
			});
		}
	}
};
</script>

<style lang="less">
.container {
	background: rgba(250, 250, 250, 1);
	height: 100vh;
	width: 100vw;
	box-sizing: border-box;
}

.content {
	padding-top: 104rpx;
	height: 382rpx;
	width: 100vw;
	background-color: #007aff;
	box-sizing: border-box;
}

.nav {
	width: 100vw;

	ul {
		padding-top: 40rpx;
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

.containerBodyLists {
	// display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	box-sizing: border-box;

	li {
		margin: 25rpx;
		width: 204rpx;
		height: 218rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
		opacity: 0.8;
		border-radius: 16rpx;
		font-size: 24px;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 33px;
		color: rgba(0, 0, 0, 1);
		opacity: 1;

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
			width: 72rpx;
			height: 32rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 32rpx;
			color: rgba(255, 255, 255, 1);
			display: inline-block;
			text-align: center;
			color: #fff;
			border: 1px solid #ff0000;
		}
	}

	.searchWrop {
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
