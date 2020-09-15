<template>
	<!-- 个人中心 主要信息 -->
	<view class="commend">
		<view class="commend_list">
			<ul class="information">
				<li style="width: 80rpx;">
					<span @click="toBack"><image src="../../static/image/LIcon.png"></image></span>
				</li>
				<li>个人中心</li>
				<li style="width: 80rpx;">
					<span @click="toMyself"><image src="../../static/image/Lcon.png"></image></span>
				</li>
			</ul>
			<ul class="card" v-for="(item, index) in cardList" :key="index">
				<li style="margin-top: 20rpx; font-size: 32rpx;">姓名:&nbsp;&nbsp;{{ userInfo.name }}</li>
				<li style="margin-bottom: 40rpx; font-size: 32rpx;">联系电话:&nbsp;&nbsp;{{ userInfo.phone }}</li>
				<li>配送车编号:&nbsp;&nbsp;{{ userInfo.car_number }}</li>
				<li>配送区域:&nbsp;&nbsp;{{ userInfo.region_name }}</li>
			</ul>
		</view>
		<view class="addInformationOne" @click="toAdduser">
			<p>新增用户统计</p>
			<image src="../../static/image/Arrow.png"></image>
		</view>
		<view class="addInformationTwo" @click="toLoadingrecord">
			<p>燃气装车记录</p>
			<image src="../../static/image/Arrow.png"></image>
		</view>
		<view class="addInformationThree" @click="toSecuritycheck">
			<p>日常安检记录</p>
			<image src="../../static/image/Arrow.png"></image>
		</view>
		<button type="default" @click="toLogin">退出登录</button>
		<p class="version">版本号：10.2.01</p>
	</view>
</template>

<script>
	import { apiAddres, userInfo } from '../../common/common.js'
export default {
	data() {
		return {
			role_type_id: '',
			loginMark: '',
			token: '',
			cardList: [{ name: '市辖区送气工人01', phone: '13388888888', number: 'EW-232', address: '惠民路' }],
			userInfo: {
				name: '',
				phone: '',
				region_name: '',
				car_number: ''
			}
		};
	},
	onLoad() {
		const loginData = uni.getStorageSync('loginData')
		this.token = loginData.F_token
		this.loginMark = loginData.F_loginMark
		this.role_type_id = loginData.role_type_id
		uni.request({
			url: apiAddres + userInfo,
			method: 'GET',
			data: {
				token: this.token
			},
			success: (res) => {
				console.log(res.data.data[0])
				this.userInfo.name = res.data.data[0].name
				this.userInfo.phone = res.data.data[0].phone
				this.userInfo.region_name = res.data.data[0].region_name
				this.userInfo.car_number = res.data.data[0].car_number
			}
		})
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
		toMyself() {
			uni.navigateTo({
				url: './personal'
			});
		},
		toLogin() {
			uni.clearStorage()
			uni.navigateTo({
				url: '../login/login'
			});
			
		},
		toAdduser() {
			uni.navigateTo({
				url: '../home/adduser'
			});
		},
		toLoadingrecord() {
			uni.navigateTo({
				url: '../allocation/loadingrecord'
			});
		},
		toSecuritycheck() {
			uni.navigateTo({
				url: '../securitycheck/ajloginSix'
			});
		}
	}
};
</script>

<style lang="less">
.commend {
	height: 1636rpx;
	height: 100vh;
	width: 100%;
	box-sizing: border-box;
	overflow: hidden;
	background-color: #f8f8ff;

	.commend_list {
		height: 400rpx;
		// background-color: #0070FF;
		background-image: url(../../static/image/backg_top.png);
		width: 100%;
		position: relative;
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
						right: 0;
						top: 0;
						position: absolute;
					}
				}
			}
		}
		.card {
			position: absolute;
			box-sizing: border-box;
			margin: 22rpx;
			width: 706rpx;
			top: 220rpx;
			height: 377rpx;
			// background:linear-gradient(128deg,rgba(74,214,231,1) 0%,rgba(1,125,255,1) 100%);
			background-image: url(../../static/image/person_center.png);
			opacity: 1;
			border-radius: 15rpx;
			padding: 31rpx;
			// border:  1px solid #FF0000;
			li {
				list-style: none;
				margin: 20rpx;
				color: #fffdef;
				font-size: 30rpx;
			}
		}
	}

	.addInformation {
		height: 1236rpx;
		border: 1px solid #222222;
		width: 100%;
		box-sizing: border-box;
		padding: 24rpx;
	}
	.addInformationOne {
		box-sizing: border-box;
		width: 100%;
		height: 120rpx;
		margin-top: 250rpx;
		padding: 30rpx;
		display: flex;
		background: rgba(255, 255, 255, 1);
		p {
			width: 220rpx;
			height: 48rpx;
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 48rpx;
			color: rgba(25, 25, 25, 1);
		}
		image {
			width: 40rpx;
			height: 42rpx;
			margin-left: 420rpx;
			align-items: center;
			// margin-top: 10rpx;
		}
	}
	.addInformationTwo {
		box-sizing: border-box;
		width: 100%;
		height: 120rpx;
		background: rgba(255, 255, 255, 1);
		padding: 30rpx;
		display: flex;
		p {
			width: 220rpx;
			height: 48rpx;
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 48rpx;
			color: rgba(25, 25, 25, 1);
		}
		image {
			width: 40rpx;
			height: 42rpx;
			margin-left: 420rpx;
			align-items: center;
			// margin-top: 10rpx;
		}
	}
	.addInformationThree {
		box-sizing: border-box;
		width: 100%;
		height: 120rpx;
		// border: 1px solid #333333;
		background: rgba(255, 255, 255, 1);
		padding: 30rpx;
		display: flex;
		p {
			width: 220rpx;
			height: 48rpx;
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 48rpx;
			color: rgba(25, 25, 25, 1);
		}
		image {
			width: 40rpx;
			height: 42rpx;
			margin-left: 420rpx;
			align-items: center;
			// margin-top: 10rpx;
		}
	}
	button {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 80rpx;
		width: 576rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
		background: rgba(247, 81, 81, 1);
		border-radius: 16rpx;
	}
	p {
		width: 750rpx;
		height: 33rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: rgba(0, 0, 0, 1);
		text-align: center;
	}
}
.content {
	border: 1px solid #ff0000;
	height: 500rpx;
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	margin-top: 300rpx;
	background: rgba(255, 255, 255, 1);
}
.version {
	position: absolute;
	bottom: 30rpx;
}
</style>
