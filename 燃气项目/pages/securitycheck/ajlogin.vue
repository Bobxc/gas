<template>
	<!-- 日常安检页面 -->
	<view class="commond">
		<!-- 验证方式 -->
		<view class="verification">
			<!-- 头部按钮和提示 -->
			<view class="tittle_i">
				<span @click="toHomeIndex"><image src="../../static/image/LIcon.png"></image></span>
				<p>日常安检</p>
			</view>
		</view>
		<view class="bottom_information">
			<view class="content">
				<!-- 验证方式 -->
				<view class="manner">
					<view class="orderInformation">
						<view class="orderInformation-list">
							<view class="verify ">
								<view class="verify-title">验证方式</view>
								<view class="verify-content">
									<evan-radio-group @change="radioChange">
										<evan-radio v-model="iconValue" :label="index" v-for="(item, index) in list" :key="item.value">
											<text class="evan-radio-show__label">{{ item.text }}</text>
											<template slot="icon">
												<uni-icons type="circle-filled" size="16" color="#108ee9" v-if="current === index"></uni-icons>
												<uni-icons type="circle" size="16" color="#108ee9" v-else></uni-icons>
											</template>
										</evan-radio>
									</evan-radio-group>
								</view>
							</view>
							<ul class="material ">
								<span v-if="current == 0">证件号码</span>
								<span v-if="current == 1">联系方式</span>
								<li class="message">
									<input type="text" v-model="certificate_id" v-if="current == 0" @blur="getUserInfo" />
									<input type="text" v-model="phone" v-if="current == 1" @blur="getUserInfo" />
									<span><image src="../../static/image/PositionFocusSaoma.png"></image></span>
								</li>
								<span>客户卡编号</span>
								<li class="message">
									<input type="text" v-model="user_identity_card_number" @blur="verificateUser"/>
									<span><image src="../../static/image/PositionFocusSaoma.png"></image></span>
								</li>
							</ul>
							<ul class="cmeara">
								<li class="photo" @click="takePhoto()">
									<image src="../../static/image/Camera.png" mode=""></image>
									<p>现场取证</p>
								</li>
								<li v-for="(val, key) in imglist" :key="key"><image :src="val" mode=""></image></li>
							</ul>
							<!-- <span>最多拍摄三张</span> -->
							<button type="default" @click="recording">{{ recordingText }}</button>
							<view class="paishe">
								<image src="../../static/image/Warning.png"></image>
								<span>最多上传3张</span>
							</view>
						</view>
					</view>
				</view>
				<view class="solution">
					<p>验证方式</p>
					<evan-radio-group v-for="(item, index) in tit" @change="selected(item, index)" :key="index">
						<evan-radio v-model="iconValueTwo" :label="index" :key="item.value">
							<text class="evan-radio-show__label">{{ item.text }}</text>
							<template slot="icon">
								<uni-icons type="circle-filled" size="16" color="#108ee9" v-if="iconValueTwo === index"></uni-icons>
								<uni-icons type="circle" size="16" color="#108ee9" v-else></uni-icons>
							</template>
						</evan-radio>
					</evan-radio-group>
				</view>
				<button @click="security" type="default">本人已确认无误</button>
			</view>
		</view>
	</view>
</template>

