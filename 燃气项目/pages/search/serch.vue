<template>
	<!-- 订单查询搜索页面 -->
	<view class="commond">
		<div class="inputWarp">
			<div class="searchWrop">
				<div class="imgWrop"><image src="../../static/image/SearchLoupe.png"></image></div>
				<input type="text" class="search" placeholder="输入手机号码查询订单" />
			</div>
			<div class="BellNotifications"><image src="../../static/image/BellNotifications.png" alt=""></image></div>
		</div>
		<view class="content">
			<view class="content_s">
				<ul class="cardlist" v-for="(item, index) in cardlists" :key="index">
					<li style="font-size: 28rpx;height: 40rpx; padding-top: 24rpx;">钢瓶规格 :{{ item.specification }}</li>
					<li style="font-size: 28rpx;color: #0069FF;">数量 : {{ item.num }}瓶</li>
					<li>联系人 : {{ item.name }}</li>
					<li>配送电话 : {{ item.phone }}</li>
					<li>配送地址 : {{ item.address }}</li>
					<!-- <button > 配送中...</button> -->
					<span class="status">配送中...</span>
				</ul>
				
				<!-- 空空如也 -->
				<view class="empty" v-if="cardlists.length == 0">
					<view class="emptyContent">
						<view class="emptyImg">
							<image src="../../static/image/clear.png"></image>
						</view>
						<view class="emptyTitle">没有此项记录</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cardlists: [
				{ specification: 'YSP35.5', num: '2', name: '周大侠', phone: '13888888888', address: '浙江省杭州市滨江区建业路54路' },
				{ specification: 'YSP35.9', num: '3', name: '王二麻', phone: '13888888888', address: '浙江省杭州市滨江区建业路54路' },
				{ specification: 'YSP35.9', num: '3', name: '欧阳夏丹', phone: '13888888888', address: '浙江省杭州市滨江区建业路54路' },
				{ specification: 'YSP35.9', num: '3', name: '欧阳夏丹', phone: '13888888888', address: '浙江省杭州市滨江区建业路54路' },
				{ specification: 'YSP35.9', num: '3', name: '欧阳夏丹', phone: '13888888888', address: '浙江省杭州市滨江区建业路54路' },
				{ specification: 'YSP35.9', num: '3', name: '欧阳夏丹', phone: '13888888888', address: '浙江省杭州市滨江区建业路54路' },
				{ specification: 'YSP35.9', num: '3', name: '欧阳夏丹', phone: '13888888888', address: '浙江省杭州市滨江区建业路54路' },
				{ specification: 'YSP35.9', num: '3', name: '欧阳夏丹', phone: '13888888888', address: '浙江省杭州市滨江区建业路54路' },
			]
		};
	},
	methods: {}
};
</script>

<style lang="less">
.commond {
	// height: 1626rpx;
	height: 100vh;
	overflow: hidden;
	width: 750rpx;
	box-sizing: border-box;
	// background-color: #f8f8ff;
	.inputWarp {
		display: flex;
		padding: 0 24rpx;
		background-color: #006aff;
		height: 205rpx;
		.searchWrop {
			height: 60rpx;
			line-height: 60rpx;
			margin-top: 105rpx;
			.icon {
				width: 96rpx;
				height: 60rpx;
				image {
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
				margin-top: 206rpx;
				height: 48rpx;
				width: 48rpx;
				padding: 0;
			}
		}
	}
	.content {
		width: 100%;
		height: 1861rpx;
		padding: 0rpx 24rpx 32rpx 24rpx;
		box-sizing: border-box;
		background-color: #f8f8ff;
		.content_s {
			height: 80vh;
			overflow: scroll;
			padding:  30rpx 20rpx 30rpx 20rpx;
			background-color: #fff;
			.cardlist {
				height: 280rpx;
				background: rgba(245, 247, 255, 1);
				opacity: 1;
				border-radius: 10rpx;
				margin-bottom: 24rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				position: relative;
				li {
					width: 100%;
					height: 30rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 30rpx;
					color: rgba(0, 0, 0, 1);
					// letter-spacing:30px;
					opacity: 1;
					padding-left: 24rpx;
				}
				.status {
					width: 175rpx;
					height: 60rpx;
					// background:rgba(255,255,255,1);
					// border:1px solid rgba(0,69,255,1);
					opacity: 1;
					border-radius: 10rpx;
					position: absolute;
					top: 24rpx;
					right: 24rpx;
					font-size: 28rpx;
					text-align: center;
					font-family: PingFang SC;
					// font-weight:400;
					line-height: 60rpx;
					color: rgba(0, 69, 255, 1);
				}
			}
			.empty {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.emptyContent {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.emptyImg {
						width: 281.28rpx;
						height: 281.28rpx;
						margin-top: -200rpx;
						margin-bottom: 40rpx;
						image {
							width: 281.28rpx;
							height: 281.28rpx;
						}
					}
					.emptyTitle {
						font-size: 32rpx;
						color: rgba(102, 102, 102, 1);
						font-weight: 400;
					}
				}
			}
		}
	}
}
</style>
