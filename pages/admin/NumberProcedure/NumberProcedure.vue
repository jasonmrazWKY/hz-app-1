<template>
	<view class="content">
		<view class="box" style="border-bottom: 1px solid #CCCCCC;">
			<view class="section section_gap" style="height: 72upx;">
				<text>货号:</text>
				<input type="text" v-model="huohao" value="" placeholder="请输入货号"  style="line-height: 72upx"/>
			</view>
			<button size='mini' style="right: 160upx;" @tap="onpeDetailed">查询</button>
			<button size='mini'  @tap="onpeIfon">更多</button>
		</view>
		<view class="m-top1"></view>
		<view class="warp">
			<view class="uni-padding-wrap uni-common-mt">
					<view class="text" v-for="(item1,index) in data" :key="index">
						<block>
						    <view class="uni-list-cell">
						        <view class="uni-triplex-row">
						            <view class="uni-triplex-left" style="width: 100%;">
						                <text class="uni-title uni-ellipsis">货号:{{item1.huohao}}<text class="kg"></text>颜色:{{item1.color}}<text class="kg"></text>尺码:{{item1.chima}}</text>
						                <text class="uni-text">工序:{{item1.worktype}}<text class="kg"></text>包数:{{item1.bs}}<text class="kg"></text>数量:{{item1.sl}}</text>
						            </view>
						        </view>
						    </view>
						</block>
					</view>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</view>
			<t-table class='dw'>
				<t-tr>
					<t-td>合计:</t-td>
					<t-td class="sl">{{bs}}包</t-td>
					<t-td class="sl">{{sl1}}</t-td>
				</t-tr>
			</t-table>
		</view>
		<view class="m-bottom"></view>
	</view>
</template>

<script>
	/* import ruiDatePicker from '../../../components/rattenking-dtpicker/rattenking-dtpicker.vue' */
	import tTable from '@/components/t-table/t-table.vue'
	import tTh from '@/components/t-table/t-th.vue'
	import tTr from '@/components/t-table/t-tr.vue'
	import tTd from '@/components/t-table/t-td.vue'
	export default {
		components: {
			/* ruiDatePicker, */
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
				tableList:[],
				huohao:'',
				chuanghao:'',
				color:'',
				chima:'',
				userid:'',
				uid:'',
				worktype:'',
				sl1:'',
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
			}
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
						url:`https://${this.dk}/getHuohaoWorktypeKc.aspx`,
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
							if(this.tableList == 0){
								this.showLoadMore=false
							}
							this.size = this.tableList.length
							let temp = res.data;
							let sl1 =0;
							let bs =0;
							for (let i = 0;i <temp.length;i++) {						
								sl1 = sl1+temp[i].sl
								bs = bs+temp[i].bs
							}
							this.sl1 = sl1	
							this.bs=bs
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
					},2000);
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
					url:'../../info/info?flag=6&month='+month
				})
			}
		},
		
	}
</script>

<style>
.box,.box input,.warp,.dw,.section{background: #FFFFFF;}
.box,button,.dw{z-index: 11;}
.box{margin-bottom: 24upx;display: flex;position: fixed;top: 0upx;width: 100%;height: 72upx;}
.section {position: relative; width: 50%;margin-left: 30upx;}
.box input {padding: 0 0 0 10upx;margin-top: 11upx; border: 1px solid #CCCCCC;border-radius: 20upx;margin-left: 81upx;}
.section text{position: absolute;top: 10upx;}
button{position: absolute;right: 20upx;top: 10upx;background: rgb(255, 172, 96);color: #FFFFFF;}	
/* .warp{margin-top: 40upx;} */
.uni-list-cell{position: relative;}
.dw{position: fixed;bottom: 0;width: 100%;}
.sl,.sl view{color: #F6871E;font-weight: 600;font-size:28upx;}
.kg{margin-left: 30upx;}
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