<script>
//获取手机端音频
import { apiAddres, GetUserBynum, AppService, securityCheck, yanzhengUser } from '../../common/common.js';
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
export default {
	data() {
		return {
			iconValue: 0,
			iconValueTwo: 0,
			num: 0,
			current: 0,
			currents: 0,
			setIntervalOut: null,
			checked: true,
			idNum: '',
			cardNum: '',
			list: [{ text: '身份证', value: '1' }, { text: '联系方式', value: '2' }],
			tit: [{ text: '正常', value: 1 }, { text: '异常', value: 0 }],
			role_type_id: '',
			token: '',
			loginMark: '',
			certificate_id: null,
			user_identity_card_number: null,
			phone: null,
			imagerolePath: '',
			imglist: [],
			text: 'uni-app',
			voicePath: '',
			recordingText: '按住说话',
			n: 0,
			employee_number: 'sx201800002',
			photo_path: null,
			record_path: null,
			security_check_state: 1,
			description: '',
			check_type: 0
		};
	},
	onLoad() {
		let _this = this;
		uni.getStorage({
			key: 'loginData',
			success: res => {
				this.token = res.data.F_token;
				this.loginMark = res.data.F_loginMark;
				this.role_type_id = res.data.role_type_id;
			}
		});

		recorderManager.onStop(function(res) {
			console.log('recorder stop' + JSON.stringify(res));
			_this.record_path = res.tempFilePath;
		});
	},
	//手机物理返回键
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		this.toHomeIndex();
		return true;
	},
	methods: {
		// 录音
		startRecord() {
			console.log('开始录音');

			recorderManager.start();
		},
		endRecord() {
			console.log('录音结束');
			recorderManager.stop();
		},
		playVoice() {
			console.log('播放录音');
			if (this.voicePath) {
				innerAudioContext.src = this.voicePath;
				innerAudioContext.play();
				this.recordingText = '按住开始录音';
			}
		},
		recording() {
			let n = this.n++;
			console.log(n);
			if (n % 3 === 0) {
				this.recordingText = '正在录音';
				this.startRecord();
			}
			if (n % 3 === 1) {
				this.recordingText = '录音结束';
				this.endRecord();
			}
			if (n % 3 === 2) {
				this.recordingText = '播放录音';
				this.playVoice();
			}
		},
		//验证方式切换 正常/异常
		selected(item, index) {
			console.log(item, index);
			this.security_check_state = item.value;
			if (index == 1) {
				this.toAjlonginFive();
			}
		},
		// 切换验证方式
		/* radioChangeTwo(evt) {
			this.currents = evt;
			console.log(this.currents);
			if (evt == 1) {
				this.toAjlonginFive();
			}
		}, */
		//验证方式切换  身份证/联系方式验证
		radioChange(evt) {
			this.current = evt;
			console.log(this.current);
		},
		//跳转到燃气瓶安检异常情况汇总
		toAjlonginFive() {
			uni.navigateTo({
				url: './ajloginFive'
			});
		},
		// 图片 拍照
		takePhoto() {
			let that = this;
			uni.chooseImage({
				count: 3, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: res => {
					console.log(res);
					//这里需要判断一下 当拍摄的照片大于三张的时候就让拍的照片不加载上来
					if (res.tempFilePaths.length > 3) {
						that.imglist = that.imglist.concat(JSON.parse(JSON.stringify(res.tempFilePaths))).slice(0, 3);
						that.photo_path = that.imglist.join(',');
					} else {
						if (that.imglist.length < 3) {
							that.imglist = that.imglist.concat(JSON.parse(JSON.stringify(res.tempFilePaths)));
							that.photo_path = that.imglist.join(',');
						} else {
							return;
						}
					}
				},
				fail: err => {
					console.log(err);
				}
			});
			console.log('photo_path', this.photo_path);
		},
		//通过证件号码/联系方式获取用户信息
		async getUserInfo() {
			if (this.current === 0) {
				console.log(1111);
				const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
				if (!regIdCard.test(this.certificate_id)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的身份证号',
						duration: 1000
					});
				} else {
					await uni
						.request({
							url: apiAddres + GetUserBynum,
							header: {},
							method: 'GET',
							data: {
								token: this.token,
								certificate_id: this.certificate_id
							}
						})
						.then(res => {
							console.log(res);
							if (res[1].data.code === 200) {
								this.user_identity_card_number = res[1].data.data[1].user_identity_card_number;
								uni.request({
									url: apiAddres + yanzhengUser,
									header: {},
									method: 'GET',
									data: {
										token: this.token,
										user_identity_card_number: this.user_identity_card_number
									},
									success: res => {
										console.log('res', res);
										if (res.data.code === 200) {
											uni.showToast({
												icon: 'none',
												title: '验证成功',
												duration: 1000
											});
										} else {
											uni.showToast({
												icon: 'none',
												title: '验证失败',
												duration: 1000
											});
										}
									}
								});
							}
							if (res[1].data.code === 400) {
								uni.showToast({
									icon: 'none',
									title: '参数有误,请重新输入',
									duration: 2000
								});
							}
						});
				}
			}
			if (this.current === 1) {
				const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				if (!regMobile.test(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确手机号格式',
						duration: 1000
					});
				} else {
					await uni
						.request({
							url: apiAddres + AppService,
							header: {},
							method: 'GET',
							data: {
								token: this.token,
								phone: this.phone
							}
						})
						.then(res => {
							console.log(res);
							if (res[1].data.code === 200) {
								this.user_identity_card_number = res[1].data.data[0].user_identity_card_number;
								uni.request({
									url: apiAddres + yanzhengUser,
									header: {},
									method: 'GET',
									data: {
										token: this.token,
										user_identity_card_number: this.user_identity_card_number
									},
									success: res => {
										console.log('res', res);
										if (res.data.code === 200) {
											uni.showToast({
												icon: 'none',
												title: '验证成功',
												duration: 1000
											});
										} else {
											uni.showToast({
												icon: 'none',
												title: '验证失败',
												duration: 1000
											});
										}
									}
								});
							}
							if (res[1].data.code === 400) {
								uni.showToast({
									icon: 'none',
									title: '参数有误,请重新输入',
									duration: 2000
								});
							}
						});
				}
			}
			console.log('user_identity_card_number', this.user_identity_card_number);
		},
		//通过输入客户卡编号验证用户
		verificateUser() {
			if(this.user_identity_card_number != null) {
				uni.request({
					url: apiAddres + yanzhengUser,
					header: {},
					method: 'GET',
					data: {
						token: this.token,
						user_identity_card_number: this.user_identity_card_number
					},
					success: (res) => {
						console.log(res)
						if(res.data.code ==200) {
							if(this.current == 0) {
								this.certificate_id = res.data.data[0].certificate_id
							}
							if(this.current == 1) {
								this.phone = res.data.data[0].phone
							}
							uni.showToast({
								icon: 'none',
								title: '验证成功',
								duration: 1000
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '验证失败',
								duration: 1000
							})
						}
					}
				})
			} else {
				return
			}
		},
		//安检提交请求
		security() {
			//安检记录提交校验
			if (this.user_identity_card_number == '' || this.user_identity_card_number == null) {
				uni.showToast({
					icon: 'none',
					title: '请输入客户卡编号',
					duration: 1000
				});
			} else if (this.photo_path == null) {
				uni.showToast({
					icon: 'none',
					title: '请上传照片',
					duration: 1000
				});
			} else if (this.record_path == null) {
				uni.showToast({
					icon: 'none',
					title: '请录音',
					duration: 1000
				});
			} else {
				let params = {
					employee_number: this.employee_number,
					user_identity_card_number: this.user_identity_card_number,
					photo_path: this.photo_path,
					record_path: this.record_path,
					security_check_state: this.security_check_state,
					description: this.$store.state.checkAbnormal,
					check_type: this.check_type,
					token: this.token
				};
				console.log(params);
				uni.request({
					url: apiAddres + securityCheck,
					data: params,
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					success: res => {
						console.log(res);
						if (res.data.code === 200) {
							uni.showToast({
								icon: 'none',
								title: res.data.info,
								duration: 1000
							});
						}
						if (res.data.code === 400) {
							uni.showToast({
								icon: 'none',
								title: res.data.info,
								duration: 1000
							});
						}
					}
				});
				this.$store.state.checkAbnormal = '';
				if (this.role_type_id == 4) {
					uni.navigateTo({
						url: '../test/test'
					});
				}
				if (this.role_type_id == 5) {
					uni.navigateTo({
						url: '../home/supply'
					});
				}
				if (this.role_type_id == 6) {
					console.log(123);
					uni.navigateTo({
						url: '../home/index'
					});
				}
			}
		},
		//返回按钮
		toHomeIndex() {
			this.$store.state.checkAbnormal = '';
			uni.navigateBack({})
		}
	}
};
</script>

