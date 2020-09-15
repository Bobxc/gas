<template>
	<!-- 新增用户 -->
	<!-- 企业用户 -->
	<view class=" commond">
			<!-- 头部页面 返回和标题 -->
			 <view class="addUser">
				 <view class="addUser-button">
					<view class="icon" @click="toGoBack"><span><image src="../../static/image/LIcon.png"></image></span></view>
					<view class="navs">新增用户</view>
				 </view>
				 
			 </view>
	
<!--具体数据详情页  -->
		 <view class="orderInformation">
			  <view class="titl">客户类型</view>
				<ul class='orderInformation-list'>
				<li v-for="(val,key) in titleList" :key="key" @click="toAddUser(key,val.pathRouder)">
					<span></span>
					 <p><checkbox class="check"  value="1" name='change' checkt=''/>{{val.list}}</p>
				</li>
			</ul>
		 </view>
		 
		 <view class="info">
		 	<ul class="info_list">
				<li>证件名称</li>
				<input type="text" v-model="one" value=""placeholder="身份证" />
				<li>证件照片</li>
				<li class="cardds">
					<view class="card_left">
						<image v-model="imagez" src="../../static/image/cardf.png" mode=""></image>
						
					</view>
					<view class="card_right">
						<image v-model="imagef" src="../../static/image/card.png" mode="" ></image>
					
					</view>
				</li>
				<li>证件姓名</li>
				<input type="text" v-model="two" value=""placeholder="" />
				<li>证件号码</li>
				<input type="text" v-model="three" value=""placeholder="" />
				<li>证件地址</li>
				<input type="text" v-model="four" value=""placeholder="" />
			</ul>
		 </view>
		 
		 <view class="messsage">
		 	<view class="message_list">
		 		<li>上传附件</li>
		 		<li class="card_img">
					<view class="left">
						<image src="../../static/image/fujian.png" mode=""></image>
						<p>用户安全协议书</p>
						<span><image v-model="deal" src="../../static/image/Disabled.png" mode=""></image></span>
					</view>
					<view class="right">
						<image src="../../static/image/yajin.png" mode=""></image>
						<p>押金单</p>
						<span><image v-model="cash" src="../../static/image/Disabled.png" mode=""></image></span>
					</view>
				</li>
		 		<li>联系人</li>
				<input type="text" v-model="fif">
		 		<li>所在地区</li>
				<li class='address'> 
				  <input type="text" v-model="six" placeholder="点击选择省市区">
				  <span @click="city" > <image src="../../static/image/Arrow.png" ></image></span>
				</li>
		 		<li>详细地址</li>
				<input type="text" v-model="seven" >
		 		<li>联系电话</li>
				<input type="text" v-model="eight">
				<li>客户卡编号</li>
				<input type="text" v-model="nine">
		 	</view>
		 </view>
	     <button @click="add"><span>添加</span></button>
		
	</view>
</template>

<script>
	import{apiAddres,addUser} from '../../common/common.js'
	export default{
		   // components: { addressd },
	
		data(){
			return{
				titleList:[
						{list:'个体用户',pathRouder:''},
						{list:'工业用户',pathRouder:''},
						{list:'商业用户',pathRouder:''},
						{list:'餐饮用户',pathRouder:''},
						{list:'食堂用户',pathRouder:''},
						{list:'其他用户',pathRouder:''},
				],
				role_type_id:'',
				checkt:'',
				one:'',  //证件名称
				two:'',   //证件姓名
				three:'',  //证件号码
				four:'',   //证件店址 
				fif:'',    //联系人
				six:'',    //所在地区
				seven:'',  //详细地址
				eight:'',  //联系电话
				nine:'',   //客户卡编号
				imagez:'', //证件照片
				imagef:'', 
				deal:''  ,//协议
				cash:''   //押金
			}
		},
		onLoad() {
			uni.getStorage({
				key: "loginData",
				success:(res)=>{
				this.role_type_id = res.data.role_type_id
				}
			})
		},
		methods:{
		 //返回页面  根据role_type_id不同 返回不同页面
			 toGoBack(){
				 if(this.role_type_id==4){  //储配站
					  uni.navigateTo({
						url:'../test/test'
					  })
				 }if(this.role_type_id==6){  //送气工页面
					  uni.navigateTo({
						url:'../home/index'
					  })
				 }if(this.role_type_id==5){
					 uni.navigateTo({
					 	url:'supply'
					 })
				 }
			 },
			toAddUser(key,path){
				console.log(key)
				if(key==0){
					this.checkt=='checked';
				}
			},
			//提交
			add(){
				if(this.role_type_id==4){  //储配站
					  uni.navigateTo({
						url:'../test/test'
					  })
				}if(this.role_type_id==6){  //送气工页面
					  uni.navigateTo({
						url:'../home/index'
					  })
				}if(this.role_type_id==5){
					uni.request({
							url:apiAddres+addUser,
							method:'POST',
							header:{'Content-Type':'application/json'},
							data:{
								queryJson:JSON.stringify({
									certificate_id:'',
									certificate_address:this.four,
									user_name:this.two,
									certificate_appendix_url:this.imagez,
									user_identity_card_number:this.nine,
									user_type_id:'',
									delivery_region_id:'302003',
									delivery_address:this.seven,
									principal:this.fif,
									phone:this.eight,
									gas_supply_agreement_attachment:this.deal,
									deposit_image_url:this.cash,
									login_username:''
								})
							},
							success: (res) => {
								console.log(res,'111')
								uni.showToast({
										icon :'success',
									    title: '添加成功',
									    duration:500
								})
							},
							fail: (err) => {
								console.log(err,'222')
							}
										})
					  uni.navigateTo({     //供气站页面
						url:'../home/supply'
					  })
				}
				
	    	},
			//调用城市
			city(){
				
			}
			
	  }
	}
