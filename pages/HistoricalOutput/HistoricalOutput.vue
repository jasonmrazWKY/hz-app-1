<template>
	<view class="content">
		<view class="uni-list top">
			<view class="uni-list-cell " style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">开始:</view>
				</view>
				<view class="uni-list-cell-db">
					<ruiDatePicker fields="day" start="2019-01-01" end="2020-12-31" :value="value1" @change="bindChange1"></ruiDatePicker>
				</view>
				<view class="uni-list-cell-left">
					<view class="uni-label">结束:</view>
				</view>
				<view class="uni-list-cell-db">
					<ruiDatePicker fields="day" start="2019-01-01" end="2020-12-31" :value="value2" @change="bindChange2"></ruiDatePicker>
				</view>
				
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">货号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" v-model="huohao" ></input>
				</view>
				<view class="uni-list-cell-left">
					<view class="uni-label">工序:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text"  v-model="worktype" ></input>
				</view>
				<button size='mini' style="margin-right: 20upx;"  @tap="onpeDetailed">查询</button>
				<button size='mini' style="margin-right: 20upx;"  @tap="onpeDetailedMore">更多</button>
			</view>
		</view>
		<view class="m-top" style="height: 160upx;"></view>
		<view class="warp">
			<view class="uni-padding-wrap uni-common-mt">
				<view class="text" v-for="(item1,index) in data" :key="index"><!-- 编号:{{item.id}} -->				
						<block>
						<view class="uni-list-cell">
							<view class="uni-triplex-row">
								<view class="uni-triplex-left" style="width: 100%;">
								   <view class="uni-triplex-left" style="width: 100%;">
									  <text class = "uni-text">编号:{{item1.id}}<text class="kg"></text>扫描时间:{{item1.inputtime}}<text class="kg"></text>床/缸号:{{item1.chuanghao}}</text>
									  <text class = "uni-text">货号:{{item1.huohao}}<text class="kg"></text>颜色:{{item1.color}}<text class="kg"></text>尺码:{{item1.chima}}<text class="kg"></text>工序:{{item1.worktype}}</text>
									  <text class="uni-text-small uni-ellipsis" style="color: #FFAC60;font-size: 32upx;">数量:{{item1.sl}}<text class="kg"></text>工价:{{item1.price}}<text class="kg"></text>金额:{{item1.je}}</text>
								   </view>
								</view>
							</view>
						</view>
					</block>
				</view>
			    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		    </view>
		    <view class="m-bottom"></view>
				<t-table class='dw' style='width: 100%;z-index: 10;'>
					<t-tr>
						<t-td>合计：</t-td>
						<t-td class="sl">{{sl2}}包</t-td>
						<t-td class="sl">{{sl1}}</t-td>
						<t-td class="sl">¥{{zs}}</t-td>
					</t-tr>
				</t-table>
		    </view>
	    </view>
</template>

