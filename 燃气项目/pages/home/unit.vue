<template>
	<!-- 新增用户 -->
	<!-- 默认个体工商户 -->
	<view class="commond">
		<!-- 头部页面 返回和标题 -->
		<view class="addUser">
			<view class="addUser-button">
				<view class="icon" @click="toBack">
					<span><image src="../../static/image/LIcon.png"></image></span>
				</view>
				<view class="navs">新增用户</view>
			</view>
		</view>

		<!--具体数据详情页  -->
		<view class="bottom_information">
			<view class="content">
				<view class="orderInformation">
					<view class="titl">客户类型</view>
					<ul class="orderInformation-list">
						<evan-radio-group v-model="color" @change="radioChange">
							<evan-radio v-model="iconValue" :label="index" v-for="(item, index) in titleList" :key="item.value">
								<text class="evan-radio-show__label">{{ item.list }}</text>
								<template slot="icon">
									<uni-icons type="circle-filled" size="16" color="#108ee9" v-if="current === index"></uni-icons>
									<uni-icons type="circle" size="16" color="#108ee9" v-else></uni-icons>
								</template>
							</evan-radio>
						</evan-radio-group>
					</ul>
				</view>

				<view class="info">
					<ul class="info_list">
						<li>证件名称</li>
						<input type="text" v-model="certificate_name" value="" placeholder="身份证" style="text-indent: 20rpx;" />
						<li>证件照片</li>
						<li class="cardds">
							<view class="card_left" @click="choseIDcardFront">
								<image :src="IDcardFrontUrl" mode=""></image>
								<p>重新拍摄</p>
								<span><image src="../../static/image/Delete.png" mode=""></image></span>
							</view>
							<view class="card_right" @click="choseIDcardReverse">
								<image :src="IDcardReverseUrl" mode=""></image>
								<p>重新拍摄</p>
								<span><image src="../../static/image/Delete.png"></image></span>
							</view>
						</li>
						<li>证件姓名</li>
						<input type="text" v-model="user_name" value="" placeholder="" style="text-indent: 20rpx;" />
						<li>证件号码</li>
						<input type="text" v-model="certificate_id" value="" placeholder="" style="text-indent: 20rpx;" />
						<li>证件地址</li>
						<input type="text" v-model="certificate_address" value="" placeholder="" style="text-indent: 20rpx;" />
					</ul>
				</view>

				<view class="messsage">
					<view class="message_list">
						<li>上传附件</li>
						<li class="card_img">
							<view class="left">
								<image :src="safeBookUrl" mode="" @click="choseSafeBook"></image>
								<p>用户安全协议书</p>
								<span><image src="../../static/image/Disabled.png" mode="" @click="disabled('safe')"></image></span>
							</view>
							<view class="right">
								<image :src="securityUrl" mode="" @click="chooseSecurity"></image>
								<p>押金单</p>
								<span><image src="../../static/image/Disabled.png" mode="" @click="disabled('security')"></image></span>
							</view>
						</li>
						<li>联系人</li>
						<input v-model="principal" type="text" style="text-indent: 20rpx;" />
						<li>所在地区</li>
						<li class="address">
							<input type="text" placeholder="点击选择省份" v-model="delivery_region_name" :disabled="true" style="text-indent: 20rpx;" />
							<span>
								<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
									<image src="../../static/image/Arrow.png" mode=""></image>
								</pick-regions>
							</span>
						</li>
						<li>详细地址</li>
						<input v-model="delivery_address" type="text" style="text-indent: 20rpx;" />
						<li>联系电话</li>
						<input v-model="phone" type="number" style="text-indent: 20rpx;" />
						<li>客户卡编号</li>
						<input v-model="user_identity_card_number" type="number" style="text-indent: 20rpx;" />
					</view>
				</view>
				<button @click="addUser"><span>添加</span></button>
			</view>
		</view>
	</view>
</template>

