<template>
	<view class="content">
		<view class="uni-list top">
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">货号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" v-model="huohao" placeholder="请输入货号"></input>
				</view>
				<view class="uni-list-cell-left">
					<view class="uni-label">工序:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text"  v-model="worktype" placeholder="请输入工序"></input>
				</view>				
				<button size='mini' style="margin-right: 20upx;" @tap="onpeDetailed">查询</button>
				<button size='mini' style="margin-right: 20upx;" @tap="onpeDetailedMore">更多</button>
			</view>
		</view>
		<view class="m-top1"></view>
		<view class="warp" >
			<view class="uni-list" v-for="(item1,index) in tableList" :key="item1.index">
			    <block>
			        <view class="uni-list-cell">
			            <view class="uni-triplex-row">
			                <view class="uni-triplex-left" style="width: 100%;">
								<text class = "uni-text">编号:{{item1.id}}<text class="kg"></text>扫描时间:{{item1.inputtime}}<text class="kg"></text>床/缸号:{{item1.chuanghao}}</text>
			                    <text class = "uni-text">货号:{{item1.huohao}}<text class="kg"></text>颜色:{{item1.color}}<text class="kg"></text>尺码:{{item1.chima}}<text class="kg"></text>工序:{{item1.worktype}}</text>
								<text class="uni-text-small uni-ellipsis" style="color: #FFAC60;font-size: 32upx;">数量:{{item1.sl}}<text class="kg"></text>工价:{{item1.price}}<text class="kg"></text>金额:{{item1.je}}</text>
			                </view>
			            </view>
			        </view>
			    </block>
			</view>
			<t-table class='dw' style='width: 100%;z-index: 10;'>
				<t-tr>
					<t-td>合计：</t-td>
					<t-td class="sl">{{sl2}}包</t-td>
					<t-td class="sl">{{sl1}}</t-td>
					<t-td class="sl">¥{{zs}}</t-td>
				</t-tr>
			</t-table>
		</view>
		<view class="m-bottom"></view>
	</view>
</template>
<script>
	import tTable from '@/components/t-table/t-table.vue'
	import tTh from '@/components/t-table/t-th.vue'
	import tTr from '@/components/t-table/t-tr.vue'
	import tTd from '@/components/t-table/t-td.vue'
	var timer_s = getNowFormatDate() + " 00:00:00"
	var timer_e = getNowFormatDate() + " 23:59:59"

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
			tTable,
			tTh,
			tTr,
			tTd,
		},
		data() {
			return {
				huohao:'',
				worktype:'',
				color:'',
				chuanghao:'',
				chima:'',
				userid:'',  //编号
				tableList: [],
				uid: '',
				title: '',
				curr_worktype_bh: '',
				curr_worktype_name: '',
				value1: '',
				value2: '',
				zs: '0',
				sl1: '0',
				sl2:'0',        //包数
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
			this.dk = this.websiteUrl,
			uni.getStorage({
				key: 'fwqsj',
				success: res => {
					this.dk = res.data
					console.log(this.dk);
				}
			}),
			uni.getStorage({
				key: 'loginData',
				success: res => {
					this.title = res.data.uname
					this.uid = res.data.uid
					this.curr_worktype_bh = res.data.curr_worktype_bh
					
					uni.request({
						url: `https://${this.dk}/gongziMx.aspx`,
						method: 'GET',
						data: {
							uid:this.uid,
							dates:timer_s,
							datee:timer_e,
							huohao:this.huohao,
							worktype:this.worktype,
							color:this.color,
							chuanghao:this.chuanghao,
							chima:this.chima,
							userid:this.userid
						},
						success: res => {
							console.log(res.data);
							this.tableList = res.data
							let temp = res.data;
							let sum = 0;
							let sl1 = 0;
							for (let i = 0; i < temp.length; i++) {
								sum = sum + temp[i].je
								sl1 = sl1 + temp[i].sl
							}
							this.zs = sum.toFixed(2);
							this.sl1 = sl1;
							this.sl2 = temp.length;   //包数
							this.huohao = ''
						}
					})
				}
			})		
		},
		methods: {
			onpeDetailedMore(){
				uni.navigateTo({
					url:'../info/info1?flag=1'
				})
			},
			onpeDetailed() {
				uni.request({
					url: `https://${this.dk}/gongziMx.aspx`,
					method: 'GET',
					data: {
						uid:this.uid,
						dates:timer_s,
						datee:timer_e,
						huohao:this.huohao,
						worktype:this.worktype
					},
					success: res => {
						this.tableList = res.data
						let temp = res.data;
						let sum = 0
						let sl1 = 0;
						for (let i = 0; i < temp.length; i++) {
							sum = sum + temp[i].je
							sl1 = sl1 + temp[i].sl
						}
						this.zs = sum.toFixed(2);
						this.sl1 = sl1;
						this.sl2 = temp.length;   //包数
						this.huohao = ''
					}
				});
			}
		}
	}
</script>
<style>
.uni-list.top{position: fixed;top: 0upx;height: 72upx;width: 100%;z-index: 11;/* #ifdef H5 */top: 88upx;/* #endif */}
.box{padding: 0 40upx;margin-bottom: 24upx;}
button{background: rgb(255, 172, 96);color: #FFFFFF;}	
.dw{position: fixed;bottom: 0;}	
.uni-list-cell-left {font-size: 14px;padding: 0 0 0 5upx;}
.uni-input{padding: 0 !important;height: 66upx;line-height: 66upx;}
.uni-label{width:90upx;}
</style>
	