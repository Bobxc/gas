<template>
	<view>
		<!-- 日常安检页面 -->
		<!-- <view class="commond"> -->
		<view :class="['commond', { blurry: this.blurry }]">
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
					<view class="manner" :style="{ height: record_path ? '1100rpx' : '1002rpx' }">
						<view class="orderInformation" :style="{ height: record_path ? '1050rpx' : '932rpx' }">
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
										<input type="text" v-model="user_identity_card_number" @blur="verificateUser" />
										<span><image src="../../static/image/PositionFocusSaoma.png"></image></span>
									</li>
								</ul>
								<ul class="cmeara">
									<li class="photo" @click="takePhoto()">
										<image src="../../static/image/Camera.png" mode=""></image>
										<p>现场取证</p>
									</li>
									<li v-for="(val, key) in imglist" :key="key" @click="deletePic(key)"><image :src="val" mode=""></image></li>
								</ul>
								<!-- <button type="default" @click="recording">{{ voiceTis }}</button> -->
								<!-- 录音UI效果 -->
								<view class="record" :class="recording ? '' : 'hidden'">
									<view class="ing" :class="willStop ? 'hidden' : ''"><view class="icon luyin2"></view></view>
									<view class="cancel" :class="willStop ? '' : 'hidden'"><view class="icon chehui"></view></view>
									<view class="tis" :class="willStop ? 'change' : ''">{{ recordTis }}</view>
								</view>
								<view
									class="voice-mode"
									:class="[isVoice ? '' : 'hidden', recording ? 'recording' : '']"
									@touchstart="voiceBegin"
									@touchmove.stop.prevent="voiceIng"
									@touchend="voiceEnd"
									@touchcancel="voiceCancel"
								>
									{{ voiceTis }}
								</view>
								<button type="default" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">
									{{ voiceTis }}
								</button>
								<!-- <span>最多拍摄三张</span> -->
								<view class="paishe">
									<image src="../../static/image/Warning.png"></image>
									<span>最多上传3张</span>
								</view>
							</view>
							<view v-if="this.record_path" style="width: 100%; display: flex; justify-content: center; position: absolute; bottom: 30rpx;" @tap="playVoice">
								<image style="width: 650rpx; height: 100rpx;" src="../../static/image/record.jpg"></image>
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

			<!-- 身份证号/联系方式验证用户 -->
			<e-modal class="userListModal" :visible.sync="verificateUserShow" width="90%" height="100%">
				<view class="userList" style="height: 80vh; padding: 20rpx;">
					<view class="userTitle"><span>身份识别</span></view>
					<view class="userContent">
						<ul style="position: relative;" v-for="(item, index) in userInfoList" :key="index">
							<evan-radio-group v-model="checkedUserInfo" @change="chooseUserInfo">
								<evan-radio :label="index">
									<li>
										<span class="spanLeft">用户类型：</span>
										<span class="spanRight">{{ item.usertype }}</span>
									</li>
									<li>
										<span class="spanLeft">用户名称：</span>
										<span class="spanRight">{{ item.user_name }}</span>
									</li>
									<li>
										<span class="spanLeft">证件编号：</span>
										<span class="spanRight">{{ item.certificate_id }}</span>
									</li>
									<li>
										<span class="spanLeft">联系人：</span>
										<span class="spanRight">{{ item.principal }}</span>
									</li>
									<li>
										<span class="spanLeft">联系电话：</span>
										<span class="spanRight">{{ item.phone }}</span>
									</li>
									<li>
										<span class="spanLeft">配送地址：</span>
										<span class="spanRight">{{ item.delivery_address }}</span>
									</li>
									<template slot="icon">
										<uni-icons
											type="circle-filled"
											size="16"
											color="#108ee9"
											v-if="checkedUserInfo == index"
											style="position: absolute; top: 40rpx; right: 20rpx;"
										></uni-icons>
										<uni-icons type="circle" size="16" color="#108ee9" v-else style="position: absolute; top: 40rpx; right: 20rpx;"></uni-icons>
									</template>
								</evan-radio>
							</evan-radio-group>
						</ul>
					</view>
					<button class="userBtn" type="default" @click="userBtn">确定</button>
				</view>
			</e-modal>
			<LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>
		</view>
		<!-- 未验证弹出层 -->
		<e-modal class="eModal" :visible.sync="visible" style="width: 750rpx; height: 80%;">
			<span><image style="width: 150rpx; height: 150rpx;" src="../../static/image/ZU539.png"></image></span>
			<p>还未验证用户信息</p>
			<button @click="closeEmodeal">关闭</button>
		</e-modal>
	</view>
</template>