<script>
import pickRegions from '../../components/pick-regions/pick-regions.vue';
import { apiAddres, addUser, uploadFile } from '../../common/common.js';
export default {
	comments: {
		pickRegions
	},
	data() {
		return {
			color: 'red',
			iconValue: 0,
			token: '',
			current: 0,
			value: '',
			region: ['浙江省', '温州市', '鹿城区'],
			defaultRegion: ['浙江省', '温州市', '鹿城区'],
			defaultRegionCode: '330300',
			titleList: [
				{
					list: '个体用户',
					pathRouder: 'Industry',
					value: '0'
				},
				{
					list: '工业用户',
					pathRouder: '',
					value: '1'
				},
				{
					list: '商业用户',
					pathRouder: '',
					value: '2'
				},
				{
					list: '餐饮用户',
					pathRouder: '',
					value: '3'
				},
				{
					list: '食堂用户',
					pathRouder: '',
					value: '4'
				},
				{
					list: '其他用户',
					pathRouder: '',
					value: '5'
				}
			],
			role_type_id: '',
			certificate_id: '',

			certificate_name: '营业证书',

			certificate_address: '测试地址',

			user_name: '测试用户',

			IDcardFront: '',
			
			IDcardRever: '',
				
			user_identity_card_number: '',

			// user_type_id: '',

			delivery_region_id: '',

			delivery_region_name: '',

			delivery_address: '测试地址',

			principal: '联系人',

			phone: '',
			//用户安全协议书照片(服务器路径)
			gas_supply_agreement_attachment: '',
			//押金单照片(服务器路径)
			deposit_image_url: '',
			login_username: '测试供应站',
			contract_appendix_url: '/img/test/',
			//身份证照（正面）(本地路径)
			IDcardFrontUrl: require('../../static/image/cardf.png'),
			//身份证照（反面）(本地路径)
			IDcardReverseUrl: require('../../static/image/card.png'),
			//用户安全协议书照片(本地路径)
			safeBookUrl: require('../../static/image/fujian.png'),
			//押金单照片(本地路径)
			securityUrl: require('../../static/image/yajin.png')
		};
	},
	onLoad() {
		uni.getStorage({
			key: 'loginData',
			success: data => {
				this.token = data.data.F_token;
				this.role_type_id = data.data.role_type_id;
			}
		});
	},
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		this.toBack();
		return true;
	},
	methods: {
		//单选
		radioChange(evt) {
			this.current = evt;
		},
		//选择所在地区
		handleGetRegion(region) {
			console.log(region)
			this.region = region;
			this.delivery_region_name = this.region[0].name + this.region[1].name + this.region[2].name;
			this.delivery_region_id = this.region[2].code;
			console.log(this.delivery_region_id);
		},
		//添加证件照片（正面）
		choseIDcardFront() {
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				success: res => {
					this.IDcardFrontUrl = res.tempFilePaths[0];
					console.log(this.IDcardFrontUrl);
					if(res.tempFilePaths.length>0) {
						let filePath = res.tempFilePaths[0]
						uni.uploadFile({
							url: apiAddres + uploadFile,
							filePath: filePath,
							name: 'file',
							formData: {},
							success: (res) => {
								console.log(res)
								res.data = JSON.parse(res.data)
								console.log(res.data.info)
								if(res.data.code == 200) {
									this.IDcardFront = 'http://gasapi.tsingd.cn' + res.data.info;
								}
							}
						})
					}
				}
			});
		},
		//添加证件照片（反面）
		choseIDcardReverse() {
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				success: res => {
					this.IDcardReverseUrl = res.tempFilePaths[0];
					if(res.tempFilePaths.length>0) {
						let filePath = res.tempFilePaths[0]
						uni.uploadFile({
							url: apiAddres + uploadFile,
							filePath: filePath,
							name: 'file',
							formData: {},
							success: (res) => {
								console.log(res)
								res.data = JSON.parse(res.data)
								console.log(res.data.info)
								if(res.data.code == 200) {
									this.IDcardRever = 'http://gasapi.tsingd.cn' + res.data.info;
								
								}
							}
						})
					}
				}
			});
		},
		//添加用户安全协议书
		choseSafeBook() {
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				success: res => {
					console.log(res)
					this.safeBookUrl = res.tempFilePaths[0];
					this.gas_supply_agreement_attachment = res.tempFilePaths[0];
					if(res.tempFilePaths.length>0) {
						let filePath = res.tempFilePaths[0];
						uni.uploadFile({
							url: apiAddres + uploadFile,
							filePath: filePath,
							name: 'file',
							formData:{},
							success: (res) => {
								console.log(res)
								res.data = JSON.parse(res.data)
								console.log(res.data.info)
								if(res.data.code == 200) {
									this.gas_supply_agreement_attachment = 'http://gasapi.tsingd.cn' + res.data.info
								}
							}
						})
					}
				}
			});
		},
		//添加押金单
		chooseSecurity() {
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				success: res => {
					this.securityUrl = res.tempFilePaths[0];
					this.deposit_image_url = res.tempFilePaths[0];
					if(res.tempFilePaths.length>0) {
						let filePath = res.tempFilePaths[0];
						uni.uploadFile({
							url: apiAddres + uploadFile,
							filePath: filePath,
							name: 'file',
							formData: {},
							success: (res) => {
								console.log(res)
								res.data = JSON.parse(res.data)
								console.log(res.data.info)
								if(res.data.code == 200) {
									this.deposit_image_url = 'http://gasapi.tsingd.cn' + res.data.info;
								}
							}
						})
					}
				}
			});
		},
		//清除用户安全协议书和押金单照片
		disabled(type) {
			if (type == 'safe') {
				this.safeBookUrl = '../../static/image/fujian.png';
				this.gas_supply_agreement_attachment = '';
			} else {
				this.securityUrl = '../../static/image/yajin.png';
				this.deposit_image_url = '';
			}
		},
		toBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		addUser() {
			if (this.IDcardFrontUrl === require('../../static/image/cardf.png')) {
				uni.showToast({
					icon: 'none',
					title: '请选择证件照片正面附件',
					duration: 1000
				});
			} else if (this.IDcardReverseUrl === require('../../static/image/card.png')) {
				uni.showToast({
					icon: 'none',
					title: '请选择证件照片背面附件',
					duration: 1000
				});
			} else if (this.user_name === '') {
				uni.showToast({
					icon: 'none',
					title: '请输入证件姓名',
					duration: 1000
				});
			} else if (this.certificate_id === '') {
				uni.showToast({
					icon: 'none',
					title: '请输入证件号码',
					duration: 1000
				});
			} else if (this.certificate_address === '') {
				uni.showToast({
					icon: 'none',
					title: '请输入证件地址',
					duration: 1000
				});
			} else if (this.safeBookUrl === '../../static/image/fujian.png' || this.safeBookUrl === require('../../static/image/fujian.png')) {
				uni.showToast({
					icon: 'none',
					title: '请选择安全协议书附件',
					duration: 1000
				});
			} else if (this.securityUrl === '../../static/image/yajin.png' || this.securityUrl === require('../../static/image/yajin.png')) {
				uni.showToast({
					icon: 'none',
					title: '请选择押金单附件',
					duration: 1000
				});
			} else if (this.principal === '') {
				uni.showToast({
					icon: 'none',
					title: '请输入联系人',
					duration: 1000
				});
			} else if (this.delivery_region_id === '') {
				uni.showToast({
					icon: 'none',
					title: '请选择所在地区',
					duration: 1000
				});
			} else if (this.delivery_address === '') {
				uni.showToast({
					icon: 'none',
					title: '请输入详细地址',
					duration: 1000
				});
			} else if (this.phone === '') {
				uni.showToast({
					icon: 'none',
					title: '请输入联系电话',
					duration: 1000
				});
			} else if (this.user_identity_card_number === '') {
				uni.showToast({
					icon: 'none',
					title: '请输入客户卡编号',
					duration: 1000
				});
			} else {
				const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
				if(!regIdCard.test(this.certificate_id)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的身份证号',
						duration: 1000
					})
					return
				} 
				const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				if (!regMobile.test(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确手机号格式',
						duration: 1000
					});
					return
				}
				let param = {
					// certificate_id: '410825199412303043',
					certificate_id: this.certificate_id,

					certificate_name: this.certificate_name,

					certificate_address: this.certificate_address,

					user_name: this.user_name,

					certificate_appendix_url: this.IDcardFront + ',' + this.IDcardRever,

					// user_identity_card_number: 30100001050,
					user_identity_card_number: Number(this.user_identity_card_number),

					user_type_id: Number(this.current),

					delivery_region_id: Number(this.delivery_region_id),
					// delivery_region_id: 302003,

					delivery_address: this.delivery_address,

					principal: this.principal,

					phone: Number(this.phone),

					gas_supply_agreement_attachment: this.gas_supply_agreement_attachment,

					deposit_image_url: this.deposit_image_url,

					login_username: this.login_username,

					contract_appendix_url: this.contract_appendix_url,

					token: this.token
				};
				console.log(param)
				uni.request({
					url: apiAddres + addUser,
					data: param,
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					success: res => {
						console.log(res);
						if (res.data.code === 200) {
							uni.showToast({
								icon: 'none',
								title: '新增成功',
								duration: 1000
							});
							setTimeout(()=>{
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
							},1000)
						}
						if (res.data.code == 400) {
							if(res.data.info == 'CertificateExist') {
								uni.showToast({
									icon: 'none',
									title: '证件号码已存在',
									duration: 1000
								})
							}
							if(res.data.info == 'UserIdentityCardNumberUsed') {
								uni.showToast({
									icon: 'none',
									title: '客户卡编号已注册',
									duration: 1000
								})
							}
							if(res.data.info == 'UserIdentityCardNumberNonExist') {
								uni.showToast({
									icon: 'none',
									title: '客户卡编号不已存在',
									duration: 1000
								})
							}
						}
					}
				});
				/* if (this.role_type_id == 7) {
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
				} */
			}
		}
	}
};
</script>

