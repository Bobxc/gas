<template>
	<!-- 微信订单页面 什么也没有 -->
	<view class="commond"> 
	  <view class="top_information">
		  <view class="addUser-button">
		  		<view class="icon" @click="toRegist"><span ><image src="../../static/image/LIcon.png" mode=""></image></span></view>
		  		<view class="navs">微信订单</view>
		  </view>
		 <view class="flex-button">
		  				<span :class="['button-two', {'button-one' : key === cut }]" 
		  				v-for="(val,key) in buttonList" 
		  				:key="key"
		  				@click="check(key)"
		  				>{{val.text}}</span>
		  </view>
	  </view>
	  <view class="bottom_information">  
	      <view class="content"> 
	  	     <span><image src="../../static/image/clear.png"></image> </span>
			 <p>空空如也</p>
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
					{className: 'button-one',text:'可接订单'},
					{className: 'button-one',text:'已接订单'}
				]
			}
		},
		methods:{
			check(key){
				this.cut = key;
			}
		
		}
	}
</script>
<style lang="less">
	.commond{
		height: 1628rpx;
		width: 750rpx;
		box-sizing: border-box;
		}
		.top_information{
			top: 0;
			left: 0;
			right: 0;
			bottom:326rpx;
			background-color: #005FFF;
			height: 400rpx;
			width: 750rpx;
			box-sizing: border-box;
			.addUser-button{
				height:  240rpx;
				display: flex;
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
					box-shadow: 0 2rpx 3rpx #fff;
				
				}
				.button-two:nth-child(2){
					margin-left: 5rpx;
				}
			}
		}
		.bottom_information{
			height: 1228rpx;
			width: 750rpx;
			box-sizing: border-box;
          
			overflow: scroll;
			padding:0rpx 24rpx 24rpx 24rpx;
			margin-top: -80rpx;		
				.content{
				height:1268rpx;
				box-shadow:0rpx 5rpx 10rpx rgba(0,64,128,0.04);
				opacity:1;
				border-radius:0rpx 0rpx 16rpx 16rpx;
				background:rgba(255,255,255,1);
				padding: 20rpx;
				span{
					height: 246.62rpx;
					width: 281.28rpx;
					display: block;
					// border: 1px solid #DD524D;
					margin: 276rpx auto;
					image{
						height: 246.62rpx;
						width: 281.28rpx;
					}
				}
				p{
					width:131rpx;
					height:45rpx;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					line-height:45rpx;
					color:rgba(102,102,102,1);
					 margin: -239rpx auto;
					opacity:1;
					text-align: center;
				}
				
			}
			
		
	}
</style>