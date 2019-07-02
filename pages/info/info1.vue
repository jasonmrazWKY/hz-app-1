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
					<view class="uni-label">床/缸号:</view>
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
					<view class="uni-label">工序:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" placeholder="请输入工序"  v-model="worktype"></input>
				</view>
			</view>
		</view>
		<button class="btn" @tap="okBtn" type="primary" style="background: #FFAC60;">确定</button>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				flag:'',
				//array: [{name:'中国'},{name: '美国'}, {name:'巴西'}, {name:'日本'}],
				 current: -1,
				list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				type:'',
				worktypeList: [],
				index: 0,
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
				dk:''      //服务器ip
			}
		},
		onLoad: function(r) {
			console.log(r.flag);
			this.flag = r.flag;
			this.dk = this.websiteUrl;
			uni.getStorage({
				key:'fwqsj',
				success: res => {
					this.dk = res.data
				}
			})
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
			okBtn(){
				let huohao = this.huohao
				let chuanghao = this.chuanghao
				let color = this.color
				let chima =this.chima
				let userid =this.userid
				let uid =this.uid
				let worktype =this.worktype			
				if(this.flag==1){
					uni.navigateTo({
						url: `/pages/Detailed1/Detailed1?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&worktype=${worktype}`
					})
				}else if(this.flag==2){
					uni.navigateTo({
						url: `/pages/Summary/Summary?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&worktype=${worktype}`
					})
				}else if(this.flag==3){
					uni.navigateTo({
						url: `/pages/HistoricalOutput/HistoricalOutput?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&worktype=${worktype}`
					})
				}else if(this.flag==4){
					uni.navigateTo({
						url: `/pages/HistoricalSummary/HistoricalSummary?huohao=${huohao}&chuanghao=${chuanghao}&color=${color}&chima=${chima}&userid=${userid}&worktype=${worktype}`
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
