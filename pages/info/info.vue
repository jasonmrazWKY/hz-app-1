<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">货号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" placeholder="请输入货号"  v-model="huohao"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">床号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text"  placeholder="请输入床号" v-model="chuanghao"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">颜色:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text"  placeholder="请输入颜色" v-model="color"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">尺码:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text"  placeholder="请输入尺码" v-model="chima"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">编号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text"  placeholder="请输入编号" v-model="userid"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">员工:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" @confirm="confirm" placeholder="请输入员工"  v-model="uid"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">工序:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" placeholder="请输入工序"  v-model="worktype"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">当前选择:</view>
				</view>
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" style="width: 100%;">
					<view class="uni-input">{{array[index].name}}</view><text style="display: none;">{{array[index].timer}}</text>
				</picker>
			</view>
		</view>
		<button class="btn" @tap="okBtn" type="primary" style="background: #FFAC60;">确定</button>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	var timer_s = getNowFormatDate()
	var timer_e = getNowFormatDate()
	/* timer_s = timer_s.substring(0,7)+"-01"; */	
	 function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 +
			strDate;
		return currentdate;
	} 
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				flag:'',
				array: [
					{name:'今日'},
					{name:'一月'}, 
					{name:'二月'}, 
					{name:'三月'},
					{name:'四月'},
					{name:'五月'},
					{name:'六月'},
					{name:'七月'},
					{name:'八月'},
					{name:'九月'},
					{name:'十月'},
					{name:'十一月'},
					{name:'十二月'}
				],
				type:'',
				worktypeList: [],
				index: -1,
				huohao:'',
				chuanghao:'',
				color:'',
				chima:'',
				userid:'',
				uid:'',
				worktype:'',
				sssl:'',
				cp:'',
				cs:'',
				dk:'',      //服务器ip
				timer:''
			}
		},
		onLoad: function(r) {
			console.log(r);
			this.index = r.month;
			this.flag = r.flag;
			this.dk = this.websiteUrl;
			uni.getStorage({
				key:'fwqsj',
				success: res => {
					this.dk = res.data
				}
			})
			/* uni.request({
				url: `http://${this.dk}/getUserWorktype.aspx`,
				method: 'GET',
				data: {},
				success: res => {
					this.worktypeList = res.data
				}
			}) */
			
			// uni.request({
			// 	url: `http://${this.dk}/getColor.aspx`,
			// 	method: 'GET',
			// 	data: {},
			// 	success: res => {
			// 		this.array = res.data
			// 	}
			// })
			
		},
		onBackPress(options) {  
			if (options.from === 'navigateBack') {
				uni.switchTab({
					url: '/pages/index/index'
				});
				return true; 
		    }  
		    return false;  
		}, 
		methods: {
			getCurrentMonthLast(month1,year1){
				var currentMonth = month1-1;
				var nextMonth=++currentMonth;
				var nextMonthFirstDay=new Date(year1,nextMonth,1);
				var oneDay=1000*60*60*24;
				var lastTime = new Date(nextMonthFirstDay-oneDay);
				var month = parseInt(lastTime.getMonth()+1);
				var day = lastTime.getDate();
				if (month < 10) {
					month = '0' + month
				}
				if (day < 10) {
					day = '0' + day
				}
				return year1 + '-' + month + '-' + day;
            },
			getNowFormatDate() {
				var date = new Date();
				var seperator1 = "-";
				var seperator2 = ":";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = date.getFullYear() + seperator1 + month + seperator1 +
					strDate;
				return currentdate;
			},
			formateTime(r){
				var seperator1 = "-";
				var time = new Array();
				if(r==0){
					time.push(this.getNowFormatDate());
					time.push(this.getNowFormatDate());
					return time;      // 0 开始时间 1 结束时间
				}else {
					if ( r>= 1 && r <= 9) {
						r = "0" + r;
					 }
					 let tempdate = new Date();
					 let times = tempdate.getFullYear()+seperator1+r+seperator1+'01';
					 let timee =  this.getCurrentMonthLast(r,new Date().getFullYear());
					 time.push(times);
					 time.push(timee);
					 return time;
				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			},
			okBtn(){
				let huohao = this.huohao
				let chuanghao = this.chuanghao
				let color = this.color
				let chima =this.chima
				let userid =this.userid
				let uid =this.uid
				let worktype =this.worktype	
				//let time = this.array[this.index].timer;
				let time =  this.formateTime(this.index);
				if(this.flag==1){
					uni.redirectTo({
						url: `../admin/ProcessCard/ProcessCard?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&uid=${uid}&worktype=${worktype}&time=${time}`
					})
				}else if(this.flag==2){
					uni.redirectTo({
						url: `../admin/GenerateScanned/GenerateScanned?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&uid=${uid}&worktype=${worktype}&time=${time}`
					})
				}else if(this.flag==3){
					uni.redirectTo({
						url:`../admin/GeneratingUnscanned/GeneratingUnscanned?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&uid=${uid}&worktype=${worktype}&time=${time}`
					})
				}else if(this.flag==4){
					uni.redirectTo({
						url:`../admin/EmployeeStatistics/EmployeeStatistics?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&uid=${uid}&worktype=${worktype}&time=${time}`
					})
				}else if(this.flag==5){
					uni.redirectTo({
						url:`../admin/EmployeeProcessStatistics/EmployeeProcessStatistics?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&uid=${uid}&worktype=${worktype}&time=${time}`
					})
				}else if(this.flag==6){
					uni.redirectTo({
						url:`../admin/NumberProcedure/NumberProcedure?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&uid=${uid}&worktype=${worktype}&time=${time}`
					})
				}else if(this.flag==7){
					uni.redirectTo({
						url:`../admin/EmployeeWageRanking/EmployeeWageRanking?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&uid=${uid}&worktype=${worktype}&time=${time}`
					})
				}else if(this.flag == 8){
					uni.redirectTo({
						url:`../admin/NumberInventory/NumberInventory?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&uid=${uid}&worktype=${worktype}&time=${time}`
					})
				}
				
			},
			togglePopup(type) {
				this.type = type
				console.info(this.type);
			},
			confirm(){
				console.info("HELLO WORLD");
				this.togglePopup('middle-list')
			},
			test(){
				uni.showToast({
					title: '标题',
			        duration: 2000
				})
			},
			radioChange: function(evt) {
			    
			}
		}
	}
</script>

<style>
	.btn{
		margin-top: 40upx;
		width: 90%;
		background: rgb(255, 172, 96);
	}
	.uni-list-cell{
		position: relative;
	}
	.uni-list-cell-db button{
		position: absolute;
		right: 20upx;
		top: 10upx;
		background: rgb(255, 172, 96);
		color: #FFFFFF;
		z-index: 99;
	}
	.content uni-input{
		padding-left: 0 !important;
	}
	.uni-input{
		padding: 0 !important;
		height: 66upx;
		line-height: 66upx;
	}
	.uni-label{
		width:140upx;
	}
	.center-box {
		width: 500upx;
		height: 500upx;
	}
	.uni-list-item {
		text-align: left;
		line-height: 80upx;
		border-bottom: 1px #f5f5f5 solid;
	}
	
	.uni-list-item:last-child {
		border: none;
	}
</style>
