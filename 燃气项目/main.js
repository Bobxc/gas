import Vue from 'vue'
import App from './App'
// import "./static/image/font_1896421_9127ml94yo4/iconfont.css"
import member from './common/common.js'
import store from './store/index.js'
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
