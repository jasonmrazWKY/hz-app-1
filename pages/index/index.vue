<template>
	<view class="content">
		<view class="uni-list" id="u-list">
			<view class="uni-list-cell" >
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image :src="img"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{title}}<text>当前工序-{{curr_worktype_name}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-flex uni-row">	
			<view class="uni-flex-item" id="xian" style="text-align: center;" >
				<view class="" style="font-weight: 600;">{{day_je}}</view>
				<view class="">今日工资</view>
			</view>
			<view class="uni-flex-item" style="text-align: center;">
				<view class="" style="font-weight: 600;">{{month_je}}</view>
				<view class="">当月工资</view>
			</view>
		</view>
		<uni-grid :show-border="false" :options="data1" @click="onClick"></uni-grid>	
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	var ths=this;
	export default {		
		components:{
			uniGrid,
		},
		data(){
			return{
				day_je:'',
				month_je:'',
				img: "../../static/img/1201.png",
				title:'',
				uid:"",
				curr_worktype_name:'',
				curr_worktype_bh:'',
				data1:[
					{image:'../../static/img/sm.png',text:'扫码计件'},
					{image:'../../static/img/mx.png',text:'今日产量明细'}, 
					{image:'../../static/img/hz.png',text:'今日产量汇总'},
					{image:'../../static/img/lsmx.png',text:'历史产量明细'},
					{image:'../../static/img/lshz.png',text:'历史产量汇总'},
					{image:'../../static/img/cx.png',text:'工价查询'},
					{image:'../../static/img/gxbd.png',text:'绑定工序菜单'},
					{image:'../../static/img/gxjd.png',text:'工序进度'},
					{image:'../../static/img/sm.png',text:'生产改数'},
					{image:'../../static/img/xg.png',text:'手动计件'},
					{image:'../../static/img/xg.png',text:'手动改数'}
				],
				dk:'',
				move_change:'',
				move_scan:''
			}
		},
		onShow() {	
			this.dk = this.websiteUrl
			////console.log(this.dk);
			uni.getStorage({
				key:'fwqsj',success: res => {
					this.dk = res.data
					
				}
			}),
			uni.getStorage({
				key:'loginData',success: res =>{
					console.log("员工当前登录用户："+JSON.stringify(res));
					this.title = res.data.uname
					this.uid = res.data.uid
					this.curr_worktype_bh = res.data.curr_worktype_bh
					this.curr_worktype_name = res.data.curr_worktype_name
					this.move_change = res.data.move_change
					this.move_scan = res.data.move_scan
					uni.request({
						url: `https://${this.dk}/gongziDayMonth.aspx`,
						method: 'GET',
						data: {
							uid:this.uid,
						},
						success: res => {
							////console.log(res);
							this.day_je = res.data.day_je
							this.month_je = res.data.month_je
						}
					});	
				}			
			})
			
		},
		methods:{
			onClick(e) {
				if(e.index == 0){
					if(this.move_scan == 0){
						uni.scanCode({	
							onlyFromCamera: true,
							scanType:['qrCode','barCode'],   //这里有个坑，不写的话扫描速度有点慢
							success: (res) => {
								uni.navigateTo({						
									url:'../SweepCode/SweepCode?result='+res.result
								})
							}
						})
					}else{
						uni.scanCode({	
							onlyFromCamera: true,
							scanType:['qrCode','barCode'],   //这里有个坑，不写的话扫描速度有点慢
							success: (res) => {
								uni.navigateTo({						
									url:'../worktype/chooseWorktype?result='+res.result
								})
							}
						})
					}
				}else if(e.index === 1){
					uni.navigateTo({
						url:'/pages/Detailed1/Detailed1'
					})
				}else if(e.index === 2){
					uni.navigateTo({
						url:'../Summary/Summary'
					})
				}else if(e.index === 3){
					uni.navigateTo({
						url: '../HistoricalOutput/HistoricalOutput',
					});
				}else if(e.index === 4){
					uni.navigateTo({
						url:'../HistoricalSummary/HistoricalSummary'
					})
				}else if(e.index === 5){
					uni.navigateTo({
						url:'../LabourCost/LabourCost'
					})
				} else if(e.index === 6){
					uni.navigateTo({
						url:'../worktype/worktype'
					})
				}else if(e.index === 7){
					uni.navigateTo({
						url: '../Procedure/Procedure',
					});
				}else if(e.index === 8){
					console.info('移动改数:'+this.move_change);
					if(this.move_change == 0 ){
						uni.showToast({title:'您暂时还没此权限',icon:'none'})
					}else{
						uni.scanCode({	
							onlyFromCamera: true,
							scanType:['qrCode','barCode'],   //这里有个坑，不写的话扫描速度有点慢
							success: (res) => {
								uni.navigateTo({						
									url:'../Ssgs/Ssgs?result='+res.result
								})
							}
						})
					}
				}else if(e.index === 9){
					uni.navigateTo({
						url: '../SweepCode/HandCode',
					});
				}else if(e.index === 10){
					if(this.move_change == 0 ){
						uni.showToast({title:'您暂时还没此权限',icon:'none'})
					}else{
						uni.navigateTo({
							url: '../Ssgs/HandSsgs',
						}); 
					}
					
				}
			},
		}
	}
</script>

<style>
	.uni-list{
		height: 134upx;
		background-color: #ffac60;
	}
	.uni-list:after {
		background-color: #ffac60;
	}
	.uni-list:before{
		background-color: #ffac60;
	}
	.uni-media-list-logo image{
		//border-radius: 50%;
	}
	.uni-media-list-body view{
		line-height:74upx;
		color: #FFFFFF;
	}
	.uni-media-list-body text{
		float: right;
		line-height: 74upx;
	}
	
	
	.uni-row{
		background: #FFAC60;
		height: 100upx;
		color: #FFFFFF;
		margin-bottom: 24upx;
	}
	#xian{
		position: relative;
	}
	#xian::after{
		position: absolute;
		content: '';
		width: 2px;
		background: rgb(238,238,238);
		height: 100upx;
		right: -1px;
		top: 10upx;
	}
	
	.SweepCode{
		height: 180upx;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 24upx;
	}
	.uni-grid{
		background: #FFFFFF;
	}
	.uni-grid view{
		height: 180upx
	}
	
	.content{overflow: hidden;}
</style>
