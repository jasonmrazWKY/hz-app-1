<template>
	<view class="content">
		<view class="box" style="margin-bottom: 0;">
			<view class="rui-flex">
				<ruiDatePicker
					fields="day"
					start="2018-01-01"
					end="2019-12-30"
					:value="dates"
					@change="bindChange1"
				></ruiDatePicker>
			</view>
			<view class="rui-flex">
				<text style="color: #CCCCCC;">到</text>
				<ruiDatePicker
					fields="day"
					start="2018-01-01"
					end="2019-12-00"
					:value="datee"
					@change="bindChange2"
				></ruiDatePicker>
			</view>
			<button size='mini' style="right: 160upx;" @tap="onpeDetailed">查询</button>
			<button size='mini'  @tap="onpeIfon">更多</button>
		</view>
		<view class="m-top1"></view>
		<view class="warp">
			<view class="uni-padding-wrap uni-common-mt">
					<view class="text" v-for="(item1,index) in data" :key="index">
						<block>
						    <view class="uni-list-cell" hover-class="uni-list-cell-hover">
						        <view class="uni-triplex-row">
						            <view class="uni-triplex-left" style="width: 100%;">
						                <text class="uni-title uni-ellipsis">员工:{{item1.uname}}<text class="kg"></text>工序:{{item1.worktype}}<text class="kg"></text>货号:{{item1.huohao}}</text>
						                <text class="uni-text">包数:{{item1.bs}}<text class="kg"></text>数量:{{item1.sl}}<text class="kg"></text>工价:{{item1.price.toFixed(3)}}<text class="kg"></text>金额:{{item1.je.toFixed(2)}}</text>
						            </view>
						        </view>
						    </view>
						</block>
					</view>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</view>
			<t-table class='dw' style='width: 100%;z-index: 10;'>
				<t-tr>
					<t-td>合计</t-td>
					<t-td class='sl'>{{bs}}包</t-td>
					<t-td class="sl">{{sl1}}</t-td>					
					<t-td class="sl">¥{{zs}}</t-td>
				</t-tr>
			</t-table>
		</view>
		<view class="m-bottom"></view>
	</view>
</template>

