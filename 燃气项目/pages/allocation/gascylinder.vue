<template>
	<!-- 燃气瓶分配   气瓶分配 -->
	<view class=" commond">
	<!-- 头部页面 返回和标题 -->
			 <view class="addUser">
				 <view class="addUser-button">
					<view class="icon" @click="toHome"><span><image src="../../static/image/LIcon.png" mode=""></image></span></view>
					<view class="navs">燃气瓶分配</view>
				 </view>
				 
			   <!-- 两个固定定位 -->
			     <view class="flex-button">
			 				<span :class="['button-two', {'button-one' : key === cut }]" 
			 				v-for="(val,key) in buttonList" 
			 				:key="key"
			 				@click="check(key)"
			 				>{{val.text}}</span>
			     </view>
		    </view> 
	
<!--具体数据详情页  -->

            <view class="step"> 
				<view class="stepInformation">
					<view class="stepone">
						<p style="padding-top: 80rpx;">第一步</p>
						<view class="left"><input text="" value="空瓶回收" /><span> <image src="../../static/image/PositionFocusSaoma.png"></image></span></view>
						<view class="right"><input text="" value="已扫码"/></view>
					</view>
					<view class="stepone">
						<p>第二步</p>
						<view class="left"><input text="" value="满瓶分配" /><span> <image src="../../static/image/PositionFocusSaoma.png"></image></span></view>
						<view class="right"><input text="" value="已分配" /></view>
					</view>
					<view class="stepone">
						<p>备注</p>
				        <textarea value="" placeholder="" />
					</view>
				</view>
			
				<view class="btn">
					<span>完成审核</span>
				</view>
		
		</view>
			
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cut:0,
				buttonList:[
					{className: 'button-one',text:'用户验证'},
					{className: 'button-one',text:'气瓶验证'}
				]
				
			}
		},
		methods:{
			//切换button
			check(key){
				this.cut = key;
			},
			toOrederTwo(){
				uni.navigateTo({
					url:'ordertwo'
				})
			}
		},
		toHome(){
			uni.navigateTo({
				url:'../home/index'
			})
		}
	}
</script>

<style lang="less">
	.commond{
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	
	.addUser{
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		bottom: 326rpx;
		height: 326rpx;
		width: 100%;
		background-color: #005FFF;
		align-items: center;
		.addUser-button{
			display: flex;
			height: 208rpx;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80rpx;
				width: 80rpx;
				background-color: #064ED1;
				border-radius: 30rpx;
				margin-left: 24rpx;
				box-sizing: border-box;
				line-height: 30rpx;
			span{
				font-size: 75rpx;
				color: #FFFDEF;
				image{
					height: 80rpx;
					line-height: 80rpx;
					width: 80rpx;
				}
			}
			}
			.navs{
				flex: 1;
				width: 100vw;
				text-indent: 4em;
				color: #FFFFFF;
				width:164rpx;
				height:56rpx;
				font-size:38rpx;
				font-family:PingFang SC;
				font-weight:700;
				line-height:56rpx;
				color:rgba(255,255,255,1);
				letter-spacing:20rpx;
				opacity:1;
			}
		}
		.flex-button{
		    width:100%;
			position: absolute;
			bottom: -10rpx;
		    left: 0;
			right: 0;
			.button-one{
				color:#0045FF;
				padding:10rpx ;
			}
			.button-two{
				margin-left: 24rpx;
				width: 210rpx;
				line-height: 76rpx;
				display: inline-block;
				font-size: 35rpx;
				border-radius: 20rpx  20rpx 0 0;
				background-color: #fff;
				box-sizing: border-box;
				border:1px solid #fff;
				display: inline-block;
				text-align: center;
				font-family:PingFang SC;
				box-shadow: 0 2rpx 3px #fff;
			
			}
			.button-two:nth-child(2){
				margin-left: 5rpx;
			}
		}
		
	}
	
	
	.step{
		height: 1300rpx;
		box-sizing: border-box;
		width: 100%;
		overflow: scroll;
		padding-bottom: 300rpx;

		.stepInformation{
			height: 750rpx;
		    margin: -65rpx 20rpx 20rpx 20rpx;
			background-color: #FFF;
			border-radius: 0 0 16rpx 16rpx;
			.stepone{
				height: 200rpx;
				// border: 1px solid #000000;
				padding-left: 24rpx;
				width: 100%;
				p{
					height:80rpx;
					width: 200rpx;
					line-height: 80rpx;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(0,0,0,1);
					letter-spacing:5rpx;
				}
				.left{
					height: 60rpx;
					width: 364rpx;
					float: left;
					position: relative;
					text-indent: 1em;
					span{
						height: 40rpx;
						width: 40rpx;
						border: 1px dashed #000000;
						display: inline-block;
						position: absolute;
						top: 10rpx;
						right: 4rpx;
						
						image{
							height: 40rpx;
							width: 40rpx;
							position: absolute;
							top: 5rpx;
							right: 0rpx;
						}
					}
					input{
						height: 60rpx;
						width: 364rpx;
					    border:1px solid rgba(228,228,228,1);
	                    color:rgba(102,102,102,1);
					}
				}
				.right{
					height: 60rpx;
					width: 300rpx;
					float: right;
					input{
						height: 60rpx;
						width: 200rpx;
						border:1px solid rgba(228,228,228,1);
						margin-left: 40rpx;
						text-indent: 1em;
						color:rgba(102,102,102,1);

					}
				}
			textarea{
				height:180rpx ;
				width: 650rpx;
				border:1px solid rgba(228,228,228,1);
			}
			}
		}
	
	.btn{
		width: 580rpx;
		background-color: #006EFF;
		margin: 20px auto;
		border-radius: 16rpx;
		span{
			text-align: center;
			display: inline-block;
			height: 80rpx;
			width: 580rpx;
			line-height: 80rpx;
			font-size:32rpx;
			font-family:PingFang SC;
			color:rgba(255,255,255,1);
			opacity:1;
		}
	}
}
}
</style>

