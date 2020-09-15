<template>
	<!-- 主页面 -->
	<view class="container">
		<view class="content">
			<div class="inputWarp">
				<div class="searchWrop">
					<div class="imgWrop"><image src="../../static/image/SearchLoupe.png"></image></div>
					<input v-model="phoneSeach" type="text" class="search" placeholder="输入手机号码查询订单" @click="toSearch()" />
				</div>
				<div class="BellNotifications"><image src="../../static/image/BellNotifications.png" alt="" @click="toOperation"></image></div>
			</div>

			<view class="nav">
				<ul class="navlist">
					<li v-for="(val, key) in navList" :key="key" @click="tolever(val.patRouder, key)">
						<image :src="val.imgurl" alt="#"></image>
						<p>{{ val.text }}</p>
					</li>
				</ul>
			</view>
		</view>

		<ul class="containerBodyList">
			<li v-for="(item, index) in containerBodyList" :key="index" @click="toweixinOrder(item.paths, index)">
				<image :src="item.imgs"></image>
				<p>{{ item.text }}</p>
			</li>
		</ul>
		<ul class="containerBodyLists">
			<li v-for="(item, index) in containerBodyLists" :key="index" @click="toweixinOrders(item.pathss, index)">
				<image :src="item.imgs"></image>
				<p>{{ item.text }}</p>
			</li>
		</ul>
	</view>
</template>

