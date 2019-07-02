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
					{image:'../../static/img/lckff.png',text:'流转/裁床单汇总'},
					{image:'../../static/img/sccx_ysm.png',text:'生产查询-已扫描'}, 
					{image:'../../static/img/cx.png',text:'生产查询-未扫描'},
					{image:'../../static/img/yghhtj.png',text:'员工货号统计'},
					{image:'../../static/img/yggxtj.png',text:'员工工序统计'},
					{image:'../../static/img/yggzpm.png',text:'员工工资排名'},
					{image:'../../static/img/hhgxkc.png',text:'货号工序库存'},
					{image:'../../static/img/hhkccx.png',text:'货号库存查询'},
					{image:'../../static/img/ygxxcx.png',text:'员工信息查询'}
				],
				dk:'',
				move_admin:''
			}
		},
		onShow() {
			uni.getStorage({
				key:'loginData',success: res =>{
					console.log(res);
					this.title = res.data.uname
					this.uid = res.data.uid
					this.curr_worktype_bh = res.data.curr_worktype_bh
					this.curr_worktype_name = res.data.curr_worktype_name
					this.move_admin = res.data.move_admin
				}			
			})
		},
		onLoad:function(cpoin){	
			this.dk = this.websiteUrl
			uni.getStorage({
				key:'fwqsj',success: res => {
					this.dk = res.data				
				}
			})
			/* uni.getStorage({
				key:'loginData',success: res =>{
					console.log(res);
					this.title = res.data.uname
					this.uid = res.data.uid
					this.curr_worktype_bh = res.data.curr_worktype_bh
					this.curr_worktype_name = res.data.curr_worktype_name
					this.move_admin = res.data.move_admin
				}			
			}) */
		},
		methods:{
			onpeRegister(){
					uni.showModal({
						title: '提示',
						content: '是否注销用户',
						success: function (res) {
							if (res.confirm) {
								uni.removeStorage({
									key: 'loginData',success: function (res) {
										uni.navigateTo({
											url:'../login/login'
										})
									}
								});							
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				
			},
			onClick(e) {
				if (this.move_admin === 0) {
					uni.showToast({title:'您暂时还没此权限',icon:'none'})
				} else{
					if(e.index == 0){
						 uni.navigateTo({url:'ProcessCard/ProcessCard'})					
					} else if(e.index === 1){
						 uni.navigateTo({url:'GenerateScanned/GenerateScanned'})
					}else if(e.index === 2){
						uni.navigateTo({url:'GeneratingUnscanned/GeneratingUnscanned'})
					}else if(e.index === 3){
						uni.navigateTo({url: 'EmployeeStatistics/EmployeeStatistics',})
					}else if(e.index === 4){
						uni.navigateTo({url:'EmployeeProcessStatistics/EmployeeProcessStatistics'})
					}else if(e.index === 5){
						uni.navigateTo({url:'EmployeeWageRanking/EmployeeWageRanking'})
					} else if(e.index === 6){
						uni.navigateTo({url:'NumberProcedure/NumberProcedure'})
					}else if(e.index === 7){
						uni.navigateTo({url: 'NumberInventory/NumberInventory'});
					}else if(e.index === 8){
						uni.navigateTo({url:'EmployeeInformation/EmployeeInformation'})}
				}
			},
		}
	}
</script>

<style>
	.uni-list{height: 134upx;background-color: #ffac60;}
	.uni-list:after {background-color: #ffac60;}
	.uni-list:before{background-color: #ffac60;}
	.uni-media-list-logo image{
		//border-radius: 50%;
	}
	.uni-media-list-body view{line-height:74upx;color: #FFFFFF;}
	.uni-media-list-body text{float: right;line-height: 74upx;}
	.SweepCode{height: 180upx;background: #FFFFFF;display: flex;justify-content: center;align-items: center;margin-bottom: 24upx;}
	.uni-grid{background: #FFFFFF;}
	.uni-grid view{height: 180upx}
</style>
