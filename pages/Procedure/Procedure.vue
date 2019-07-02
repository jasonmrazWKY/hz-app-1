<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">编号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="number" @focus="focus" placeholder="无法扫描可手动输入并点击确认" v-model="userid"></input>
					<button size='mini' @tap="getData">确认</button>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">床/缸号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" disabled ='true'  v-model="chuanghao"></input>
				</view>
				<view class="uni-list-cell-left">
					<view class="uni-label">货号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" disabled ='true'  v-model="huohao"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">颜色:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" disabled ='true'  v-model="color"></input>
				</view>
				<view class="uni-list-cell-left">
					<view class="uni-label">尺码:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" disabled ='true'  v-model="chima"></input>
				</view>
			</view>
		</view>

		<view class="warp" style='margin-bottom: 70px;'>
			<t-table>
		        <t-tr>
		            <t-th>工序</t-th>
		            <t-th>员工</t-th>
		            <t-th>时间</t-th>
		        </t-tr>
		        <t-tr v-for="(item,index) in list" :key="item.index">
		            <t-td>{{item.name}}</t-td>
		            <t-td>{{item.uname}}</t-td>
		            <t-td v-if="item.inputtime != null">
					   {{item.inputtime}}
					</t-td>
					<t-td v-else>
					   {{''}}
					</t-td>
		        </t-tr>
		    </t-table>
		</view>
		<button class="btn" type="primary" @tap="onpeSweepCode">扫码</button>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue'
	import tTh from '@/components/t-table/t-th.vue'
	import tTr from '@/components/t-table/t-tr.vue'
	import tTd from '@/components/t-table/t-td.vue'
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				msg:'',
				uid: "",
				curr_worktype_name: '',
				curr_worktype_bh: '',
				chuanghao: '',
				huohao: '',
				worktype: "",
				sl: '',
				price: '',
				je: '',
				info: '',
				list: [],
				userid: '',
				color: '',
				chima: '',
				ganghao: '',
				dk: ''
			}
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
		onLoad() {
			this.dk = this.websiteUrl,
				uni.getStorage({
					key: 'fwqsj',
					success: res => {
						this.dk = res.data
					}
				})
			uni.getStorage({
				key: 'loginData',
				success: res => {
					this.uid = res.data.uid,
						this.curr_worktype_bh = res.data.curr_worktype_bh
				}
			})


		},
		methods: {
			focus(){
				this.userid = '';
			},
			onpeSweepCode(){
				uni.scanCode({
					onlyFromCamera: true,
					scanType:['qrCode','barCode'],   //这里有个坑，不写的话扫描速度有点慢
					success: res => {
						this.userid = res.result,
						uni.request({
							url: `https://${this.dk}/getWorktypeProgress.aspx`,
							method: 'GET',
							data: {
								userid:this.userid
							},
							complete: res => {
								if(res.statusCode == 200){
									this.list = res.data;
									this.huohao = '';
									this.color = '';
									this.chima = '';
									if(this.list.length>0){
										let temp =  res.data;
										this.huohao = temp[0].huohao
										this.color = temp[0].color
										this.chima = temp[0].chima
										this.chuanghao = temp[0].chuanghao
										uni.showToast({
											 position:'top',
											 title: '扫描成功',
											 icon :'none',
										     duration: 5000
											 
										})
									}
								}else{
									this.list = [];
									this.huohao = '';
									this.color = '';
									this.chima = '';
									this.chuanghao = '';
									uni.showToast({
										 position:'top',
										 title:'请扫描正确的条码',
										 icon :'none',
										 duration: 3000
									})
								}
							}
						});
					}
				})
			},
			getData() {
				uni.request({
					url: `https://${this.dk}/getWorktypeProgress.aspx`,
					method: 'GET',
					data: {
						userid:this.userid
					},
					complete: res => {
						//console.log(res);
						if (res.statusCode == 200) {
							this.list = res.data;
							this.huohao = '';
							this.color = '';
							this.chima = '';
							if(this.list.length>0){
								let temp =  res.data;
								this.huohao = temp[0].huohao
								this.color = temp[0].color
								this.chima = temp[0].chima
								this.chuanghao = temp[0].chuanghao
								uni.showToast({
									 position:'top',
									 title: '扫描成功',
									 icon :'none',
								     duration: 5000
									 
								})
								
							}
						} else {
							this.list = [];
							this.huohao = '';
							this.color = '';
							this.chima = '';
							this.chuanghao = '';
							uni.showToast({
								 position:'top',
								 title:'请求数据失败，请输入正确的条码',
								 icon :'none',
							     duration: 3000
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.btn{
		margin:auto;
		width: 90%;
		left:0;
		right:0;
		bottom:60upx;
		background: rgb(255, 172, 96) !important;
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
	.content{overflow: hidden;}
	
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
	.warp{background: #FFFFFF;margin-top: 40upx;}
	.t-table .t-tr:nth-child(2n){
		background: #FFFFFF;
	}
	.t-table .t-tr:nth-child(2n){
		background: #FFFFFF;
	}
</style>
