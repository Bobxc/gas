<template>
	<!-- 登录页面 -->
	<view>
		<view class="box">
			<view class="login"><image src="../../static/image/log.png" mode="" class="image"></image></view>
			<view class="user">
				<div class="inputLogo">
					<span><image src="../../static/image/roundperson.png" mode=""></image></span>
				</div>
				<input class="toInput" type="text" value="username" v-model="username" maxlength="20" placeholder="请输入用户名" />
				<div class="statrc"></div>
			</view>

			<p class="tip">{{ msg }}</p>
			<view class="password">
				<div class="inputLogo">
					<span><image src="../../static/image/roundvpnkey.png" mode=""></image></span>
				</div>
				<input
					class="toInput"
					:type="flag"
					value="password"
					@click="hidden"
					v-model="password"
					@blur="leave"
					maxlength="16"
					placeholder="请输入密码"
					style="color: grey; font-size: 16px;"
				/>
				<div @click="isAnsol" v-if="flag == 'password'" class="statrc" style="display: flex; align-items: center; justify-content: center;">
					<!-- <image src="../../static/image/close.png" style="width: 44rpx; height: 44rpx;"></image> -->
				</div>
				<div @click="isAnsol" v-else class="statrc" style="display: flex; align-items: center; justify-content: center;">
					<!-- <image src="../../static/image/open.png" style="width: 44rpx; height: 44rpx;"></image> -->
				</div>
			</view>
			<button class="register" @click="toEnter()">登录</button>

			<view class="bot"><image src="../../static/image/waimai1.png" mode=""></image></view>
		</view>
		<LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>
	</view>
</template>
<script>
import { apiAddres, login } from '../../common/common.js';
import LotusLoading from '../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue';
export default {
	components: { LotusLoading },
	data() {
		return {
			windowHeight: '',
			password: '123456',
			username: 'sx201800002',
			msg: '',
			tip: false,
			num: 1,
			chack: 'icon-biyan',
			flag: 'password',
			styleuse: 'text',
			close: 'password',
			url: '',
			F_token: '',
			organization_id: '  ',
			F_loginMark: '',
			lotusLoadingData: {
				isShow: false //设置显示加载中组件true显示false隐藏
			}
		};
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				console.log(res);
				this.windowHeight = res.windowHeight;
			}
		});
	},
	//监听手机端返回键
	onBackPress() {
		plus.runtime.quit();
		return true; //return true的意思是禁止返回到上一个界面
	},
	methods: {
		// 判断密码
		leave() {
			if (this.username == '') {
				this.msg = '用户名不能为空';
				this.tip = true;
			} else if (this.password == '') {
				this.msg = '密码不能为空';
			}
		},
		//判断图标是否闭眼还是开眼
		isAnsol() {
			let n = this.num++;
			console.log(n);
			if (n % 2 == 1) {
				this.chack = 'eye';
				this.flag = this.styleuse;
			}
			if (n % 2 == 0) {
				this.chack = 'eye-slash';
				this.flag = this.close;
			}
		},
		//判断用户是否输入了密码
		toEnter(F_token, F_loginMark) {
			let router = '../home/index';
			if (this.username != '' || this.password != '') {
				this.login(router);
			} else {
				uni.showToast({
					icon: 'none',
					title: '请输入用户名或密码',
					duration: 500
				});
			}
		},
		// 鼠标离开显示提示内容
		hidden() {
			this.msg = '';
		},
		// 登录各个页面
		login(router) {
			this.lotusLoadingData.isShow = true;
			uni.request({
				url: apiAddres + login,
				//post 请求 配置请求头
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				//请求方法
				method: 'POST',
				//请求参数
				data: {
					username: this.username,
					password: this.password
				},
				success: res => {
					console.log('123', res);
					if (res.data.code == 400) {
						this.lotusLoadingData.isShow = false;
						uni.showToast({
							icon: 'none',
							title: res.data.info,
							duration: 1000
						});
					} else {
						this.lotusLoadingData.isShow = false;
						let {
							data: {
								data: {
									sysUser: { phone, realname, role_type_id, user_id, username },
									token: { F_token, F_tokenid, F_loginMark, F_logTime, F_status }
								}
							}
						} = res;
						let obj = {
							phone: phone,
							realname: realname,
							role_type_id: role_type_id,
							user_id: user_id,
							username: username,
							F_token: F_token,
							F_tokenid: F_tokenid,
							F_loginMark: F_loginMark,
							F_logTime: F_logTime,
							F_status: F_status
						};
						// 将值保存在sessionStorage中	 本地储存
						uni.setStorage({
							key: 'loginData',
							data: obj,
							success: res => {
								uni.request({
									url: router
								});
								if (role_type_id == 6) {
									//送气工页面
									uni.reLaunch({
										url: router
									});
								}
								if (role_type_id == 5) {
									//供应站页面
									uni.reLaunch({
										url: '../home/supply'
									});
								}
								if (role_type_id == 7) {
									//充气站页面
									uni.reLaunch({
										url: '../test/test'
									});
								}
							}
						});
					}
				},
				fail: err => {
					console.log('失败');
				}
			});
		}
	}
};
</script>

<style lang="less">
.box {
	height: 100%;
	width: 100vw;
	overflow: hidden;
	box-sizing: border-box;
	// border: 1px solid #FF0000;
}

.login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 434rpx;
	padding-top: 60rpx;

	.image {
		width: 180rpx;
		height: 180rpx;
	}
}

.tip {
	color: #ff0000;
	font-size: 20rpx;
	line-height: 30rpx;
	height: 30rpx;
	overflow: visible;
	padding-right: 35rpx;
	text-align: right;
}

.statrc {
	width: 45px;
	height: 45px;
}

.box {
	width: 100vw;
	height: 100vh;
	background: linear-gradient(134deg, rgba(255, 255, 255, 1) 0%, rgba(230, 238, 255, 1) 100%);
	padding: 0 48rpx;
	box-sizing: border-box;
}

.user {
	width: 652rpx;
	height: 91rpx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 6rpx 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 46rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 91rpx;
	color: rgba(153, 153, 153, 1);
	text-align: center;
	display: flex;
}

.password {
	width: 652rpx;
	height: 91rpx;
	margin-top: 30rpx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 6rpx 10rpx rgba(0, 0, 0, 0.1);
	opacity: 1;
	border-radius: 46rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 91rpx;
	color: rgba(153, 153, 153, 1);
	text-align: center;
	display: flex;
}

.register {
	width: 652rpx;
	height: 91rpx;
	background: rgba(0, 110, 255, 1);
	box-shadow: 0rpx 3rpx 6rpx rgba(0, 0, 0, 0.16);
	opacity: 1;
	border-radius: 46rpx;
	text-align: center;
	margin-top: 120rpx;
	color: #0077aa;
	outline: none;
	border: none;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 91rpx;
	color: rgba(255, 255, 255, 1);
}

.bot {
	// padding: 200rpx 77rpx 173rpx 77rpx;
	// height: 743rpx;
	// box-sizing: border-box;
	margin-left: -50rpx;

	image {
		width: 760rpx;
		height: 735rpx;
	}
}

.inputLogo {
	height: 91rpx;
	width: 120rpx;
	color: #cccccc;

	span {
		image {
			margin-top: 22rpx;
			height: 48rpx;
			width: 48rpx;
		}
	}
}

.toInput {
	height: 91rpx;
	line-height: 91rpx;
	flex: 1;
	outline: none;
	border: none;
	text-align: left;
}
</style>