<style lang="less" scoped>
.commond {
	// height: 1626rpx;
	height: 100vh;
	width: 100%;
	overflow: hidden;
	// border:  1px solid #000000;
	box-sizing: border-box;
	margin: 0 auto;
	background-color: #f8f8ff;
	.bottom_information {
		box-sizing: border-box;
		padding: 20rpx;
		width: 750rpx;
		height: 85vh;
		// overflow: scroll;
		margin-top: -140rpx;
		.content {
			border-radius: 16rpx;
			height: 85vh;
			opacity: 1;
			overflow: scroll;
		}
	}
	.verification {
		height: 346rpx;
		width: 100%;
		background-image: url(../../static/image/backg_top.png);
		box-sizing: border-box;
		padding-top: 60rpx;
		.tittle_i {
			height: 80rpx;
			width: 100%;
			padding-top: 17rpx;
			box-sizing: border-box;
			display: flex;
			span {
				height: 80rpx;
				width: 80rpx;
				display: block;
				padding-left: 24rpx;
				image {
					height: 80rpx;
					width: 80rpx;
					opacity: 1;
				}
			}

			p {
				flex: 1;
				width: 164rpx;
				height: 80rpx;
				font-size: 40rpx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 80rpx;
				color: rgba(255, 255, 255, 1);
				letter-spacing: 10rpx;
				padding-left: 185rpx;
			}
		}
	}

	.manner {
		height: 1002rpx;
		width: 100%;
		// border:  1px solid #FFA200;
		box-sizing: border-box;
		// margin-top: -140rpx;
		// padding: 24rpx;
		.orderInformation {
			// margin: 0 24rpx 0 24rpx;
			height: 932rpx;
			box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.1);
			background: rgba(255, 255, 255, 1);
			display: flex;
			flex-direction: column;
			border-radius: 16rpx;
			position: relative;
			.paishe {
				width: 200rpx;
				font-size: 20rpx;
				color: #ff0000;
				position: absolute;
				right: 0;
				top: 700rpx;
				image {
					height: 20rpx;
					width: 20rpx;
					padding-right: 5rpx;
					padding-top: 5rpx;
				}
			}
			.orderInformation-list {
				height: 535rpx;
				width: 100%;
				margin-top: -20rpx;
				background-color: #fff;
				border-radius: 16px;
				.material {
					padding: 0 40rpx 0 40rpx;
					.message {
						position: relative;
						height: 60rpx;
						border: 1px solid rgba(228, 228, 228, 1);
						input {
							height: 60rpx;
						}
						span {
							position: absolute;
							height: 40rpx;
							width: 40rpx;
							display: inline-block;
							right: 10rpx;
							top: 0rpx;

							image {
								height: 40rpx;
								width: 40rpx;
							}
						}
					}

					span {
						height: 80rpx;
						font-size: 32rpx;
						line-height: 80rpx;
						font-family: PingFang SC;
						font-weight: bold;
						display: inline-block;
					}
				}

				.cmeara {
					box-sizing: border-box;
					display: flex;
					height: 224rpx;
					// width: 100vw;
					background: rgba(255, 255, 255, 1);
					// border:1px solid #FF0000;
					opacity: 1;
					margin-top: 40rpx;
					padding: 0 40rpx 0 40rpx;
					box-sizing: border-box;
					position: absolute;
					li {
						image {
							width: 100%;
							height: 100%;
						}
					}
					.photo {
						width: 136rpx;
						height: 169rpx;
						background: rgba(245, 247, 255, 1);
						opacity: 1;
						margin-left: 0;
						image {
							height: 48rpx;
							width: 48rpx;
							padding: 53rpx 44rpx 0 44rpx;
						}
						p {
							width: 136rpx;
							height: 28rpx;
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 28rpx;
							color: rgba(0, 0, 0, 1);
							text-align: center;
						}
					}
					li {
						width: 136rpx;
						height: 169rpx;
						background: rgba(245, 247, 255, 1);
						opacity: 1;
						margin-left: 16rpx;
						margin-top: 16rpx;
					}
				}
				button {
					box-sizing: border-box;
					width: 294rpx;
					height: 80rpx;
					background: rgba(23, 206, 29, 1);
					opacity: 1;
					border-radius: 16rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 80rpx;
					text-align: center;
					color: rgba(255, 255, 255, 1);
					margin: 328rpx 164rpx 56rpx 200rpx;
				}
			}
			.verify {
				height: 150rpx;
				padding: 40rpx 40rpx 0 40rpx;
				.verify-title {
					width: 100%;
					height: 50rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 50rpx;
					color: rgba(0, 0, 0, 1);
					opacity: 1;
				}
				.verify-content {
					display: flex;
					vertical-align: middle;
					margin-top: 20rpx;
					uni-radio-group {
						width: 100%;
						display: flex;
						uni-label {
							flex: 1;
							display: flex;
							.text {
								font-size: 30rpx;
								height: 44rpx;
								line-height: 58rpx;
							}
						}
					}
					span {
						flex: 1;
						height: 100rpx;
						font-size: 30rpx;
						line-height: 100rpx;
						display: inline-block;
						padding-left: 30rpx;
						font-family: PingFang SC;
					}
				}
			}
		}
	}

	.solution {
		height: 45rpx;
		width: 100%;
		// border: 1px solid #FFA200;
		display: flex;
		margin-top: 42rpx;
		box-sizing: border-box;
		uni-radio-group {
			width: 100%;
			display: flex;
			uni-label {
				margin-left: 30rpx;
				display: flex;
				width: 150rpx;
				.text {
					font-size: 30rpx;
					height: 44rpx;
					line-height: 58rpx;
				}
			}
		}
		p {
			height: 45rpx;
			// width: 200rpx;
			width: 100%;
			text-align: center;
			line-height: 45rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
			// padding-left: 64rpx;
		}
		span {
			width: 57rpx;
			height: 45rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 45rpx;
			color: rgba(0, 0, 0, 1);
			margin-left: 70rpx;
			position: relative;
			right: 0;
			.check {
				position: absolute;
				left: 0;
			}
		}
	}
	button {
		// margin-top: 199rpx;
		margin-top: 100rpx;
		margin-bottom: 100rpx;
		width: 576rpx;
		height: 80rpx;
		background: rgba(0, 110, 255, 1);
		opacity: 1;
		border-radius: 16rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 80rpx;
		color: rgba(255, 255, 255, 1);
	}
	.evan-radio-group {
		display: flex;
		width: 100%;
		justify-content: start;
		.evan-radio {
			margin-left: 36rpx;
		}
		.evan-radio:nth-child(2) {
			margin-left: 80rpx !important;
		}
	}
}
</style>
