<template>
	<view class="container">
		<view class="content">
			<view class="scanRes">
				<ul class="cardList" v-if="gasList.length > 0">
					<li v-for="(item, index) in gasList" :key="index" :class="{ evenLine: index % 2 == 1 }">
						<span>{{ ++index }}、燃气瓶编号：{{ item }}</span>
						<image @click="deleteGas(index)" src="../../static/image/dele.png" style="width: 20px; height: 20px;"></image>
					</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
import { apiAddres, gasType } from '../../common/common.js';
export default {
	data() {
		return {
			token: '',
			loginMark: '',
			barcode: null,
			//当前扫码得到的燃气瓶编号
			gas_label_number: null,
			gasList: [],
			region_id: '',
			enterprise_number: ''
		};
	},
	onLoad() {
		// #ifdef APP-PLUS
		plus.navigator.setFullscreen(true); //开启全屏
		const currentWebview = this.$mp.page.$getAppWebview(); //获取当前webview
		this.createBarcode(currentWebview); //创建二维码窗口
		this.createNativeBackButton(currentWebview); //创建原生返回按钮
		// #endif

		uni.getStorage({
			key: 'loginData',
			success: res => {
				this.token = res.data.F_token;
				this.loginMark = res.data.F_loginMark;
			}
		});
	},
	//手机端物理返回
	//由于 uni.navigateBack() 同样会触发 onBackPress 函数。因此在 onBackPress 中直接调用 uni.navigateBack() 并始终返回 true 会引发死循环
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		this.toGoBack();
		return true;
	},
	methods: {
		//删除列表选项
		deleteGas(index) {
			this.gasList.splice(index - 1, 1);
			console.log(this.gasList);
		},
		toGoBack() {
			this.$store.state.dispatcher.gcFulls = this.gasList.join(',');
			// this.$store.state.fullNum = this.gasList.length;
			if(this.gasList.length > 0) {
				this.$store.state.fullNum = this.gasList.length;
			}
			console.log('8888', this.$store.state.dispatcher);
			uni.navigateBack({});
		},
		/**
		 * @desc 创建二维码窗口
		 * @param {WebView} currentWebview 当前webview
		 */
		createBarcode(currentWebview) {
			this.barcode = plus.barcode.create('barcode', [plus.barcode.QR, plus.barcode.EAN13], {
				top: '0',
				left: '0',
				width: '100%',
				height: '50%',
				frameColor: '#fff',
				position: 'static',
				scanbarColor: 'rgb(141, 141, 141)'
			});
			this.barcode.onmarked = this.onSuccessScan;
			this.barcode.onerror = this.onErrorScan;
			currentWebview.append(this.barcode);
			this.barcode.start();
		},
		/**
		 * @description  创建原生返回按钮
		 * @param {WebView} currentWebview 当前webview
		 */
		createNativeBackButton(currentWebview) {
			const backView = new plus.nativeObj.View(
				'backView',
				{
					top: '40px',
					left: '0px',
					height: '40px',
					width: '20%'
				},
				[
					{
						tag: 'img',
						id: 'backBar',
						src: 'static/image/LIcon.png',
						position: {
							top: '0px',
							left: '20px',
							width: '40px',
							height: '40px'
						}
					}
				]
			);
			backView.interceptTouchEvent(true);
			backView.addEventListener('touchstart', e => {
				this.barcode.close();
				plus.navigator.setFullscreen(false);
				this.toGoBack();
			});
			currentWebview.append(backView);
		},
		/**
		 * @description 扫码成功回调
		 * @param {Number} type 扫码类型
		 * @param {Object} result 扫码结果
		 */
		onSuccessScan(type, result) {
			switch (type) {
				case plus.barcode.QR: //二维码
					break;

				case plus.barcode.EAN13: //条形码13
					break;

				case plus.barcode.EAN8: //条形码8
					break;
			}
			console.log(result);
			let src = result.split('/');
			this.gas_label_number = src[src.length - 1];

			uni.request({
				url: apiAddres + gasType,
				header: {
					'Content-Type': 'application/json'
				},
				method: 'GET',
				data: {
					token: this.token,
					loginMark: this.loginMark,
					gas_label_number: this.gas_label_number,
					region_id: this.region_id,
					enterprise_number: this.enterprise_number
				},
				success: res => {
					console.log(res);
					if (res.data.code === 200) {
						this.gasList.push(this.gas_label_number);
					}
					uni.showModal({
						title: '提示',
						content: '燃气瓶编号:' + this.gas_label_number,
						showCancel: false,
						success: res => {
							this.barcode.start();
						}
					});
				}
			});
		},
		/**
		 * @description 扫码失败回调
		 */

		onErrorScan(error) {}
	}
};
</script>

<style lang="less" scoped>
page {
	background-color: #fff;
}
.container {
	position: absolute;
	top: 50%;
	left: 0;
	width: 100vw;
	height: 50%;
	background-color: #827972;
	overflow: hidden;
	.content {
		position: absolute;
		width: 90%;
		height: 100%;
		background-color: #fff;
		// border-radius: 20rpx;
		padding: 40rpx;
		.scanRes {
			width: 100%;
			height: 90%;
			// background-color: #f5f7ff;
			background-color: rgb(245, 247, 255);
			overflow: scroll;
			.cardList {
				height: 100%;
				width: 100%%;
				// background: rgba(255, 255, 255, 1);
				box-shadow: 0rpx 5rpx 10rpx rgba(0, 64, 128, 0.04);
				border-radius: 10rpx;
				box-sizing: border-box;

				li {
					display: flex;
					align-items: center;
					justify-content: space-around;
					width: 100%;
					height: 60rpx;
					// background: rgba(245, 247, 255, 1);
					text-indent: 0.5em;

					span {
						width: 510rpx;
						height: 33rpx;
						font-size: 30rpx;
						margin-left: -1%;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 30rpx;
						color: rgba(0, 0, 0, 1);
					}
				}
			}
		}
	}
}
.evenLine {
	background-color: #e8eeff !important;
}
</style>
