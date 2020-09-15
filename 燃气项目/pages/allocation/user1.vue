<template>
	<view>
		<view :class="['commond', { blurry: this.blurry }]">
			<!-- 燃气瓶分配  用户验证 -->
			<view class="addUser">
				<view class="addUser-button">
					<view class="icon" @click="toGoBack">
						<span><image src="../../static/image/LIcon.png" mode=""></image></span>
					</view>
					<view class="navs">燃气瓶分配</view>
					<!-- <view class="navs" v-else="this.cut">用户验证</view> -->
				</view>
				<!-- 两个固定定位 -->
				<view class="flex-button">
					<span :class="['button-two', { 'button-one': key === cut }]" v-for="(val, key) in buttonList" :key="key" @click="check(key)">{{ val.text }}</span>
				</view>
			</view>
			<view class="bottom_information">
				<!--具体数据详情页 第二页面 -->
				<view class="step" v-if="this.cut">
					<view class="stepInformation">
						<view class="stepone">
							<p style="padding-top: 80rpx;">第一步</p>
							<view class="left">
								<p>空瓶回收</p>
								<span @click="saomaOne"><image src="../../static/image/PositionFocusSaoma.png"></image></span>
							</view>
							<view class="right">
								<!-- <p>已扫码<span style="color: #0045ff;">{{ this.addnumber }}</span></p> -->
								<p>
									已扫码
									<span style="color: #0045ff; position: absolute; right: 30rpx;" >{{ this.$store.state.emptyNum }}</span>
								</p>
							</view>
						</view>
						<view class="stepone">
							<p>第二步</p>
							<view class="left">
								<p>满瓶分配</p>
								<span @click="saomaTwo"><image src="../../static/image/PositionFocusSaoma.png"></image></span>
							</view>
							<view class="right">
								<p>
									已分配
									<span style="color: #0045ff; position: absolute; right: 30rpx;">{{ this.$store.state.fullNum }}</span>
								</p>
							</view>
						</view>
						<view class="stepone">
							<p>备注</p>
							<textarea v-model="remark" value="" placeholder="请输入备注信息" />
						</view>
					</view>

					<view class="btn"><span @click="finshedf()">完成分配</span></view>
				</view>

				<!--具体数据详情页 第一页面  -->
				<view class="content" v-else>
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
								<span v-show="current == 0">证件号码</span>
								<span v-show="current == 1">联系电话</span>
								<li class="message">
									<input v-model="keyWord" type="text" @blur="move()" />
									<span><image src="../../static/image/PositionFocusSaoma.png"></image></span>
								</li>
								<span>客户卡编号</span>
								<li class="message">
									<input v-model="keyNumber" type="text" />
									<span><image src="../../static/image/PositionFocusSaoma.png"></image></span>
								</li>
							</ul>
						</view>
					</view>
					<!-- 信息采集 -->
					<view class="infomation_list">
						<ul class="infomation_lists">
							<li class="user_type">
								<span>用户类型</span>
								<input type="text" v-model="usertype" />
							</li>
							<li class="user_type">
								<span>用户姓名</span>
								<input type="text" v-model="user_name" />
							</li>
							<li class="user_type">
								<span>证件编号</span>
								<input type="text" v-model="card_number" />
							</li>
							<li class="user_type">
								<span>联系人</span>
								<input type="text" v-model="principal" />
							</li>
							<li class="user_type">
								<span>联系电话</span>
								<input type="text" v-model="phone" />
							</li>
							<li class="user_type">
								<span>配送地址</span>
								<input type="text" style="height: 100rpx;" v-model="delivery_address" />
							</li>
						</ul>
					</view>
					<view class="btn"><span @click="finsheds()">完成验证</span></view>
				</view>
			</view>
		</view>
		<e-modal class="eModal" :visible.sync="visible">
			<span><image style="width: 150rpx; height: 150rpx;" src="../../static/image/ZU539.png"></image></span>
			<p>还未验证用户信息</p>
			<button @click="closeEmodeal">关闭</button>
		</e-modal>
	</view>
</template>

