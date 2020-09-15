<template>
	<!-- 微信订单 具体的配送情况页面 -->
	<view class="commond"> 
	  <view class="top_information">
		  <view class="addUser-button">
		  		<view class="icon" @click="toHome"><span><image src="../../static/image/LIcon.png" mode=""></image></span></view>
		  		<view class="navs">微信订单</view>
		  </view>
		 <view class="flex-button">
		  				<span :class="['button-two', {'button-one' : key === cut }]" 
		  				v-for="(val,key) in buttonList" 
		  				:key="key"
		  				@click="check(key,val.path)"
		  				>{{val.text}}{{val.num}}</span>
		  </view>
	  </view>
	  <view class="bottom_information">  
	      <view class="content"> 
	  	     <view class="cardlist" v-for="(item,index) in cardlists" :key="index">
					<li style="font-size: 28rpx;height: 40rpx; padding-top: 24rpx;">钢瓶规格 :{{item.specification}}	</li>
					<li style="font-size: 28rpx;color: #0069FF;">数量 : {{item.num}}瓶</li>
					<li>联系人 : {{item.name}}</li>
					<li>配送电话 : {{item.phone}}</li>
					<li>配送地址 : {{item.address}}</li>
			       <button > 配送中...</button>
	  	     </view>
	      </view>
	  </view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				cut:1,
				buttonList:[
					{className: 'button-one',text:'可接订单',num:"10",path:'orderone'},
					{className: 'button-one',text:'已接订单',num:"12",path:'ordertwo'}
				],
				cardlists:[
							{specification:'YSP35.5',num:"2",name:'周大侠',phone:'13888888888',address:"浙江省杭州市滨江区建业路54路"},
					        {specification:'YSP35.9',num:"3",name:'王二麻',phone:'13888888888',address:"浙江省杭州市滨江区建业路54路"},
					        {specification:'YSP35.9',num:"3",name:'欧阳夏丹',phone:'13888888888',address:"浙江省杭州市滨江区建业路54路"},
					      
					]
			}
		},
		methods:{
			check(key,path){
				this.cut = key;
				uni.navigateTo({
					url:path,
		       })
			},
			toHome(){
				uni.navigateTo({
					url:'../home/index'
				})
			}
		
		}
	}
</script>
<style lang="less">
	*{
		list-style: none;
	}
	.commond{
		height: 2200rpx;
		width: 750rpx;
		// border: 1px solid #FF0000;
		box-sizing: border-box;
		}
		.top_information{
			// position: relative;
			top: 0;
			left: 0;
			right: 0;
			bottom:326rpx;
			background-color: #005FFF;
			height: 400rpx;
			width: 750rpx;
			box-sizing: border-box;
			// border: 1px solid #0069FF;
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
				// position: absolute;
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
			height: 1740rpx;
			width: 750rpx;
			box-sizing: border-box;
            // border: 1px solid #4CD964;
			overflow: scroll;
			padding:0rpx 24rpx 24rpx 24rpx;
			margin-top: -80rpx;		
				.content{
				// border: 1px solid #EE9900;
				height:1800rpx;
				box-shadow:0rpx 5rpx 10rpx rgba(0,64,128,0.04);
				opacity:1;
				border-radius:0rpx 0rpx 16rpx 16rpx;
				overflow: scroll;
				background:rgba(255,255,255,1);
				padding: 20rpx;
				
			}
			.cardlist{
				width: 654rpx;
				height: 280rpx;
				background:rgba(245,247,255,1);
				opacity:1;
				border-radius:10rpx;
				margin-bottom: 24rpx;
				display: flex;
				justify-content:space-between;
				flex-wrap: wrap;
				position: relative;
				li{
					width:474rpx;
					height:30rpx;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					line-height:30rpx;
					color:rgba(0,0,0,1);
					// letter-spacing:30px;
					opacity:1;
					padding-left: 24rpx;
				}
				button{
						width:175rpx;
						height:60rpx;
						background:rgba(255,255,255,1);
						border:1px solid rgba(0,69,255,1);
						opacity:1;
						border-radius:10rpx;
						position: absolute;
						top: 24rpx;
						right: 24rpx;
						font-size:28rpx;
						text-align: center;						font-family:PingFang SC;
						// font-weight:400;
						line-height:60rpx;
						color:rgba(0,69,255,1);
				}
				
		}
		
	}
</style>