<script>
//获取手机端音频
import { apiAddres, GetUserBynum, AppService, securityCheck, yanzhengUser, uploadFile } from '../../common/common.js';
import LotusLoading from '../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue';
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
export default {
	components: { LotusLoading },
	data() {
		return {
			iconValue: 0,
			iconValueTwo: 0,
			// num: 0,
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
			certificate_id: '',
			user_identity_card_number: '',
			phone: '',
			imagerolePath: '',
			imglist: [],
			text: 'uni-app',
			// voicePath: '',

			//录音相关参数
			// #ifndef H5
			//H5不能录音
			RECORDER: uni.getRecorderManager(),
			// #endif
			isVoice: false,
			voiceTis: '按住说话',
			recordTis: '手指上滑 取消发送',
			recording: false,
			willStop: false,
			initPoint: { identifier: 0, Y: 0 },
			recordTimer: null,
			recordLength: 0,

			//播放语音相关参数
			AUDIO: uni.createInnerAudioContext(),
			playMsgid: null,
			VoiceTimer: null,

			n: 0,
			employee_number: 'sx201800002',
			photo_path: null,
			photo_path_net: [],
			//本地录音路径
			record_path: null,
			//服务端录音路径
			record_path_net: null,
			security_check_state: 1,
			description: '',
			check_type: 1,
			//未验证弹出层
			visible: false,
			//选择用户遮罩层开关
			verificateUserShow: false,
			//用户列表
			userInfoList: [],
			checkedUserInfo: 0,
			lotusLoadingData: {
				isShow: false //设置显示加载中组件true显示false隐藏
			},
			isVerification: '',
			blurry: false
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

		// this.getMsgList();
		//语音自然播放结束
		// this.AUDIO.onEnded((res)=>{
		// 	this.playMsgid=null;
		// });
		// #ifndef H5
		//录音开始事件
		this.RECORDER.onStart(e => {
			this.recordBegin(e);
		});
		//录音结束事件
		this.RECORDER.onStop(e => {
			this.recordEnd(e);
		});
		// #endif
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
		// 录音开始
		voiceBegin(e) {
			if (e.touches.length > 1) {
				return;
			}
			this.initPoint.Y = e.touches[0].clientY;
			this.initPoint.identifier = e.touches[0].identifier;
			this.RECORDER.start({ format: 'mp3' }); //录音开始,
		},
		//录音开始UI效果
		recordBegin(e) {
			console.log(132);
			this.recording = true;
			this.voiceTis = '松开保存';
			this.recordLength = 0;
			this.recordTimer = setInterval(() => {
				this.recordLength++;
			}, 1000);
		},
		// 录音被打断
		voiceCancel() {
			this.recording = false;
			this.voiceTis = '按住说话';
			this.recordTis = '手指上滑 取消录音';
			this.willStop = true; //不发送录音
			this.RECORDER.stop(); //录音结束
		},
		// 录音中(判断是否触发上滑取消发送)
		voiceIng(e) {
			if (!this.recording) {
				return;
			}
			let touche = e.touches[0];
			//上滑一个导航栏的高度触发上滑取消发送
			if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
				this.willStop = true;
				this.recordTis = '松开手指 取消录音';
			} else {
				this.willStop = false;
				this.recordTis = '手指上滑 取消录音';
			}
		},
		// 结束录音
		voiceEnd(e) {
			if (!this.recording) {
				return;
			}
			this.recording = false;
			this.voiceTis = '按住说话';
			this.recordTis = '手指上滑 取消录音';
			this.RECORDER.stop(); //录音结束
		},
		//录音结束(回调文件)
		recordEnd(e) {
			clearInterval(this.recordTimer);
			if (!this.willStop) {
				console.log('e: ' + JSON.stringify(e));
				this.record_path = e.tempFilePath;
				if (this.record_path != null) {
					let filePath = e.tempFilePath;
					uni.uploadFile({
						url: apiAddres + uploadFile,
						filePath: filePath,
						formData: {},
						success: res => {
							console.log(res);
							res.data = JSON.parse(res.data);
							if (res.data.code == 200) {
								this.record_path_net = 'http://gasapi.tsingd.cn' + res.data.info;
								console.log(this.record_path_net);
							}
						}
					});
				}
			} else {
				console.log('取消发送录音');
			}
			this.willStop = false;
		},
		//播放录音
		playVoice() {
			if (this.record_path) {
				console.log(this.record_path);
				if (this.n % 2 == 0) {
					this.AUDIO.src = this.record_path;
					this.$nextTick(function() {
						this.AUDIO.play();
					});
					this.n++;
					console.log('播放录音');
				}
				if (this.n % 2 == 1) {
					this.$nextTick(function() {
						this.AUDIO.stop();
					});
					this.n++;
				}
			}
		},

		//关闭遮罩层
		closeEmodeal() {
			this.visible = false;
			this.blurry = false;
		},
		//验证方式切换 正常/异常
		selected(item, index) {
			console.log(item, index);
			this.security_check_state = item.value;
			if (index == 0) {
				this.$store.state.checkAbnormal = '';
			}
			if (index == 1) {
				this.toAjlonginFive();
			}
		},
		// 选择用户
		chooseUserInfo(index) {
			this.checkedUserInfo = index;
			this.user_identity_card_number = this.userInfoList[index].user_identity_card_number;
		},
		//选择弹出层确认按钮
		userBtn() {
			this.verificateUserShow = false;
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
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: '验证成功',
							duration: 1000
						});
						uni.setStorage({
							key: 'isVerification',
							data: 'verification',
							success() {
								console.log('isVerification: verification');
							}
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
		},
		//验证方式切换  身份证/联系方式验证
		radioChange(evt) {
			this.current = evt;
			this.phone = '';
			this.certificate_id = '';
			this.user_identity_card_number = '';
			console.log(this.current);
		},
		//跳转到燃气瓶安检异常情况汇总
		toAjlonginFive() {
			uni.navigateTo({
				url: './ajloginFive'
			});
		},
		//删除图片
		async deletePic(index) {
			let _this = this;
			console.log(index);
			uni.showModal({
				title: '提示',
				content: '确定删除该图片?',
				success(res) {
					console.log(res);
					if (res.confirm) {
						for (let i = 0; i < _this.imglist.length; i++) {
							if (i == index) {
								_this.imglist.splice(index, 1);
							}
						}
						for (let i = 0; i < _this.photo_path_net.length; i++) {
							if (i == index) {
								_this.photo_path_net.splice(index, 1);
							}
						}
						console.log(_this.imglist);
						console.log(_this.photo_path_net);
					} else if (res.cancel) {
						console.log(res.cancel);
					}
				}
			});
		},
		// 图片 拍照
		takePhoto() {
			let _this = this;
			console.log('cc', _this.imglist);
			if (_this.imglist.length >= 3) {
				uni.showModal({
					title: '提示',
					content: '最多3张照片',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
						} else if (res.cancel) {
						}
					}
				});
				return;
			}
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: res => {
					console.log(res);
					console.log(Object.prototype.toString.call(res.tempFilePaths));
					_this.imglist = _this.imglist.concat(res.tempFilePaths);
					console.log('123', _this.imglist);
					_this.photo_path = _this.imglist.join(',');
					let filePath = res.tempFilePaths[0];
					uni.uploadFile({
						url: apiAddres + uploadFile,
						filePath: filePath,
						name: 'file',
						formData: {},
						success: res => {
							console.log(res);
							res.data = JSON.parse(res.data);
							if (res.data.code == 200) {
								_this.photo_path_net.push('http://gasapi.tsingd.cn' + res.data.info);
								console.log(_this.photo_path_net.join(','));
							}
						}
					});
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		//通过证件号码/联系方式获取用户信息
		async getUserInfo() {
			if (this.current === 0) {
				if (this.certificate_id != '') {
					console.log(1111);
					const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
					if (!regIdCard.test(this.certificate_id)) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确的身份证号',
							duration: 1000
						});
					} else {
						this.lotusLoadingData.isShow = true;
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
								this.lotusLoadingData.isShow = false;
								if (res[1].data.code == 200) {
									if (res[1].data.data.length > 0) {
										this.userInfoList = res[1].data.data;
										this.checkedUserInfo = 0;
										this.user_identity_card_number = res[1].data.data[0].user_identity_card_number;
										this.verificateUserShow = true;
									} else {
										this.verificateUserShow = false;
										this.user_identity_card_number = '';
										uni.showToast({
											icon: 'none',
											title: '无此用户',
											duration: 1000
										});
									}
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
				} else return;
			}
			if (this.current === 1) {
				if (this.phone != '') {
					const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
					if (!regMobile.test(this.phone)) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确手机号格式',
							duration: 1000
						});
					} else {
						this.lotusLoadingData.isShow = true;
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
								this.lotusLoadingData.isShow = false;
								if (res[1].data.code == 200) {
									if (res[1].data.data.length > 0) {
										this.userInfoList = res[1].data.data;
										this.checkedUserInfo = 0;
										this.user_identity_card_number = res[1].data.data[0].user_identity_card_number;
										this.verificateUserShow = true;
									} else {
										this.verificateUserShow = false;
										this.user_identity_card_number = '';
										uni.showToast({
											icon: 'none',
											title: '无此用户',
											duration: 1000
										});
									}
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
				} else return;
			}
			console.log('user_identity_card_number', this.user_identity_card_number);
		},
		//通过输入客户卡编号验证用户
		verificateUser() {
			if (this.user_identity_card_number != '') {
				this.lotusLoadingData.isShow = true;
				uni.request({
					url: apiAddres + yanzhengUser,
					header: {},
					method: 'GET',
					data: {
						token: this.token,
						user_identity_card_number: this.user_identity_card_number
					},
					success: res => {
						console.log(res);
						if (res.data.code == 200) {
							if (res.data.data.length > 0) {
								this.lotusLoadingData.isShow = false;
								// this.userInfoList = res.data.data;
								// this.checkedUserInfo = 0;
								// if (this.current == 0) {
								// 	this.certificate_id = this.userInfoList[0].certificate_id;
								// }
								// if (this.current == 1) {
								// 	this.phone = this.userInfoList[0].phone;
								// }
								if(this.current == 0) {
									this.certificate_id = res.data.data[0].certificate_id;
								}
								if(this.current == 1) {
									this.phone = res.data.data[0].phone;
								}
								uni.setStorage({
									key: 'isVerification',
									data: 'verification',
									success() {
										console.log('isVerification: verification');
									}
								});
								uni.showToast({
									icon: 'none',
									title: '验证成功',
									duration: 1500
								})
								// this.verificateUserShow = true;
							} else {
								this.lotusLoadingData.isShow = false;
								this.certificate_id = '';
								this.phone = '';
								uni.showToast({
									icon: 'none',
									title: '无此用户',
									duration: 1000
								});
							}
						} else {
							this.verificateUserShow = false;
							this.certificate_id = '';
							this.phone = '';
							uni.showToast({
								icon: 'none',
								title: '无此用户',
								duration: 1000
							});
						}
					}
				});
			} else return;
		},
		//安检提交请求
		security() {
			//安检记录提交校验
			const value = uni.getStorageSync(
				'isVerification'
			);
			this.isVerification = value;
			if (this.isVerification != 'verification') {
				this.visible = true;
				this.blurry = true;
				return;
			} else if (this.imglist == '' || this.photo_path == []) {
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
					photo_path: this.photo_path_net.join(','),
					record_path: this.record_path_net,
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
				uni.removeStorage({
					key: 'isVerification',
					success: res => {
						console.log(res);
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
			uni.removeStorage({
				key: 'isVerification',
				success: res => {
					console.log(res);
				}
			});
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/css/style.scss';
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
		// height: 1100rpx;
		width: 100%;
		box-sizing: border-box;
		.orderInformation {
			height: 932rpx;
			// height: 1050rpx;
			box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.1);
			background: rgba(255, 255, 255, 1);
			display: flex;
			flex-direction: column;
			border-radius: 16rpx;
			position: relative;
			.paishe {
				width: 220rpx;
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
					margin: 328rpx 164rpx 56rpx 215rpx;
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
		display: flex;
		// margin-top: 42rpx;
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
// .userList {
// 	background-color: rgb(245, 247, 255);
// 	border-radius: 20rpx;
// 	height: 100%;
// 	overflow: hidden;
// 	.userTitle {
// 		width: 100%;
// 		height: 100rpx;
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		font-weight: 1000;
// 	}
// 	.userContent {
// 		height: calc(100vh - 550rpx);
// 		// overflow: scroll;
// 		overflow: auto;

// 		ul {
// 			border-top: 2rpx solid rgb(228, 228, 228);
// 			padding-bottom: 30rpx;
// 			li {
// 				width: 100%;
// 				height: 90rpx;
// 				display: flex;
// 				// align-items: center;
// 				font-size: 32rpx;
// 				.spanLeft {
// 					width: 260rpx;
// 				}
// 				.spanRight {
// 					width: 100%;
// 				}
// 			}
// 		}
// 	}
// 	.userBtn {
// 		width: 500rpx;
// 		color: #fff;
// 		background-color: rgb(0, 110, 255);
// 		margin: 20rpx auto;
// 	}
// }

.userList {
	background-color: rgb(245, 247, 255);
	border-radius: 20rpx;
	height: 100%;
	overflow: hidden;
	.userTitle {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 1000;
	}
	.userContent {
		height: calc(100vh - 550rpx);
		// overflow: scroll;
		overflow: auto;

		ul {
			border-top: 2rpx solid rgb(228, 228, 228);
			padding-top: 36rpx;
			padding-bottom: 30rpx;
			li {
				width: 100%;
				height: 90rpx;
				display: flex;
				// align-items: center;
				font-size: 32rpx;
				.spanLeft {
					width: 260rpx;
				}
				.spanRight {
					width: 100%;
				}
			}
		}
	}
	.userBtn {
		width: 500rpx;
		color: #fff;
		background-color: rgb(0, 110, 255);
		margin: 20rpx auto;
	}
}
</style>