<script>
	import ruiDatePicker from '../../../components/rattenking-dtpicker/rattenking-dtpicker.vue'
	import tTable from '@/components/t-table/t-table.vue'
	import tTh from '@/components/t-table/t-th.vue'
	import tTr from '@/components/t-table/t-tr.vue'
	import tTd from '@/components/t-table/t-td.vue'
	var timer_s = getNowFormatDate()
	var timer_e = getNowFormatDate()
	timer_s = timer_s.substring(0,7)+"-01";
	
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
			ruiDatePicker,
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				size:'',
				data:[],
				max: 0,
				loadMoreText: "加载中...",
				showLoadMore: true,
				time:'',
				tableList:[],
				dates:timer_s,
				datee:timer_e,
				huohao:'',
				chuanghao:'',
				color:'',
				chima:'',
				userid:'',
				uid:'',
				worktype:'',
				sl1:'',
				zs:'',
				dk:'',
				bs:''
			}
		},
		onBackPress(options) {
			console.log("###"+JSON.stringify(options));
			if (options.from === 'backbutton') {
				uni.switchTab({
					url: '/pages/admin/admin'
				});
				return true;
			}
			return false;
		},
		onUnload() {
			this.max = 0,
			this.data = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
			console.log('onUnload事件');
		},
		onReachBottom() {
			console.log("onReachBottom");
			console.log('max：'+this.max );
			if (this.max >= this.size) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true;    //设置下拉提示的标记
			setTimeout(() => {
				this.setDate();
			}, 500);
		}, 
		onLoad(r) {
			let temp = JSON.stringify(r);
			if(temp.indexOf('.html') < 0 && JSON.stringify(r) !='{}'){                   
				this.huohao = r.huohao;
				this.chuanghao = r.chuanghao;
				this.color = r.color
				this.chima = r.chima
				this.userid = r.userid
				this.uid = r.uid
				this.worktype = r.worktype
				this.time = r.time
				let temp = r.time.split(',');
				this.dates = temp[0];
				this.datee = temp[1];
			}
			// console.log(this.timer_s);
			this.dk = this.websiteUrl
			uni.getStorage({
				key:'fwqsj',success: res => {
					this.dk = res.data
					this.initDate()
				}
			})
		},
		methods: {
			initDate(){
				setTimeout(() =>{
					uni.request({
						url:`https://${this.dk}/gongziUidWorktype.aspx`,
						method: 'GET',
						data: {					
							dates:this.dates,
							datee:this.datee,
							huohao:this.huohao,
							chuanghao:this.chuanghao,
							color:this.color,
							chima:this.chima,
							userid:this.userid,
							uid:this.uid,
							worktype:this.worktype
						},
						success: res => {
							if(res.data.length>8000){
								uni.showModal({
									title:'友情提示',
									content:'您的数据量过大，请到电脑端查询'
								})
							}
							this.tableList = res.data
							this.size = this.tableList
							let temp = res.data;
							let sl1 =0;
							let sum =0
							let bs =0
							for (let i = 0;i <temp.length;i++) {						
								sl1 = sl1+temp[i].sl
								sum = sum+temp[i].je
								bs = bs+temp[i].bs
							}
							this.sl1 = sl1
							this.bs = bs
							this.zs= sum.toFixed(2);
							//一下为下拉使用
							
							this.max = 0;
							this.data = [];
							let data = [];
							this.max += (this.size<=20?this.size:20);
							let temp1 = this.tableList.splice(0,20);
							for(var i = 1;i <= temp1.length;i++){
								data.push(temp1[i-1]);
							}
							this.data = this.data.concat(data);
							uni.stopPullDownRefresh();
						}
					})
				})
			},
			setDate() {
				let data = [];
				this.max += (Math.floor(this.tableList.length/20)>0?20:this.tableList.length);
				let temp1 = this.tableList.splice(0,20);
				for(var i = 1;i <= temp1.length;i++){
					data.push(temp1[i-1]);
				}
				this.data = this.data.concat(data);
			},
			bindChange1(value){
				this.dates = value;
			},
			bindChange2(value){
				this.datee = value;
			},
			onpeDetailed(){
				this.initDate()
			},
			onpeIfon(){
				var date = new Date();
				var month = date.getMonth()+1;
				uni.redirectTo({
					url:'../../info/info?flag=5&month='+month
				})
			}
		}
		
	}
</script>

<style>
.uni-list{display: flex;}
.uni-list-cell{position: relative;}
.uni-list-cell-db button{position: absolute;right: 20upx;top: 10upx;background: rgb(255, 172, 96);color: #FFFFFF;z-index: 99;}
.rui-head{font-size: 4vw;height: 10vw;line-height: 10vw;padding: 0 4vw;text-align: left;}
.rui-flex{display: -webkit-flex;display: flex;align-items: center;font-size: 28upx;background: #FFFFFF;}
.rui-picker{border: none !important;}
.box{background: #FFFFFF;margin-bottom: 24upx;display: flex;position: fixed;top: 0upx;width: 100%;height: 72upx;z-index: 20;border-bottom: 1px solid #CCCCCC;}
.box input{padding: 0 20upx;}
.section {position: relative;background: #FFFFFF;width: 30%; margin-left: 20upx; }
.content input {padding: 0 10px; border: 1px solid #FFAC60;margin-top: 10upx;border-radius: 20upx;}
.section text{position: absolute;top: 10upx;}
button{position: absolute;right: 20upx;top: 10upx;background: rgb(255, 172, 96);color: #FFFFFF;z-index: 99;}	
.warp{background: #FFFFFF;}
.dw{position: fixed;bottom: 0;background: #FFFFFF;}
.sl{color: #F6871E;font-weight: 600;font-size: 28upx;}
.sl view{color: #F6871E;font-weight: 600;font-size: 28upx;}
.kg{margin-left: 20upx;}
.text {
		background-color: #FFFFFF;
	}
	.uni-triplex-row{
		padding: 0;
	}
	.uni-common-mt{
		margin-top: 0;
	}
	.uni-padding-wrap {
		width: 100%;
		padding:0;
	}
.uni-list-cell::after {
    position: absolute;
    z-index: 3;
    right: 0;
    bottom: 0;
    left: 0;
    height: 4upx;
    content: '';
    -webkit-transform: scaleY(.5);
    -ms-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}
.uni-list-cell{
	padding-left: 30upx;
	/* padding: 10upx 0 10upx 30upx; */
}
</style>