</script>

<style lang="less">
	*{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.infomation{
						height: 50rpx;
						width: 100%;
						font-size: 35rpx;
						color: #000000;
						text-indent: 0.6em;
						
					}
	
	.addUser{
		height: 326rpx;
		width: 100vw;
		background-color: #005FFF;
		align-items: center;
		.addUser-button{
			display: flex;
			height: 200rpx;
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
				height: 80rpx;
				line-height: 80rpx;
				font-size: 75rpx;
				color: #FFFDEF;
				image{
					height: 80rpx;
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
		
	}
	.orderInformation{
		margin: 0 24rpx 0 24rpx;
		height: 220rpx;
		box-shadow:0rpx 5rpx 10rpx rgba(0,64,128,0.04);
		background:rgba(255,255,255,1);
		border-radius: 15rpx;
		margin-top: -140rpx;
		.titl{
			padding: 24rpx 0 0 24rpx;
		}
		.orderInformation-list{
		    background-color: #fff;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 30rpx;
			display: flex;
			justify-content: center;
		    flex-wrap: wrap;
			border-radius: 0 0 15rpx 15rpx;
			li{
				height: 40rpx;
				width: 200rpx;
				padding-top: 15rpx;			
				p{
					font-size: 30rpx;
					color: #000000;
					flex: 1;
					
					
				}
			}
			
		}
	
	}
	.info{
		box-sizing: border-box;
		height: 1133rpx;
		padding: 24rpx;
		.info_list{
			height: 1080rpx;
			box-sizing: border-box;
			border-radius: 16rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 5px 10px rgba(0,64,128,0.04);
			li{
				margin:  40rpx 0 20rpx 40rpx;
			}
			input{
				height: 60rpx;
				width: 620rpx;
				margin-left: 40rpx;
				background:rgba(255,255,255,1);
				border:1px solid rgba(228,228,228,1);
			}
			.cardds{
				height: 198rpx;
				width: 620rpx;
				position: relative;
				.card_left{
					height: 198rpx;
					width: 300rpx;
					position: relative;
						border:  1px solid #0069FF;
					image{
						width: 300rpx;
						height: 198rpx;
					}
					
				}
				.card_right{
					position: absolute;
					height: 198rpx;
					width: 300rpx;
					border:  1px solid #0069FF;
					top: 0;
					right: 0rpx;
					image{
						width: 300rpx;
						height: 198rpx;
						
					}
						
				}
			}
			
		}
	}
.messsage{
	height: 1310rpx;
	// border: 1px solid #DD4A68;
	padding: 24rpx;
	.message_list{
		height: 1310rpx;
		// border: 1px solid #000000;
		border-radius: 16rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 5px 10px rgba(0,64,128,0.04);
		.card_img{
			height: 300rpx;
			width: 620rpx;
			position: relative;
			.left{
				// position: relative;
				height: 300rpx;
				width: 300rpx;
				border:1px solid rgba(228,228,228,1);
				position: absolute;
				display: flex;
				flex-direction: column;
				image{
				    margin: 45rpx 72rpx 32rpx 70rpx;
					height: 155.77rpx;
					width: 155.77rpx;
				}
				p{
					width:230rpx;
					height:45rpx;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:bold;
					line-height:45rpx;
					color:rgba(0,0,0,1);
					opacity:0.6;
					margin: 0rpx 32rpx 20rpx 32rpx;
				}
				span{
					
					height: 60rpx;
					width: 60rpx;
					image{
						height: 60rpx;
						width:60rpx;
						border:  1px dashed #000;
						position: absolute;
						right: -74rpx;
						top: -46rpx;
				
					}
				}
			}
			.right{
				height: 300rpx;
				width: 300rpx;
				// border: 1px dashed #000;
				border:1px solid rgba(228,228,228,1);
				position: absolute;
				right: 0;
				top: 0;
				image{
					margin: 45rpx 72rpx 0rpx 70rpx;
					height: 155.77rpx;
					width: 155.77rpx;
				}
				p{
					width:230rpx;
					height:45rpx;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:bold;
					line-height:45rpx;
					color:rgba(0,0,0,1);
					opacity:0.6;
					margin: 0rpx 101rpx 0 101rpx;
				}
				span{
					
					height: 60rpx;
					width: 60rpx;
					image{
						height: 60rpx;
						width:60rpx;
						border:  1px dashed #000;
						position: absolute;
						right: -74rpx;
						top: -46rpx;
				
					}
				}
				
			}
		}
		li{
			list-style: none;
			margin:40rpx 0 20rpx 40rpx;
		}
		input{
			height: 60rpx;
			width: 620rpx;
			background:rgba(255,255,255,1);
			border:1px solid rgba(228,228,228,1);
			margin-left: 40rpx;
		}
		.address{
			height: 60rpx;
			width: 620rpx;
		    position: relative;
			input{
				height: 60rpx;
				width: 620rpx;
				margin-left: 0rpx;
				background:rgba(255,255,255,1);
				border:1px solid rgba(228,228,228,1);
				
			}
			span{
				height: 60rpx;
				width: 60rpx;
				image{
					position: absolute;
					right: 0;
					top: 0;
					height: 60rpx;
					width: 60rpx;
					border: 1px dashed #000000;
				}
			}
			
		}
	}
}
button{
	width:576rpx;
	height:80rpx;
	background:rgba(0,110,255,1);
	border-radius:16rpx;
	margin: 24rpx auto;
	span{
		width:65rpx;
		height:45rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:45rpx;
		color:rgba(255,255,255,1);
		letter-spacing:30rpx;
		text-align: center;
		opacity:1;
	}
}
</style>

