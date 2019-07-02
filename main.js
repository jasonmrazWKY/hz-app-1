import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.websiteUrl = 'mpro.ywhzsoft.com';
App.mpType = 'app'

// var timer_s = getNowFormatDate()
// var timer_e = getNowFormatDate()
// 	
// 	function getNowFormatDate() {
// 		var date = new Date();
// 		var seperator1 = "-";
// 		var seperator2 = ":";
// 		var month = date.getMonth() + 1;
// 		var strDate = date.getDate();
// 		if (month >= 1 && month <= 9) {
// 			month = "0" + month;
// 		}
// 		if (strDate >= 0 && strDate <= 9) {
// 			strDate = "0" + strDate;
// 		}
// 		var currentdate = date.getFullYear() + seperator1 + month + seperator1 +
// 			strDate;
// 		return currentdate;
// 	}


const app = new Vue({
    ...App
})
app.$mount()