<script>
import { apiAddres, Dispatcher, zDispatcher } from '../../common/common.js';
export default {
	data() {
		return {
			phoneSeach: '',
			title: 'input',
			focus: false,
			inputValue: '',
			changeValue: '',
			navList: [
				{
					imgurl: '../../static/image/PositionFocus.png',
					text: '空瓶装车',
					patRouder: 'ewm'
				},
				{
					imgurl: '../../static/image/PositionFocuss.png',
					text: '满瓶装车',
					patRouder: 'ewm'
				},
				{
					imgurl: '../../static/image/UserSingleSelect.png',
					text: '新增用户',
					patRouder: 'unit'
				}
			],
			containerBodyList: [
				{
					imgs: '../../static/image/weixin.png',
					text: '微信订单',
					paths: '/pages/weixinoreder/orderone'
				},
				{
					imgs: '../../static/image/car.png',
					text: '车上燃气瓶',
					paths: '/pages/truckcar/fullcar'
				},
				{
					imgs: '../../static/image/main.png',
					text: '燃气瓶分配',
					paths: '/pages/allocation/user'
				}
			],
			containerBodyLists: [
				{
					imgs: '../../static/image/anjian.png',
					text: '日常安检',
					pathss: '/pages/securitycheck/ajlogin'
				},
				{
					imgs: '../../static/image/chaxun.png',
					text: '订单查询',
					pathss: '/pages/orderinquiry/orderinquiry'
				},
				{
					imgs: '../../static/image/myself.png',
					text: '个人中心',
					pathss: '/pages/myself/main'
				}
			],
			token: '',
			loginMark: '',
			arrs: [],
			data: ''
		};
	},
	onLoad() {
		uni.getStorage({
			key: 'loginData',
			success: res => {
				console.log(res, '成功接收数据');
				this.token = res.data.F_token;
				this.loginMark = res.data.F_loginMark;
				console.log(this.token, this.loginMark);
			}
		});
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
		toSaoma() {
			uni.navigateTo({
				url: './saoma'
			});
		},
		//这里需要发送请求 暂时没有
		toSearch() {
			uni.navigateTo({
				url: '../search/serch'
			});
		},
		tolever(path, index) {
			/* if (index == 0) {
					uni.scanCode({
						onlyFromCamera: false,
						scanType: ['qrCode'],
						success: (res) => {
							console.log('扫码:',res)
							//截取字符串（/）以后的数字
							let src = res.result.split("/");
							this.data = src[src.length - 1]; //这是最终截取后的  6013213724  123
							//扫码成功发送请求	 { ，}字符串的格式
							var data = JSON.stringify({
								gasLabelNumber: this.data
							}); //{gasLabelNumber:'123'}
							console.log(data + '测试');
							//防止出现二次以后扫码或者扫码不成功的情况
							//判断里面是否有重复的存在 有 就pass掉 没有就直接push进去
							if (this.arrs.length > 1) {
								for (let i in arrs) {
									if (arrs[i].gasLabelNumber != data.gasLabelNumber) {
										data += ',' + this.data; //以对象的方式进行传值 
									}
								}
							} else {
								data
							}
							console.log(data)
							let parm = {
								token: this.token,
								loginMark: this.loginMark,
								data: data
							};
							//转字符串
							parm = JSON.stringify(parm)
							uni.request({
								url: apiAddres + Dispatcher,
								header: {
									'Content-Type': 'application/json'
								},
								method: 'POST',
								data: parm, //data:{}
								success: (res) => {
									console.log(res)
									if (res.data.code == 200) {

										uni.showToast({
											icon: 'success',
											title: '空瓶装车成功',
											duration: 1000
										});
									}
									if (res.data.code == 400) {
										uni.showToast({
											icon: 'none',
											title: '无法找到气瓶状态【气瓶：123】',
											duration: 2000
										});
									}
								},
								fail: (err) => {
									if (res.data.code == 500) {
										uni.showToast({
											icon: 'none',
											title: '网络异常',
											duration: 500
										});
									}
								}
							})
						},
					})
				}
				if (index == 1) {
					uni.scanCode({
						onlyFromCamera: false,
						scanType: ['qrCode'],
						success: (res) => {
							//截取字符串（/）以后的数字
							let src = res.result.split("/");
							this.data = src[src.length - 1]; //这是最终截取后的  6013213724  123
							//扫码成功发送请求	 { ，}字符串的格式
							var data = JSON.stringify({
								gasLabelNumber: this.data
							}); //{gasLabelNumber:'123'}
							console.log(data + '测试');
							//防止出现二次以后扫码或者扫码不成功的情况
							//判断里面是否有重复的存在 有 就pass掉 没有就直接push进去
							if (this.arrs.length > 1) {
								for (let i in arrs) {
									if (arrs[i].gasLabelNumber != data.gasLabelNumber) {
										data += ',' + this.data; //以对象的方式进行传值 
									}
								}
							} else {
								data
							}
							console.log(data)
							let parm = {
								token: this.token,
								loginMark: this.loginMark,
								data: data
							};
							//转字符串
							parm = JSON.stringify(parm)
							uni.request({
								url: apiAddres + zDispatcher,
								header: {
									'Content-Type': 'application/json'
								},
								method: 'POST',
								data: parm, //data:{}
								success: (res) => {
									console.log(res)
									if (res.data.code == 200) {
										uni.showToast({
											icon: 'success',
											title: '满瓶装车成功',
											duration: 1000
										});
									}
									if (res.data.code == 400) {
										uni.showToast({
											icon: 'none',
											title: '气瓶当前责任主体类型不匹配【气瓶：123】',
											duration: 2000
										});
									}
								},
							})
						},
					})
				} */
			if (index == 0) {
				uni.navigateTo({
					url: '../scancode/empty'
				});
			}
			if (index == 1) {
				uni.navigateTo({
					url: '../scancode/full'
				});
			}
			if (index == 2) {
				uni.navigateTo({
					url: path
				});
			}
		},

		toweixinOrder(paths, key) {
			uni.navigateTo({
				url: paths
			});
		},
		toweixinOrders(pathss) {
			uni.navigateTo({
				url: pathss
			});
		},
		toOperation() {
			uni.navigateTo({
				url: '../truckcar/operation'
			});
		}
	}
};
</script>

<style lang="less">
/deep/ .uni-input-input {
	width: 500rpx;
}

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
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	box-sizing: border-box;

	li {
		margin: 25rpx;

		width: 218rpx;
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
