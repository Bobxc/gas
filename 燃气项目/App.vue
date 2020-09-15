<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
	
};
</script>

<style lang="less">
/* 解决头条小程序组件内引入字体不生效的问题 */

/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
* {
	margin: 0;
	padding: 0;
}
ul {
	list-style: none;
}
p {
	font-size: 0;
	line-height: 0;
}
</style>
