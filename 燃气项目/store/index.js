import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		emptyNum: '',
		fullNum: '',
		gcEmptysList: {},
		gcFullsList: {},
		dispatcher: {},
		//安检异常汇总
		checkAbnormal: '',
		userInfoList:[],
		userInfo: {
			user_name: '',
			usertype: '',
			principal: '',
			phone:'',
			keyNumber: '',
			delivery_address: ''
		}
	},
	mutations: {
		
	},
	actions: {
		
	},
	getters: {
		
	},
	modules: {
		
	}
})

export default store