<script>
import { apiAddres, cert, testZt, Dispatcher, zDispatcher, qDispatcher, GetUserBynum, AppService, yanzhengUser } from '../../common/common.js';
import Modal from '../../components/x-modal/x-modal';
export default {
	components: { Modal },
	data() {
		return {
			iconValue: 0,
			current: 0,
			remark: '',
			addnumber: 0,
			addnumbers: '',
			role_type_id: '',
			show: false,
			keyWord: '',
			keyNumber: '',
			cut: 0,
			flag: true,
			buttonList: [{ className: 'button-one', text: '用户验证' }, { className: 'button-one', text: '气瓶分配' }],
			list: [{ text: '身份证', value: '0' }, { text: '联系方式', value: '1' }],
			arr: [],
			token: '',
			loginMark: '',
			data: '',
			gcEmptys: '',
			gcFulls: '',
			userNumber: 294617,
			user_number: '',
			certificate_id: '',
			card_number: '',
			user_name: '',
			usertype: '',
			principal: '',
			phone: '',
			delivery_address: '',
			value: '',
			datalength: '',
			data: [],
			//弹出遮罩层
			visible: false,
			//背景模糊
			blurry: false,
			isVerification: ''
		};
	},
	onLoad() {
		uni.getStorage({
			key: 'loginData',
			success: res => {
				console.log(res.data.F_token + '携带的F_token值');
				this.token = res.data.F_token;
				this.loginMark = res.data.F_loginMark;
				this.role_type_id = res.data.role_type_id;
			}
		});
	},
	//手机端物理返回
	//由于 uni.navigateBack() 同样会触发 onBackPress 函数。因此在 onBackPress 中直接调用 uni.navigateBack() 并始终返回 true 会引发死循环
	onBackPress(options) {
		console.log(options);
		if (options.from === 'navigateBack') {
			return false;
		}
		this.toGoBack();
		return true;
	},
	methods: {
		//关闭遮罩层
		closeEmodeal() {
			this.visible = false;
			this.blurry = false;
		},
		//单选按钮
		radioChange(evt) {
			this.keyWord = '';
			this.user_name = '';
			this.usertype = '';
			this.principal = '';
			this.phone = '';
			this.user_identity_card_number = '';
			this.delivery_address = '';
			this.keyNumber = '';
			this.current = evt;
			console.log(this.current);
		},

		//弹框提示
		cancel(e) {
			console.log(e);
		},
		confirm(e) {
			console.log(e);
		},
		event(e) {
			console.log(e);
		},
		//扫码  第一步(空瓶回收)
		saomaOne() {
			uni.navigateTo({
				url: '../scancode/dispatcher'
			});
		},
		//第二部扫码(满瓶分配)
		saomaTwo() {
			uni.navigateTo({
				url: '../scancode/fulldistribution'
			});
		},
		//自提完成分配,气瓶分配
		finshedf() {
			if(this.role_type_id == 6) {
				console.log('user_number', this.user_number);
				const value = uni.getStorageSync('isVerification');
				this.isVerification = value;
				if (this.isVerification != 'verification') {
					this.visible = true;
					this.blurry = true;
					return;
				}
				
				if (this.$store.state.dispatcher.gcEmptys == undefined || this.$store.state.dispatcher.gcEmptys == '') {
					uni.showToast({
						icon: 'none',
						title: '空瓶回收未扫码',
						duration: 1000
					});
				} else if (this.$store.state.dispatcher.gcFulls == undefined || this.$store.state.dispatcher.gcFulls == '') {
					uni.showToast({
						icon: 'none',
						title: '满瓶分配未扫码',
						duration: 1000
					});
				} else {
					this.$store.state.dispatcher.userNumber = this.user_number;
					this.$store.state.dispatcher.remark = this.remark;
				
					let data = this.$store.state.dispatcher;
					console.log('data=', data);
				
					uni.request({
						url: apiAddres + qDispatcher,
						method: 'POST',
						header: { 'Content-Type': 'application/json' },
						data: {
							token: this.token,
							loginMark: this.loginMark,
							data: JSON.stringify(data)
						},
						success: res => {
							console.log(res);
							if (res.data.data.code == 200) {
								uni.showToast({
									icon: 'success',
									// title: '分配成功',
									title: res.data.info,
									duration: 1000
								});
							}
							if (res.data.code == 400) {
								uni.showToast({
									icon: 'none',
									// title: '气瓶当前责任主体类型不匹配【气瓶：123】',
									title: res.data.info,
									duration: 1000
								});
							}
							if (res.data.data.code == 410) {
								uni.showToast({
									icon: 'none',
									// title: '无权访问',
									title: res.data.info,
									duration: 1000
								});
							}
							if (this.role_type_id == 7) {
								uni.navigateTo({
									url: '../test/test'
								});
							}
							if (this.role_type_id == 6) {
								uni.navigateTo({
									url: '../home/index'
								});
							}
							if (this.role_type_id == 5) {
								uni.navigateTo({
									url: '../home/supply'
								});
							}
							this.$store.state.dispatcher = {};
							this.$store.state.emptyNum = '';
							this.$store.state.fullNum = '';
						}
					});
					uni.removeStorage({
						key: 'isVerification',
						success: res => {
							console.log(res);
						}
					});
				}
			}
			//供应站发起自提
			if(this.role_type_id == 5) {
				console.log('role_type_id===5')
				console.log('user_number', this.user_number);
				const value = uni.getStorageSync('isVerification');
				this.isVerification = value;
				if (this.isVerification != 'verification') {
					this.visible = true;
					this.blurry = true;
					return;
				}
				
				if (this.$store.state.dispatcher.gcEmptys == undefined || this.$store.state.dispatcher.gcEmptys == '') {
					uni.showToast({
						icon: 'none',
						title: '空瓶回收未扫码',
						duration: 1000
					});
				} else if (this.$store.state.dispatcher.gcFulls == undefined || this.$store.state.dispatcher.gcFulls == '') {
					uni.showToast({
						icon: 'none',
						title: '满瓶分配未扫码',
						duration: 1000
					});
				} else {
					this.$store.state.dispatcher.userNumber = this.user_number;
					this.$store.state.dispatcher.remark = this.remark;
				
					let data = this.$store.state.dispatcher;
					console.log('data=', data);
				
					uni.request({
						url: apiAddres + gtestZt,
						method: 'POST',
						header: { 'Content-Type': 'application/json' },
						data: {
							token: this.token,
							loginMark: this.loginMark,
							data: JSON.stringify(data)
						},
						success: res => {
							console.log(res);
							if (res.data.data.code == 200) {
								uni.showToast({
									icon: 'success',
									// title: '分配成功',
									title: res.data.info,
									duration: 1000
								});
							}
							if (res.data.code == 400) {
								uni.showToast({
									icon: 'none',
									// title: '气瓶当前责任主体类型不匹配【气瓶：123】',
									title: res.data.info,
									duration: 1000
								});
							}
							if (res.data.data.code == 410) {
								uni.showToast({
									icon: 'none',
									// title: '无权访问',
									title: res.data.info,
									duration: 1000
								});
							}
							if (this.role_type_id == 7) {
								uni.navigateTo({
									url: '../test/test'
								});
							}
							if (this.role_type_id == 6) {
								uni.navigateTo({
									url: '../home/index'
								});
							}
							if (this.role_type_id == 5) {
								uni.navigateTo({
									url: '../home/supply'
								});
							}
							this.$store.state.dispatcher = {};
							this.$store.state.emptyNum = '';
							this.$store.state.fullNum = '';
						}
					});
					uni.removeStorage({
						key: 'isVerification',
						success: res => {
							console.log(res);
						}
					});
				}
			}
			//充气站发起自提
			if(this.role_type_id == 7) {
				console.log('role_type_id===7')
				console.log('user_number', this.user_number);
				const value = uni.getStorageSync('isVerification');
				this.isVerification = value;
				if (this.isVerification != 'verification') {
					this.visible = true;
					this.blurry = true;
					return;
				}
				
				if (this.$store.state.dispatcher.gcEmptys == undefined || this.$store.state.dispatcher.gcEmptys == '') {
					uni.showToast({
						icon: 'none',
						title: '空瓶回收未扫码',
						duration: 1000
					});
				} else if (this.$store.state.dispatcher.gcFulls == undefined || this.$store.state.dispatcher.gcFulls == '') {
					uni.showToast({
						icon: 'none',
						title: '满瓶分配未扫码',
						duration: 1000
					});
				} else {
					this.$store.state.dispatcher.userNumber = this.user_number;
					this.$store.state.dispatcher.remark = this.remark;
				
					let data = this.$store.state.dispatcher;
					console.log('data=', data);
				
					uni.request({
						url: apiAddres + testZt,
						method: 'POST',
						header: { 'Content-Type': 'application/json' },
						data: {
							token: this.token,
							loginMark: this.loginMark,
							data: JSON.stringify(data)
						},
						success: res => {
							console.log(res);
							if (res.data.data.code == 200) {
								uni.showToast({
									icon: 'success',
									// title: '分配成功',
									title: res.data.info,
									duration: 1000
								});
							}
							if (res.data.code == 400) {
								uni.showToast({
									icon: 'none',
									// title: '气瓶当前责任主体类型不匹配【气瓶：123】',
									title: res.data.info,
									duration: 1000
								});
							}
							if (res.data.data.code == 410) {
								uni.showToast({
									icon: 'none',
									// title: '无权访问',
									title: res.data.info,
									duration: 1000
								});
							}
							if (this.role_type_id == 7) {
								uni.navigateTo({
									url: '../test/test'
								});
							}
							if (this.role_type_id == 6) {
								uni.navigateTo({
									url: '../home/index'
								});
							}
							if (this.role_type_id == 5) {
								uni.navigateTo({
									url: '../home/supply'
								});
							}
							this.$store.state.dispatcher = {};
							this.$store.state.emptyNum = '';
							this.$store.state.fullNum = '';
						}
					});
					uni.removeStorage({
						key: 'isVerification',
						success: res => {
							console.log(res);
						}
					});
				}
			}
		},
		//身份证验证 （联系方式验证） //这里需要正则表达式来判断电话号码和编号 （后期补上）
		move() {
			if (this.keyWord != '') {
				if (this.current == 0) {
					const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
					if (!regIdCard.test(this.keyWord)) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确的身份证号',
							duration: 1000
						});
					} else {
						uni.request({
							url: apiAddres + GetUserBynum,
							header: {},
							method: 'GET',
							data: {
								token: this.token,
								certificate_id: this.keyWord,
								user_identity_card_number: this.keyNumber
							},
							success: res => {
								if (res.data.code == 200) {
									console.log(res);
									this.user_name = res.data.data[0].user_name;
									this.usertype = res.data.data[0].usertype;
									this.principal = res.data.data[0].principal;
									this.phone = res.data.data[0].phone;
									this.delivery_address = res.data.data[0].delivery_address;
									this.keyNumber = res.data.data[1].user_identity_card_number;
								}
								if (res.data.code == 400) {
									uni.showToast({
										icon: 'none',
										title: '参数有误,请重新输入',
										duration: 2000
									});
								}
							}
						});
					}
				}
				if (this.current == 1) {
					const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
					if (!regMobile.test(this.keyWord)) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确手机号格式',
							duration: 1000
						});
					} else {
						uni.request({
							url: apiAddres + AppService,
							header: {},
							method: 'GET',
							data: {
								token: this.token,
								phone: this.keyWord,
								user_identity_card_number: this.keyNumber
							},
							success: res => {
								if (res.data.code == 200) {
									console.log(res);
									this.user_name = res.data.data[0].user_name;
									this.usertype = res.data.data[0].usertype;
									this.principal = res.data.data[0].principal;
									this.phone = res.data.data[0].phone;
									this.keyNumber = res.data.data[0].user_identity_card_number;
									this.delivery_address = res.data.data[0].delivery_address;
								}
								if (res.data.code == 400) {
									uni.showToast({
										icon: 'none',
										title: '参数有误，请重新填写',
										duration: 2000
									});
								}
							}
						});
					}
				}
			} else {
				// if(this.keyNumber==''){
				// 	uni.showToast({
				// 		icon :'none',
				// 		title: '请输入客户卡编号',
				// 		duration:1000
				// 	})
				// }
			}
		},
		//单选按钮
		radio(key) {
			this.current = key;
		},

		//两个按钮切换
		check(key) {
			this.cut = key;
		},
		//完成审核
		finshed() {
			if (this.role_type_id == 4) {
				//送气工
				uni.request({
					url: apiAddres + testZt,
					method: 'POST',
					header: { 'Content-Type': 'application/json' },
					data: {
						token: this.token,
						loginMark: this.loginMark,
						data: data
					},
					success: res => {
						console.log(res);
					}
				});
				uni.navigateTo({
					url: '../test/test'
				});
			}
			if (this.role_type_id == 6) {
				//送气工页面
				uni.navigateTo({
					url: '../home/index'
				});
			}
			if (this.role_type_id == 5) {
				uni.navigateTo({
					url: '../home/supply'
				});
			}
		},
		
		async finsheds() {
			await uni
				.request({
					url: apiAddres + yanzhengUser,
					method: 'GET',
					header: {},
					data: {
						token: this.token,
						user_identity_card_number: this.keyNumber
					}
				})
				.then(res => {
					console.log(res);
					if (res[1].data.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '验证成功',
							duration: 1000
						});
						this.user_number = res[1].data.data[0].user_number;
						uni.setStorage({
							key: 'isVerification',
							data: 'verification',
							success() {
								console.log('isVerification: verification');
							}
						});
						this.check(1);
					} else {
						uni.showToast({
							icon: 'none',
							title: '验证失败',
							duration: 1000
						});
					}
				});
			console.log(this.user_number);
		},

		//左上角返回图标
		toGoBack() {
			this.$store.state.dispatcher = {};
			this.$store.state.emptyNum = '';
			this.$store.state.fullNum = '';

			if (this.role_type_id == 7) {
				uni.navigateTo({
					url: '../test/test'
				});
			}
			if (this.role_type_id == 6) {
				uni.navigateTo({
					url: '../home/index'
				});
			}
			if (this.role_type_id == 5) {
				uni.navigateTo({
					url: '../home/supply'
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.commond {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	box-sizing: border-box;
	background-color: #f8f8ff;

	.infomation {
		height: 1268rpx;
		width: 100%;
		font-size: 35rpx;
		color: #000000;
		text-indent: 0.6em;
		border: 1px solid #0077aa;
	}

	.addUser {
		// position: relative;
		top: 0;
		left: 0;
		right: 0;
		bottom: 326rpx;
		height: 326rpx;
		width: 100vw;
		// background-color: #005fff;
		background-image: url(../../static/image/backg_top.png);
		align-items: center;
		box-sizing: border-box;
		.addUser-button {
			height: 200rpx;
			display: flex;
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
					font-size: 75rpx;
					color: #fffdef;
					image {
						width: 80rpx;
						height: 80rpx;
						line-height: 80rpx;
					}
				}
			}
			.navs {
				flex: 1;
				width: 100vw;
				text-indent: 4.8em;
				color: #ffffff;
				width: 164rpx;
				height: 56rpx;
				font-size: 38rpx;
				font-family: PingFang SC;
				font-weight: 700;
				line-height: 56rpx;
				color: rgba(255, 255, 255, 1);
				letter-spacing: 6rpx;
				opacity: 1;
			}
		}
		.flex-button {
			width: 100%;
			// position: absolute;
			bottom: -10rpx;
			left: 0;
			right: 0;
			.button-one {
				color: #0045ff;
				padding: 10rpx;
			}
			.button-two {
				margin-left: 24rpx;
				width: 210rpx;
				line-height: 76rpx;
				display: inline-block;
				font-size: 35rpx;
				border-radius: 20rpx 20rpx 0 0;
				background-color: #fff;
				box-sizing: border-box;
				border: 1px solid #fff;
				text-align: center;
				font-family: PingFang SC;
				box-shadow: 0 2rpx 3px #fff;
				box-shadow: 2rpx 4rpx 5rpx #fff;
			}
			.button-two:nth-child(2) {
				margin-left: 5rpx;
			}
		}
	}
	.bottom_information {
		margin-top: -50rpx;
	}
	.rideoWarp {
		display: flex;
		.listCell {
			width: 300rpx;
			height: 80rpx;
			border: solid 1px #000000;
			span {
				display: inline-block;
				width: 30rpx;
				height: 10rpx;
				border: solid 1rpx #000000;
				border-radius: 100rpx;
			}
			p {
				font-size: 24rpx;
			}
		}
	}

	.active {
		background-color: #0069ff;
	}
	.orderInformation {
		margin: 0 24rpx 0 24rpx;
		height: 540rpx;
		box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.1);
		background: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: column;
		border-radius: 0px 0px 16rpx 16rpx;
		.orderInformation-list {
			height: 535rpx;
			width: 100%;
			margin-top: -40rpx;
			// border: 1px solid #000000;
			background-color: #fff;
			border-radius: 0px 0px 16px 16px;
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
		}
		.verify {
			height: 150rpx;
			// border: 1px solid #FF0000;
			margin-top: 10rpx;
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
				margin-top: 20rpx;
			}
			.verify-content {
				display: flex;
				justify-content: center;
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
					// padding-left: 30rpx;
					font-family: PingFang SC;
				}
			}
		}
	}
	.step {
		// height: 1300rpx;
		height: 85vh;
		box-sizing: border-box;
		width: 100%;
		overflow: scroll;
		padding-bottom: 300rpx;
		// border: 1px solid #000000;
		.stepInformation {
			height: 750rpx;
			margin: -65rpx 25rpx 20rpx 24rpx;
			background-color: #fff;
			border-radius: 0 0 16rpx 16rpx;
			.stepone {
				height: 200rpx;
				// border: 1px solid #000000;
				padding-left: 24rpx;
				width: 100%;
				p {
					height: 80rpx;
					width: 200rpx;
					line-height: 80rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(0, 0, 0, 1);
					letter-spacing: 5rpx;
				}
				.left {
					height: 60rpx;
					width: 364rpx;
					float: left;
					position: relative;
					text-indent: 1em;
					span {
						height: 40rpx;
						width: 40rpx;
						display: inline-block;
						position: absolute;
						top: 10rpx;
						right: 4rpx;

						image {
							height: 40rpx;
							width: 40rpx;
							position: absolute;
							top: 5rpx;
							right: 0rpx;
						}
					}
					p {
						height: 60rpx;
						line-height: 60rpx;
						width: 364rpx;
						border: 1px solid rgba(228, 228, 228, 1);
						color: rgba(102, 102, 102, 1);
						position: absolute;
						font-size: 32rpx;
						color: #666;
						font-family: PingFang SC;
						font-weight: 400;
					}
				}
				.right {
					height: 60rpx;
					width: 300rpx;
					float: right;
					position: relative;
					p {
						height: 60rpx;
						width: 200rpx;
						border: 1px solid rgba(228, 228, 228, 1);
						line-height: 60rpx;
						text-indent: 0.4em;
						color: rgba(102, 102, 102, 1);
						position: absolute;
						padding-left: 20rpx;
						font-size: 32rpx;
						color: #666;
						font-family: PingFang SC;
						font-weight: 400;
					}
				}
				textarea {
					height: 180rpx;
					width: 650rpx;
					border: 1px solid rgba(228, 228, 228, 1);
					text-indent: 2em;
				}
			}
		}
		.btn {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 580rpx;
			background-color: #006eff;
			margin: 20px auto;
			border-radius: 16rpx;
			span {
				text-align: center;
				display: inline-block;
				height: 80rpx;
				width: 580rpx;
				line-height: 80rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
			}
		}
	}
	.content {
		width: 100%;
		// height: 1301rpx;
		height: 83vh;
		overflow: scroll;
		box-sizing: border-box;
		padding-bottom: 60rpx;
		// margin-top: -40rpx;

		.infomation_list {
			height: 620rpx;
			padding: 20rpx;
			border-radius: 0px 0px 16px 16px;
			.infomation_lists {
				height: 700rpx;
				padding-top: 5rpx;
				box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.1);
				background: rgba(255, 255, 255, 1);
				border-radius: 16rpx;
				.user_type {
					margin: 40rpx;
					box-sizing: border-box;
					height: 60rpx;
					border-radius: 16rpx;
					position: relative;
					span {
						height: 60rpx;
						line-height: 60rpx;
						width: 140rpx;
						display: inline-block;
						position: absolute;
						font-size: 30rpx;
						// text-align: center;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(0, 0, 0, 1);
					}
					input {
						height: 60rpx;
						width: 470rpx;
						background: rgba(255, 255, 255, 1);
						border: 1px solid rgba(228, 228, 228, 1);
						opacity: 1;
						position: absolute;
						right: 5rpx;
					}
				}
			}
		}
		.btn {
			height: 80rpx;
			width: 580rpx;
			background-color: #006eff;
			margin: 20px auto;
			border-radius: 16rpx;
			margin-top: 100rpx;
			span {
				text-align: center;
				display: inline-block;
				height: 80rpx;
				width: 580rpx;
				line-height: 80rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
			}
		}
	}
	.evan-radio-group {
		display: flex;
		width: 100%;
		.evan-radio {
			margin-left: 40rpx;
		}
		.evan-radio:nth-child(2) {
			margin-left: 60rpx;
		}
	}
}
.eModal {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	span {
		justify-content: center;
		margin: 0 auto;
		margin-top: 20rpx;
		width: 150rpx;
		height: 150rpx;
		display: block;
		image {
			width: 150rpx;
			height: 150rpx;
		}
	}
	p {
		flex: 1;
		width: 100%;
		height: 45rpx;
		font-size: 32rpx;
		align-items: center;
		text-align: center;
		padding-top: 40rpx;
	}
	button {
		width: 400rpx;
		height: 80rpx;
		background: rgba(0, 110, 255, 1);
		border-radius: 16rpx;
		font-size: 32rpx;
		font-weight: bold;
		line-height: 80rpx;
		color: rgba(255, 255, 255, 1);
		letter-spacing: 30rpx;
		margin-top: 43rpx;
		margin-bottom: 43rpx;
	}
}

.blurry {
	filter: blur(20rpx);
}
</style>