<style lang="less">
* {
	margin: 0;
	padding: 0;
	list-style: none;
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

.commond {
	height: 100vh;
	width: 750rpx;
	overflow: hidden;
	box-sizing: border-box;
	background-color: #f8f8ff;
}

.infomation {
	height: 50rpx;
	width: 100%;
	font-size: 35rpx;
	color: #000000;
	text-indent: 0.6em;
}

.addUser {
	height: 326rpx;
	width: 100vw;
	background-image: url(../../static/image/backg_top.png);
	align-items: center;

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
				height: 80rpx;
				line-height: 80rpx;
				font-size: 75rpx;
				color: #fffdef;

				image {
					height: 80rpx;
					width: 80rpx;
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
}

.bottom_information {
	width: 750rpx;
	box-sizing: border-box;
	overflow: scroll;
	margin-top: -160rpx;
	padding: 20rpx;
	.content {
		height: 85vh;
		overflow: scroll;
		opacity: 1;
		border-radius: 15rpx;
		background-color: #f8f8ff;
	}
}

.orderInformation {
	// margin: 0 24rpx 0 24rpx;
	// height: 220rpx;
	height: 300rpx;
	box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.1);
	background: rgba(255, 255, 255, 1);
	border-radius: 15rpx;
	// margin-top: -140rpx;
	margin-top: 0rpx;
	margin-bottom: 40rpx;

	// flex-wrap: wrap;
	.titl {
		padding: 24rpx 0 0 24rpx;
	}

	.orderInformation-list {
		background-color: #fff;
		// border:  1px solid #000000;
		border-radius: 10rpx;
		box-sizing: border-box;
		padding: 30rpx;
		width: 100%;
		height: 200rpx;
		display: flex;
		// justify-content: center;
		border-radius: 0 0 15rpx 15rpx;
		flex-wrap: wrap;

		uni-radio-group {
			display: flex;
			width: 100%;
			height: 140rpx;
			flex-wrap: wrap;

			uni-label {
				width: 200rpx;
				height: 60rpx;
				display: flex;

				.text {
					font-size: 30rpx;
					height: 44rpx;
					line-height: 58rpx;
				}
			}
		}
	}
}

.info {
	box-sizing: border-box;
	height: 1133rpx;
	box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.1);
	border-radius: 16rpx;
	background-color: #fff;
	padding-top: 16rpx;
	// padding: 24rpx;

	.info_list {
		// height: 1080rpx;
		height: 1133rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		background: rgba(255, 255, 255, 1);
		// box-shadow: 0px 5px 10px rgba(0, 64, 128, 0.04);

		li {
			margin: 40rpx 0 20rpx 40rpx;
		}

		input {
			height: 60rpx;
			width: 620rpx;
			margin-left: 40rpx;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(228, 228, 228, 1);
		}

		.cardds {
			height: 198rpx;
			width: 620rpx;
			position: relative;

			.card_left {
				height: 198rpx;
				width: 300rpx;
				position: relative;

				image {
					width: 300rpx;
					height: 198rpx;
				}

				p {
					position: absolute;
					left: 0;
					bottom: 0;
					height: 60rpx;
					width: 300rpx;
					background: rgba(0, 0, 0, 1);
					opacity: 0.5;
					border-radius: 0rpx 0rpx 12rpx 12rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 60rpx;
					color: rgba(255, 255, 255, 1);
					letter-spacing: 8rpx;
					text-align: center;
				}

				span {
					height: 60rpx;
					width: 60rpx;

					image {
						height: 58rpx;
						width: 60rpx;
						position: absolute;
						bottom: 0;
						right: 0;
						border-left: 1px dashed #000;
					}
				}
			}

			.card_right {
				position: absolute;
				height: 198rpx;
				width: 300rpx;
				// border:  1px solid #0069FF;
				top: 0;
				right: 0rpx;

				image {
					width: 300rpx;
					height: 198rpx;
				}

				p {
					position: absolute;
					left: 0;
					bottom: 0;
					height: 60rpx;
					width: 300rpx;
					background: rgba(0, 0, 0, 1);
					opacity: 0.5;
					border-radius: 0rpx 0rpx 12rpx 12rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 60rpx;
					color: rgba(255, 255, 255, 1);
					letter-spacing: 8rpx;
					text-align: center;
				}

				span {
					height: 60rpx;
					width: 60rpx;

					image {
						height: 58rpx;
						width: 60rpx;
						position: absolute;
						bottom: 0;
						right: 0;
						border-left: 1px dashed #000;
					}
				}
			}
		}
	}
}