<script>
	import ruiDatePicker from '../../components/rattenking-dtpicker/rattenking-dtpicker.vue'
	import tTable from '@/components/t-table/t-table.vue'
	import tTh from '@/components/t-table/t-th.vue'
	import tTr from '@/components/t-table/t-tr.vue'
	import tTd from '@/components/t-table/t-td.vue'
	
    var d = getNowFormatDate();
	
	function getNowFormatDate() {
		var array = new Array();
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
		var firstDayOfYear = date.getFullYear() + seperator1 + month + seperator1 + '01';
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;      //当前时间  yyyy-MM-dd
		array.push(firstDayOfYear);
	    array.push(currentdate);
		return array;
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
				showLoadMore: false,
				tableList: [],
				value1: d[0],    //开始时间
				value2: d[1],    //结束时间
				uid: '',
				title: '',
				curr_worktype_bh: '',
				curr_worktype_name: '',
				huohao: '',
				worktype:'',
				color:'',
				chuanghao:'',
				chima:'',
				userid:'',  //编号
				sl1: '',
				sl2: '',
				zs: '',
				dk: ''
			}
		},
		onBackPress(options) {
			if (options.from === 'backbutton') {
				uni.switchTab({
					url: '/pages/index/index'
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
			}, 1000);
		}, 
		onLoad(r) {
			let temp = JSON.stringify(r);
			if(temp.indexOf('.html') < 0 && JSON.stringify(r) !='{}'){  
					this.huohao = r.huohao;
					this.chuanghao = r.chuanghao;
					this.color = r.color
					this.chima = r.chima
					this.userid = r.userid
					this.worktype = r.worktype
			}
			this.dk = this.websiteUrl
			uni.getStorage({
					key: 'fwqsj',
					success: res => {
						this.dk = res.data
					}
			}),
			uni.getStorage({
				key: 'loginData',
				success: res => {
					this.title = res.data.uname
					this.uid = res.data.uid
					this.curr_worktype_bh = res.data.curr_worktype_bh
					this.curr_worktype_name = res.data.curr_worktype_name
					this.initData();
				}
			})
		},
		methods: {
			initData(){
				setTimeout(() =>{
					uni.request({
						url: `https://${this.dk}/gongziMx.aspx`,
						method: 'GET',
						data: {
							uid:this.uid,
							dates:this.value1,
							datee:this.value2,
							huohao:this.huohao,
							worktype:this.worktype,
							color:this.color,
							chuanghao:this.chuanghao,
							chima:this.chima,
							userid:this.userid
						},
						success: res => {
						    this.tableList = res.data      //请求的所有数据
							this.size = this.tableList.length; 
							let temp = res.data;
							let sum = 0
							let sl1 = 0;
							for (let i = 0; i < temp.length; i++) {
								sum = sum + temp[i].je
								sl1 = sl1 + temp[i].sl
							}
							this.zs = sum.toFixed(2);
							this.sl1 = sl1
							this.value3 = ''
							this.value4 = ''
							this.sl2 = temp.length; 
							
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
				//console.log(this.max);
				let temp1 = this.tableList.splice(0,20);
				for(var i = 1;i <= temp1.length;i++){
					data.push(temp1[i-1]);
				}
            	this.data = this.data.concat(data);
            },
			bindChange1(value) {
				this.value1 = value;
			},
			bindChange2(value) {
				this.value2 = value;
			},
			onpeDetailedMore(){
				uni.navigateTo({
					url:'../info/info1?flag=3'
				})
			},
			onpeDetailed() {
				/* uni.request({
					url: `https://${this.dk}/gongziMx.aspx`,
					method: 'GET',
					data: {
						uid: this.uid,
						dates: this.value1,
						datee: this.value2,
						huohao: this.huohao,
						worktype: this.worktype
					},
					success: res => {
						this.tableList = res.data
						let temp = res.data;
						let sum = 0
						let sl1 = 0;
						for (let i = 0; i < temp.length; i++) {
							//console.log(temp[i].je);
							sum = sum + temp[i].je
							sl1 = sl1 + temp[i].sl
						}
						this.zs = sum.toFixed(2);
						this.sl1 = sl1
						this.value3 = ''
						this.value4 = ''
						this.sl2 = temp.length
					}
				}); */
				this.initData();
			}
		},

	}
</script>

<style>
.uni-label{width:90upx;}
	.rui-head {
		font-size: 4vw;
		height: 10vw;
		line-height: 10vw;
		padding: 0 4vw;
		text-align: left;
	}

	.rui-flex {
		display: -webkit-flex;
		display: flex;
		align-items: center;
		font-size: 4vw;
		border-bottom: 1px solid #CCCCCC;
		background: #FFFFFF;
	}

	.rui-picker {
		border: none !important;
	}

	.box {	
		padding: 0 40upx;
		margin-bottom: 24upx;
		display: flex;
		justify-content: space-between;
	}
	
	.box1{
		background: #FFFFFF;
		padding: 0 40upx;
		margin-bottom: 24upx;
	}
	.section text {
		position: absolute;
		top: 10upx;
	}

	button{
		background: rgb(255, 172, 96);
		color: #FFFFFF;
	}	


	.dw {
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
	}

		.uni-list-cell-left {
		   font-size: 14px;
		   padding: 0 0 0 5upx;
		}
		.uni-input{
			padding: 0 !important;
			height: 66upx;
			line-height: 66upx;
		}
		.uni-label{
			width:90upx;
		}
		.uni-list-cell-db{
			 height: 66upx;
			line-height: 66upx;
			text-align: center;
		}
		.uni-list.top{
			position: fixed;
			top: 0upx;
			width: 100%;
			z-index: 20;
			/* #ifdef H5 */
			top: 88upx;
			/* #endif */
		}
		.kg{
		}
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
