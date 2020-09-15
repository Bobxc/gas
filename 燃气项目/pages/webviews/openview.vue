<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	import helper from "@/common/helper.js";
	export default{
		data(){
			return {
				url:'',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				
			}
		},
		onLoad:function(option){
			uni.setNavigationBarTitle({
				title:"悄悄设置一个标题"
			})
			var url = decodeURI(option.url);
			if(!url || !helper.IsURL(url)){
				this.result = "跳转地址错误";
				uni.navigateBack({
					delta:1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			}
			this.url = url;
		}
	}
</script>
<style>
</style>
