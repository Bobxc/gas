<template>
	<div class="ajloginFive">
		<div class="title">
			<div class="big">燃气瓶安检异常情况汇总</div>
			<div class="little">入户安检如发生下列异常情况请在口内打钩</div>
		</div>
		<ul class="father">
			<li class="fatherList" v-for="(val, key) in dataList" :key="key">
				<div class="bigTitle" :style="{ background: key % 2 == 1 ? '#F0F0FF' : '#F5F7FF' }">
					<p>{{ val.title }}</p>
					<span @click="chackShow(key)"><image :src="val.image" altchackShow="#"></image></span>
				</div>
				<div class="warp" v-show="val.show">
					<ul class="childen" >
						<li class="childenList" v-for="(item, index) in val.list" :key="index">
							<checkbox :value="item.value" :checked="item.checkbox" @click="checkedBox(item)"/>
							<span>{{ item.name }}</span>
						</li>
					</ul>
				</div>
			</li>
		</ul>
		<button type="default" @click="toAjlogin(1)">确定</button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dataList: [
				{
					list: [
						{ name: '用户不在家', value: '用户不在家', checkbox: false },
						{ name: '用户转管道', value: '用户转管道', checkbox: false },
						{ name: '钢瓶与管道或燃煤混用', value: '钢瓶与管道或燃煤混用', checkbox: false },
						{ name: '加热燃气瓶', value: '加热燃气瓶', checkbox: false },
						{ name: '钢瓶侧卧、倒立使用', value: '钢瓶侧卧、倒立使用', checkbox: false },
						{ name: '瓶组间不符合安全技术规格要求', value: '瓶组间不符合安全技术规格要求', checkbox: false },
						{ name: '超量存放气瓶', value: '超量存放气瓶', checkbox: false },
						{ name: '商业用户未与供气单位签订合同', value: '商业用户未与供气单位签订合同', checkbox: false },
						{ name: '非正规燃气公司配送', value: '非正规燃气公司配送', checkbox: false },
						{ name: '商业用户未设立燃气瓶专管员', value: '商业用户未设立燃气瓶专管员', checkbox: false }
					],
					stretchstart: 0,
					title: '其他不规范情况',
					show: false,
					image: '../../static/image/bottom.png'
				},
				{
					list: [
						{ name: '泄露', value: '泄露', checkbox: false },
						{ name: '超过检测期限', value: '超过检测期限', checkbox: false },
						{ name: '超过报废期限', value: '超过报废期限', checkbox: false },
						{ name: '手轮起闭不顺畅', value: '手轮起闭不顺畅', checkbox: false },
						{ name: '附件不全', value: '附件不全', checkbox: false }
					],
					stretchstart: 0,
					title: '气瓶',
					show: false,
					image: '../../static/image/bottom.png'
				},
				{
					list: [
						{ name: '有泄漏', value: '有泄漏', checkbox: false },
						{ name: '老化', value: '老化', checkbox: false },
						{ name: '过长', value: '过长', checkbox: false },
						{ name: '穿墙', value: '穿墙', checkbox: false },
						{ name: '无管扣', value: '无管扣', checkbox: false },
						{ name: '非专用胶管或未使用金属波纹管', value: '非专用胶管或未使用金属波纹管', checkbox: false },
						{ name: '未使用三通连接', value: '未使用三通连接', checkbox: false }
					],
					stretchstart: 0,
					title: '胶管',
					show: false,
					image: '../../static/image/bottom.png'
				},
				{
					list: [
						{ name: '有泄露', value: '有泄露', checkbox: false },
						{ name: '老化', value: '老化', checkbox: false },
						{ name: '使用不符合灶具安全使用标准的调压器', value: '使用不符合灶具安全使用标准的调压器', checkbox: false }
					],
					stretchstart: 0,
					title: '调压器',
					show: false,
					image: '../../static/image/bottom.png'
				},
				{
					list: [
						{ name: '泄露', value: '泄露', checkbox: false },
						{ name: '超年限使用', value: '超年限使用', checkbox: false },
						{ name: '灶具无自动熄火装置', value: '灶具无自动熄火装置', checkbox: false },
						{ name: '其他产品质量问题', value: '其他产品质量问题', checkbox: false },
						{ name: '使用不符合气源要求的灶具淋浴器', value: '使用不符合气源要求的灶具淋浴器', checkbox: false },
						{ name: '使用国家明令禁止使用的淋浴器', value: '使用国家明令禁止使用的淋浴器', checkbox: false }
					],
					stretchstart: 0,
					title: '灶具、淋浴器',
					show: false,
					image: '../../static/image/bottom.png'
				},
				{
					list: [
						{ name: '易燃易爆品堆放', value: '易燃易爆品堆放', checkbox: false },
						{ name: '通风不畅', value: '通风不畅', checkbox: false },
						{ name: '卧室内使用燃气器具', value: '卧室内使用燃气器具', checkbox: false },
						{ name: '热水器浴室内安装', value: '热水器浴室内安装', checkbox: false }
					],
					stretchstart: 0,
					title: '用气环境',
					show: false,
					image: '../../static/image/bottom.png'
				}
			],
			num: 0,
			flag: false,
			value: '',
		};
	},
	methods: {
		chackShow(key) {
			console.log(key)
			this.dataList[key].stretchstart++;
			if (this.dataList[key].stretchstart % 2 == 0) {
				this.dataList[key].show = false;
				this.dataList[key].image = '../../static/image/bottom.png';
			} else {
				this.dataList[key].show = true;
				this.dataList[key].image = '../../static/image/top.png';
			}
			// if((this.dataList[key].stretchstart)%2==1){
			// 	this.dataList[key].show = true;
			// }
		},
		//选择checkbox更改对应的checked属性
		checkedBox(e) {
			let value="";
			this.$set(e, 'checkbox', !e.checkbox)
			// console.log(e)
			this.dataList.forEach(val=>{
				val.list.forEach(val=> {
					// console.log(val)
					if(val.checkbox == true) {
						value +=',' + val.value
					}
				})
			})
			let values = value.substr(0, 1)
			if(values == ',') {
				value = value.substr(1)
			}
			this.value = value
			// console.log(this.value)
			this.$store.state.checkAbnormal = this.value
			console.log(this.$store.state.checkAbnormal)
		},
		//确定button
		toAjlogin() {
			uni.navigateBack({
			})
		},
	}
};
</script>
<style lang="less">
.ajloginFive {
	width: 100vw;
	height: 100vh;
	padding: 0 40rpx;
	box-sizing: border-box;
	overflow: hidden;
	.title {
		// height: 378rpx;
		text-align: center;
		.big {
			height: 45rpx;
			margin-top: 238rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 45rpx;
			color: rgba(0, 0, 0, 1);
		}
		.little {
			height: 40rpx;
			margin-top: 32rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 40rpx;
			color: rgba(102, 102, 102, 1);
		}
	}
	.father {
		margin-top: 23rpx;
		overflow: scroll;
		height: 800rpx;
		.fatherList {
			.bigTitle {
				display: flex;
				padding: 0 32rpx;
				// background:rgba(245,247,255,1);
				align-items: center;
				p {
					flex: 1;
					height: 80rpx;
					line-height: 80rpx;

					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
				}
				span {
					display: inline-block;
					width: 60rpx;
					height: 60rpx;
					image {
						height: 60rpx;
						width: 60rpx;
					}
				}
			}
			.warp {
				// height: 700rpx;
			}
			.childenList {
				height: 70rpx;
				line-height: 70rpx;
				display: flex;
				padding: 0 32rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
			}
		}
	}
	button {
		width: 576rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		background-color: rgba(0, 110, 255, 1);
		color: rgba(255, 255, 255, 1);
		letter-spacing: 15rpx;
		text-align: center;
		margin-top: 60rpx;
	}
	.evenLine {
		background: rgba(235, 247, 255, 1) !important;
	}
}
</style>
