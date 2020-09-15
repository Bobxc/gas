<template>
	<view class=" commond">
		<!-- 燃气瓶分配  用户验证 -->
		<view class="addUser">
			<view class="addUser-button">
				<view class="icon" @click="toGoBack">
					<span><image src="../../static/image/LIcon.png" mode=""></image></span>
				</view>
				<view class="navs" v-if="this.cut">燃气瓶分配</view>
				<view class="navs" v-else="this.cut">用户验证</view>
			</view>
			<!-- 两个固定定位 -->
			<view class="flex-button">
				<span :class="['button-two', { 'button-one': key === cut }]" v-for="(val, key) in buttonList" :key="key" @click="check(key)">{{ val.text }}</span>
			</view>
		</view>

		<!--具体数据详情页 第一页面  -->
		<view class="content" v-if="this.cut">
			<view class="orderInformation">
				<view class="orderInformation-list">
					<view class="verify ">
						<view class="verify-title">验证方式</view>
						<view class="verify-content">
							<span @click="card()">
								<checkbox class="check" value="1" name="change" checked="checked" />
								身份证
							</span>
							<span @click="phone()">
								<checkbox value="1" name="change" />
								联系方式
							</span>
						</view>
					</view>
					<ul class="material ">
						<span>证件号码</span>
						<li class="message">
							<input v-model="keyWord" type="text" />
							<span><image src="../../static/image/PositionFocusSaoma.png"></image></span>
						</li>
						<span>客户卡编号</span>
						<li class="message">
							<input v-model="this.keyNumber" type="text" />
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
						<input type="text" />
					</li>
					<li class="user_type">
						<span>用户名称</span>
						<input type="text" />
					</li>
					<li class="user_type">
						<span>证件编号</span>
						<input type="text" />
					</li>
					<li class="user_type">
						<span>联系人</span>
						<input type="text" />
					</li>
					<li class="user_type">
						<span>联系电话</span>
						<input type="text" />
					</li>
					<li class="user_type">
						<span>配送地址</span>
						<input type="text" style="height: 100rpx;" />
					</li>
				</ul>
			</view>
			<view class="btn"><span @click="finshed()">完成审核</span></view>
		</view>
		<!--具体数据详情页 第二页面 -->
		<view class="step">
			<view class="stepInformation">
				<view class="stepone">
					<p style="padding-top: 80rpx;">第一步</p>
					<view class="left">
						<input text="" value="空瓶回收" />
						<span><image src="../../static/image/PositionFocusSaoma.png"></image></span>
					</view>
					<view class="right"><input text="" value="已扫码" /></view>
				</view>
				<view class="stepone">
					<p>第二步</p>
					<view class="left">
						<input text="" value="满瓶分配" />
						<span><image src="../../static/image/PositionFocusSaoma.png"></image></span>
					</view>
					<view class="right"><input text="" value="已分配" /></view>
				</view>
				<view class="stepone">
					<p>备注</p>
					<textarea value="" placeholder="" />
				</view>
			</view>

			<view class="btn"><span>完成审核</span></view>
		</view>
	</view>
</template>

<script>
import { apiAddres, cert } from '../../common/common.js';
import Modal from '../../components/x-modal/x-modal';
export default {
	components: { Modal },
	data() {
		return {
			role_type_id: '',
			show: false,
			keyWord: '',
			keyNumber: '',
			cut: 0,
			flag: true,
			buttonList: [{ className: 'button-one', text: '用户验证' }, { className: 'button-one', text: '气瓶验证' }]
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
		confirm(), (this.show = true);
	},
	methods: {
		// 	//弹框提示
		// 	            cancel(e){
		// 	                console.log(e);
		// 	            },
		// 	            confirm(e){
		// 	                console.log(e);
		// 	            },
		// 	            event(e){
		// 	                console.log(e)
		// 	            },

		//身份证的验证信息
		card() {
			uni.request({
				url: apiAddres + cert,
				method: 'GET',
				header: '',
				data: {
					certificate_id: '330411199501290615',
					user_identity_card_number: '12344566'
				},
				success: res => {
					console.log(res);
				}
			});
		},
		//联系方式的验证信息
		phone() {
			// this.show=true;
			// confirm()
		},
		//两个按钮切换
		check(key) {
			this.cut = key;
		},
		//完成审核
		finshed() {},
		toGoBack() {
			if (this.role_type_id == 4) {
				uni.navigateTo({
					url: '../test/test'
				});
			}
		}
	}
};
</script>

<style lang="less">
.commond {
	width: 100vw;
	height: 100vh;
	overflow: hidden;

	.infomation {
		height: 1268rpx;
		width: 100%;
		font-size: 35rpx;
		color: #000000;
		text-indent: 0.6em;
		border: 1px solid #0077aa;
	}

	.addUser {
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		bottom: 326rpx;
		height: 326rpx;
		width: 100vw;
		background-color: #005fff;
		align-items: center;
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
				text-indent: 4em;
				color: #ffffff;
				width: 164rpx;
				height: 56rpx;
				font-size: 38rpx;
				font-family: PingFang SC;
				font-weight: 700;
				line-height: 56rpx;
				color: rgba(255, 255, 255, 1);
				letter-spacing: 20rpx;
				opacity: 1;
			}
		}
		.flex-button {
			width: 100%;
			position: absolute;
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
				display: inline-block;
				text-align: center;
				font-family: PingFang SC;
				box-shadow: 0 2rpx 3px #fff;
			}
			.button-two:nth-child(2) {
				margin-left: 5rpx;
			}
		}
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
			padding: 40rpx 40rpx 0 40rpx;
			.verify-title {
				width: 131rpx;
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
				justify-content: center;
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
		height: 1300rpx;
		box-sizing: border-box;
		width: 100%;
		overflow: scroll;
		padding-bottom: 300rpx;
		// border: 1px solid #000000;
		.stepInformation {
			height: 750rpx;
			margin: -65rpx 20rpx 20rpx 20rpx;
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
						border: 1px dashed #000000;
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
					input {
						height: 60rpx;
						width: 364rpx;
						border: 1px solid rgba(228, 228, 228, 1);
						color: rgba(102, 102, 102, 1);
					}
				}
				.right {
					height: 60rpx;
					width: 300rpx;
					float: right;
					input {
						height: 60rpx;
						width: 200rpx;
						border: 1px solid rgba(228, 228, 228, 1);
						margin-left: 40rpx;
						text-indent: 1em;
						color: rgba(102, 102, 102, 1);
					}
				}
				textarea {
					height: 180rpx;
					width: 650rpx;
					border: 1px solid rgba(228, 228, 228, 1);
				}
			}
		}
		.btn {
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
		height: 1301rpx;
		overflow: scroll;
		box-sizing: border-box;
		padding-bottom: 300rpx;

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
}
</style>
