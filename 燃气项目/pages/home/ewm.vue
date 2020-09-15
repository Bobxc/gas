<template>
    <view class="commond">
		<view class="titleTop">
			<span class="checkUser">安检用户:&nbsp;&nbsp;周大侠</span>
			<view class="titleTwo">
		       <span style="margin-left: 20px;">安检评定：无异常 </span>
		       <span>燃气瓶编号：100000101 </span>
			</view/>
		</view>
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                        <swiper-item>
                            <view class="swiper-item uni-bg-red"><image src="../../static/image/addcreatenewuser.png"></image></view>
                        </swiper-item>
                        <swiper-item>
                            <view class="swiper-item uni-bg-red"><image src="../../static/image/anjian.png"></image></view>
                        </swiper-item>
                        <swiper-item>
                            <view class="swiper-item uni-bg-red"><image src="../../static/image/log.png" mode=""></image></view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
        <view class="swiper-list">   
		<button type="default" @click="close">关闭</button>
 </view>
 </view>
</template>
<script>
	export default{
		   data() {
		        return {
		            background: ['color1', 'color2', 'color3'],
		            indicatorDots: true,
		            autoplay: true,
		            interval: 2000,
		            duration: 500,
					token:'',
					role_type_id:''
		        }
		    },
			onLoad() {
				uni.getStorage({
					key: 'loginData',
					success: (data)=> {
					    // console.log(data,'成功接收数据');
						console.log(data.data.F_token,"11111111111")
					    this.token=data.data.F_token;
					    this.role_type_id = data.data.role_type_id
					}
				})
			},
		 methods: {
				close(){
					if(this.role_type_id==4){
						uni.navigateTo({
							url:'../securitycheck/ajloginSix',
							
						})
					}if(this.role_type_id==5){
						uni.navigateTo({
							url:'../securitycheck/ajloginSix'
						})
					}
					if(this.role_type_id==6){
						uni.navigateTo({
							url:'../securitycheck/ajloginSix'
						})
					}
				}
		    }
}
	
</script>
<style lang="less" scoped>
	.commond{
		width: 100vw;
		height: 100vh;
		padding: 0 30rpx 0 30rpx;
		box-sizing: border-box;
	}
	.titleTop{
		display: flex;
		height: 350rpx;
		box-sizing: border-box;
		justify-content: space-around;
		flex-direction: column;
		.checkUser{
			display: inline-block;
			height: 60rpx;
			line-height: 60rpx;
			// width: 100vw;
			text-align: center;
			font-size: 34rpx;
			margin-bottom: -350rpx;
			box-sizing: border-box;
			font-weight: 700;
		}
		.titleTwo{
			box-sizing: border-box;
			height: 60rpx;
			line-height: 60rpx;
			margin-bottom: -150rpx;
			display: flex;
			justify-content: space-around;
			background-color: #F5F7FF;
			font-size: 28rpx;
			align-items: center;
			color: #999;
			font-weight: 700;
			span{
				height: 60rpx;
				width: 100vw;
				font-size: 24rpx;
				display: inline-block;
			}
			
		}

	}
	.swiper{
		height: 1000rpx;
		// margin-top: 300rpx;
	}
	/deep/.uni-swiper-slides{
		// border: 1px solid #FF0000;
		box-sizing: border-box;
		padding: 24rpx;
		height: 950rpx;
		// margin-top: 20rpx;
		image{
			// padding: 40rpx;
		    width: 100vw;
		}
		uni-swiper-dots{
			// border: 1px solid #000000;
		}
		
	}
	/deep/ .uni-bg-red{
			// border: 1px solid #000000;
			height: 800rpx;
			uni-image{
			height: 800rpx;
			width: 600rpx;
			// border: 1px solid #0069FF;
			margin: 60rpx 40rpx 0 40rpx;
			}
		}
		button{
			background-color: #006EFF;
			color: #FFFDEF;
			line-height: 90rpx;
			text-align: center;
		}
</style>