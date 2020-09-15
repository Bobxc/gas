<template>
	<!-- 个人中心页面  修改密码页面-->
	<view class="commend">
		<view class="addUser">
						 <ul class="information">
						 				<li style="width: 80rpx;"><span @click="toBack"><image src="../../static/image/LIcon.png"></image></span></li>
						 				<li style="padding: 0 280rpx 0 180rpx;width: 164rpx;">个人中心</li>
						 				<!-- <li style="width: 80rpx;"><span @click="toLogin"><image src="../../static/image/Lcon.png"></image></span></li> -->
						 			</ul>
						
				<view class="change">
					<p class="top_password">原密码</p>
					<input type="password" value="" v-model="oldpassword" placeholder="请输入原密码" />
				
					<p>新密码</p>
					<input type="password" value="" v-model="newpassword" placeholder="请输入新密码" />
					
					<p>确认密码</p>
					<input type="password" value="" v-model="password" placeholder="请再次输入新密码" />
				</view>
		</view>
		<view class="addUser_bottom">
				<button type="default" @click="toLogin">确认修改</button>
		</view>
	
	</view>
</template>

<script>
	import{apiAddres,personal}from '../../common/common.js'
	export default{
		data(){
			return{
				oldpassword:'',
				newpassword:'',
				password:'',
				token:''
			}
		},
		onLoad(){
			uni.getStorage({
			    key: 'loginData',
			    success: (data)=> {
			        // console.log(data,'成功接收数据');
					console.log(data.data.F_token,"11111111111")
				    this.token=data.data.F_token;
			    }
			});
		},
		onBackPress(options) {
			if(options.from === 'navigateBack') {
				return false
			}
			this.toBack()
			return true
		},
		methods:{
			toBack(){
				uni.navigateBack({})
			},
			toLogin(){
				if(this.newpassword==''||this.password==''||this.oldpassword==''){
					uni.showToast({
						icon :'none',
					    title: '您输入的密码为空',
					    duration:500
					});
				}else{
					if(this.newpassword==this.password){
						if(this.oldpassword==this.newpassword){
							uni.showToast({
								icon :'none',
							    title: '您的新密码和旧密码相同，请重新输入',
							    duration:500
							});
							
						}else{
							uni.request({
								url:apiAddres+personal,
								header: {
								      'Content-Type': 'application/x-www-form-urlencoded'  
								},
								method:'post',//post请求方法
								data:{
								oldpassword:this.oldpassword,
								newpassword:this.newpassword,
								token:this.token,
							
								},
								success:(res)=> {
									// console.log(res+"2222")
									if(res.data.code==200){
										uni.showToast({
											icon :'success',
										    title: '密码修改成功',
										    duration:1000
										});
									}
									uni.navigateTo({
										url:'../login/login'
									})
								}
								
							})
						}
						
					}
					else{
						uni.showToast({
							icon :'none',
						    title: '您输入的新密码和确认密码不一致',
						    duration:1000
						});
					 this.newpassword='',
					 this.password=''
					}
				}

			},
		}
	}
</script>

<style lang="less">
	.commend{
		// height:1628rpx ;
		height: 100vh;
		width: 100%;
		overflow: hidden;
		// border: 1px solid #FF0000;
		box-sizing: border-box;
		background-color: #f8f8ff;
		.addUser_bottom{
			box-sizing: border-box;
			button{
				box-sizing: border-box;
				height: 80rpx;
				width: 576rpx;
				margin-top: 65vh;
				// margin: 1154rpx auto;
				background:rgba(0,110,255,1);
				border-radius:16rpx;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				line-height:80rpx;
				color:rgba(255,255,255,1);
			}
		}
	}
	.addUser{
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		bottom:326rpx;
		height: 326rpx;
		width: 100vw;
		background-image: url(../../static/image/backg_top.png);
		align-items: center;
		.information{
			padding: 24rpx;
			height: 111rpx;
			width: 100%;
			box-sizing: border-box;
			padding-top: 87rpx;
			display: flex;
			justify-content: space-between;
			li{
				height:80rpx ;
				color:rgba(255,255,255,1);
				font-size: 40rpx;
				text-align: center;
				line-height: 80rpx;
				span{
					position: relative;
					display: block;
		            height: 80rpx;
				    width: 80rpx;
					image{
						height: 80rpx;
						width: 80rpx;
						right: 0;
						top: 0;
						position: absolute;
					}
				}
			}
		
		}
	
		.change{
			height: 561rpx;
			width: 702rpx;
			margin: 120rpx auto;
			background:rgba(255,255,255,1);
			box-shadow:0rpx 5rpx 10rpx rgba(0,64,128,0.04);
			border-radius:16rpx;
			.top_password{
				padding-top: 40rpx;			
				}
			
			p{
				height: 45rpx;
				width: 150rpx;
				margin: 40rpx 0 24rpx 24rpx;
				color: #000000;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				line-height:45rpx;
				color:rgba(0,0,0,1);
			}
			input{
				height: 60rpx;
				width: 622rpx;
				background:rgba(255,255,255,1);
				border:1px solid rgba(228,228,228,1);
				margin:0 24rpx 0 24rpx ;
				font-size: 24rpx;
				text-indent: 1em;
				color:rgba(153,153,153,1);
				font-family:PingFang SC;
			}
		}
	
	}
	
</style>