.messsage {
	// height: 1310rpx;
	height: 1500rpx;
	margin-top: 100rpx;
	padding-top: 16rpx;
	margin-bottom: 80rpx;
	background-color: #fff;
	border-radius: 16rpx;
	.message_list {
		// height: 1310rpx;
		height: 1500rpx;
		// border: 1px solid #000000;
		border-radius: 16rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 5px 10px rgba(0, 64, 128, 0.04);

		.card_img {
			height: 300rpx;
			width: 620rpx;
			position: relative;

			.left {
				// position: relative;
				height: 300rpx;
				width: 300rpx;
				border: 1px solid rgba(228, 228, 228, 1);
				position: absolute;
				display: flex;
				flex-direction: column;

				image {
					margin: 45rpx 72rpx 32rpx 70rpx;
					height: 155.77rpx;
					width: 155.77rpx;
				}

				p {
					width: 230rpx;
					height: 45rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 45rpx;
					color: rgba(0, 0, 0, 1);
					opacity: 0.6;
					margin: 0rpx 32rpx 20rpx 32rpx;
				}

				span {
					height: 60rpx;
					width: 60rpx;

					image {
						height: 60rpx;
						width: 60rpx;
						position: absolute;
						right: -74rpx;
						top: -46rpx;
					}
				}
			}

			.right {
				height: 300rpx;
				width: 300rpx;
				// border: 1px dashed #000;
				border: 1px solid rgba(228, 228, 228, 1);
				position: absolute;
				right: 0;
				top: 0;

				image {
					margin: 45rpx 72rpx 0rpx 70rpx;
					height: 155.77rpx;
					width: 155.77rpx;
				}

				p {
					width: 230rpx;
					height: 45rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 45rpx;
					color: rgba(0, 0, 0, 1);
					opacity: 0.6;
					margin: 0rpx 101rpx 0 101rpx;
				}

				span {
					height: 60rpx;
					width: 60rpx;

					image {
						height: 60rpx;
						width: 60rpx;
						position: absolute;
						right: -74rpx;
						top: -46rpx;
					}
				}
			}
		}

		li {
			list-style: none;
			margin: 40rpx 0 40rpx 40rpx;
		}

		input {
			height: 60rpx;
			width: 620rpx;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(228, 228, 228, 1);
			margin-left: 40rpx;
		}

		.address {
			height: 60rpx;
			width: 620rpx;
			position: relative;

			input {
				height: 60rpx;
				width: 620rpx;
				margin-left: 0rpx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(228, 228, 228, 1);
			}

			span {
				height: 60rpx;
				width: 60rpx;

				image {
					position: absolute;
					right: 0;
					top: 0;
					height: 60rpx;
					width: 60rpx;
				}
			}
		}
	}
}

button {
	width: 576rpx;
	height: 80rpx;
	line-height: 80rpx;
	background: rgba(0, 110, 255, 1);
	border-radius: 16rpx;
	margin: 24rpx auto;

	span {
		width: 65rpx;
		height: 45rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 45rpx;
		color: rgba(255, 255, 255, 1);
		letter-spacing: 30rpx;
		text-align: center;
		opacity: 1;
	}
}
.evan-radio-group {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	.evan-radio {
		width: 32%;
	}
}
</style>
