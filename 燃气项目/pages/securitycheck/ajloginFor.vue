			<template>
				<!-- 查看车辆装瓶记录 -->
				<!-- 轮播图页面 -->
				<view class="commond">
					<!-- 车辆编号 -->
					<view class="list">
						<span>安检用户：周大侠</span>
						<!-- 统计个数 -->
						<view class="statistics">
							<p>安检评定：无异常 燃气瓶编号：100000101</p>
						</view>
						
						
					</view>
					<button type="default" @click="toHome">关闭</button>
					
					
				</view>
			</template>
			
			<script>
				export default{
					data(){
						return{
							numberList:[]
						}
					},
					methods:{
						toHome(){
							uni.navigateTo({
								url:'../home/index'
							})
						}
					}
				}
			</script>
			
			<style lang="less">
				.commond{
					height: 1624rpx;
					border: 1px solid #333333;
					box-sizing: border-box;
					width: 750rpx;
					padding: 0 40rpx 0 40rpx;
					.list{
						overflow: scroll;
						height: 1148rpx;
						border: 1px solid #FF0000;
						margin-top: 248rpx;
					   span{
						   display: block;
							width: 252rpx;
							height: 45rpx;
							font-size:30rpx;
							font-family:PingFang SC;
							font-weight:bold;
							line-height:45rpx;
							color:rgba(0,0,0,1);
							opacity:1;
							margin: 40rpx 209rpx 32rpx 209rpx;
						}
						.statistics{
							width: 100%;
							height: 80rpx;
							background:rgba(245,247,255,1);
							opacity:1;
							p{
								width: 100%;
								height:40rpx;
								font-size:28rpx;
								font-family:PingFang SC;
								font-weight:400;
								line-height:40rpx;
								color:rgba(102,102,102,1);
								text-align: center;
								padding: 20rpx 160rpx 20rpx 0rpx;
							}
						}
							
					
						
					}
					button{
						width:576rpx;
						height:80rpx;
						line-height: 80rpx;
						background:rgba(0,110,255,1);
						opacity:1;
						border-radius:16rpx;
						font-size:32rpx;
						font-family:PingFang SC;
						font-weight:bold;
						color:rgba(255,255,255,1);
						letter-spacing:15rpx;
						text-align: center;
						 margin-top: -128rpx ;
					}
					
				}
				
			</style>
			