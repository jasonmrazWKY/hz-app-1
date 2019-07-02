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
		<view class="warp" style='margin-top: 72upx;'>
			<t-table style='position: fixed;width: 100%;background: #FFFFFF;height: 88upx;' >
		        <t-tr >
		            <t-th>日期</t-th>
		            <t-th>货号</t-th>
		            <t-th>颜色</t-th>
		            <t-th>尺码</t-th>
					<t-th>包数</t-th>
					<t-th>数量</t-th>
		        </t-tr>
		    </t-table>		
			<t-table class='dw' style='width: 100%;z-index: 10;'>
				<t-tr>
					<t-td>合计:</t-td>
					<t-td class="sl">{{bs}}包</t-td>
					<t-td class="sl">{{sl}}</t-td>					
				</t-tr>
			</t-table>
		</view>
		<view class="m-top" style=""></view>
		<view class="box1" style="width:100%;">
			<view class="uni-padding-wrap uni-common-mt">
					<view class="text" v-for="(item,index) in data" :key="index">
					<t-table >
						<t-tr>
						    <t-td>{{(item.rq).substring(5)}}</t-td>
						    <t-td>{{item.huohao}}</t-td>
						    <t-td>{{item.color}}</t-td>
						    <t-td>{{item.chima}}</t-td>
							<t-td style='color: rgb(246,135,30);'>{{item.bs}}</t-td>
							<t-td style='color: red;'>{{item.sl}}</t-td>
						</t-tr>
					</t-table>
					</view>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</view>
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
				loadMoreText: "",
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
				bs:'',
				sl:'',
				dk:''
			}
		},
		onBackPress(options) {
			console.log("###"+JSON.stringify(options));
			if (options.from === 'backButton') {
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
			 console.log("diyici:"+JSON.stringify(r)); 
			 let temp = JSON.stringify(r);
			 if(temp.indexOf('.html') < 0 && JSON.stringify(r) !='{}'){  
                    console.log(r.huohao);
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
			this.dk = this.websiteUrl
			uni.getStorage({
				key:'fwqsj',success: res => {
					this.dk = res.data
					this.initData()
				}
			})	
		},
		methods: {
			initData(){
				setTimeout(() =>{
					uni.request({
						url: `https://${this.dk}/getSclzdHz.aspx`,
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
						   this.size = this.tableList.length
						   let temp = res.data
						   let bs =0;
						   let sl =0
						   for (let i = 0;i <temp.length;i++) {
						   	bs = bs+temp[i].bs
						   	sl = sl+temp[i].sl
						   }
						   this.bs = bs
						   this.sl= sl;
							
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
				},2000);
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
				this.initData()
			},
			onpeIfon(){
				var date = new Date();
				var month = date.getMonth()+1;
				uni.redirectTo({
					url:'../../info/info?flag=1&month='+month
				})
			}
		},
		
	}
</script>

<style>
.uni-list{display: flex;justify-content: space-between;}
.uni-list-cell{position: relative;}
.uni-list-cell-db button{position: absolute;right: 20upx;top: 10upx;background: rgb(255, 172, 96);color: #FFFFFF;z-index: 99;}
.rui-head{font-size: 4vw;height: 10vw;line-height: 10vw;padding: 0 4vw;text-align: left;}
.rui-flex{display: -webkit-flex;display: flex;align-items: center;font-size: 28upx;background: #FFFFFF;}
.rui-picker{border: none !important;}
.box{background: #FFFFFF;margin-bottom: 24upx;display: flex;position: fixed;top: 0upx;width: 100%;height: 72upx;}
.box input{padding: 0 20upx;}
.section {position: relative;background: #FFFFFF; }
.content input {padding: 0 10px;padding-left: 100upx;}
.section text{position: absolute;top: 10upx;}
button{position: absolute;right: 20upx;top: 10upx;background: rgb(255, 172, 96);color: #FFFFFF;z-index: 99;}	
.warp{background: #FFFFFF;margin-bottom: 72upx;}
.dw{position: fixed;bottom: 0;background: #FFFFFF;}
.sl,.sl view{color: #F6871E;font-weight: 600;font-size: 28upx;}
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

</style>
