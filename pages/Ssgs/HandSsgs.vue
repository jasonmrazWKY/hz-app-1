<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">编号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="number" v-model="barcode" placeholder="无法扫描可手动输入并点击查询"></input>
					<button size='mini' @tap="getData">查询</button>
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
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">预发数量:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" disabled ='true' v-model="yfsl"></input>
				</view>
			</view>
			
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label"><text style="color: red;">实收数量:</text></view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="number" @change="change" placeholder="请输入实收数量" v-model="sssl" ></input>
				</view>
			</view>
			
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label"><text style="color: red;">次品:</text></view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="number" @change="change" placeholder="请输入次品数" v-model="cp"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">差数:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="number" v-model="cs" value="" placeholder="请输入差数"></input>
					<button size='mini' @tap="okbtn">保存</button>
				</view>
			</view>
		</view>
		
		<view class="warp" style='margin-bottom: 40px;'>
			<t-table>
		        <t-tr>
		            <t-th>工序</t-th>
		            <t-th>员工</t-th>
		            <t-th>时间</t-th>
		        </t-tr>
		        <t-tr v-for="(item,index) in list" :key="item.index">
		            <t-td>{{item.worktype}}</t-td>
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
				fullHight:'',
				currentHight:'',
				showFlag:true,
				msg:'',
				list:[],
				uid:'',
				barcode:'',
				chuanghao:'',
				huohao:'',
				color:'',
				chima:'',
				yfsl:'',
				sssl:'',
				cp:'',
				cs:'',
				dk:''      //服务器ip
			}
		},
		onLoad() {
			this.dk = this.websiteUrl;
			uni.getStorage({
				key:'fwqsj',
				success: res => {
					this.dk = res.data
				}
			}),
			uni.getStorage({
				key: 'loginData',
				success: res => {
					this.uid = res.data.uid
				}
			})
		},
		onBackPress(options) {  
			if (options.from === 'navigateBack') {
				uni.offWindowResize(() => {
				    console.log('取消监听窗口尺寸变化事件')
				});
				uni.switchTab({
					url: '/pages/index/index'
				});
				return true; 
		    }  
		    return false;  
		}, 
		methods: {
			change(){
				//console.log('HELLO');
				this.cs = this.yfsl - this.sssl - this.cp;   
			},
			test(){
				this.barcode = '';
			},
			getData(){
				uni.request({
					url:`https://${this.dk}/getInfoSearch.aspx`,  //ES6模板字符串
					data:{Info: this.barcode},
					success: (res) => {	
						//console.info("@@@@"+JSON.stringify(res));	
						if(res.statusCode == 200){
							let temp = res.data.split(",")
							if(temp[0] == 0){
								this.barcode = this.barcode;
								this.chuanghao = temp[3];
								this.huohao = temp[4];
								this.color = temp[5];
								this.chima = temp[6];
								this.yfsl = temp[7];
								this.sssl = temp[8];
								this.cp = temp[9];
								this.cs = temp[10];
							}else{
								this.msg = temp[1];
								this.chuanghao = '';
								this.huohao = '';
								this.color = '';
								this.chima = '';
								this.yfsl = '';
								this.cp = '';
								this.cs = '';
								this.sssl = '';
							}
						}else{
							this.msg = "无效条码";
							this.chuanghao = '';
							this.huohao = '';
							this.color = '';
							this.chima = '';
							this.yfsl = '';
							this.cp = '';
							this.cs = '';
						}
					}				
				});
						
				uni.request({
					url: `https://${this.dk}/getSearchWorktype.aspx`,
					method: 'GET',
					data: {
						userid:this.barcode
					},
					success: res => {
						if(res.statusCode == 200){
							console.log(JSON.stringify(res));
							this.list = res.data;
						}
					}
				})
						
			},
			okbtn(){                    //按钮重复点击处理问题
				uni.request({
					url:`https://${this.dk}/updatesssl.aspx`,  //ES6模板字符串
					data:{
						Info:this.barcode,
						sssl:this.sssl,
						Cp:this.cp,
						Cs:this.cs,
						UID:this.uid
					},
					success: (res) => {	
					    console.log("*****"+JSON.stringify(res));
						if(res.statusCode == 200){
							let temp = res.data.split(",")
							if(temp[0] == 0){
								this.barcode ='';
								this.chuanghao = '';
								this.huohao = '';
								this.color = '';
								this.chima = '';
								this.yfsl = '';
								this.sssl = '';
								this.cp = '';
								this.cs = '';
								uni.showToast({
									position:'top',
									title:'修改成功',
									icon:'none',
									duration: 3000
								});
							}else{
								uni.showToast({
									position:'top',
									title:temp[1],
									icon:'none',
									duration: 2000
								});
							}
						}else{
							uni.showToast({
								title:'网络繁忙，请稍后重试',
								icon:'none',
								duration: 2000
							});
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
		bottom:20upx;
		background: rgb(255, 172, 96) !important;
	}
	.content{overflow: hidden;}
	
	.content uni-input{
		padding-left: 0 !important;
	}
	.warp{background: #FFFFFF;}
	.warp{background: #FFFFFF;margin-top: 40upx;}
	.t-table .t-tr:nth-child(2n){
		background: #FFFFFF;
	}
	.t-table .t-tr:nth-child(2n){
		background: #FFFFFF;
	}
	.uni-list-cell{
		position: relative;
	}
	.uni-list-cell-left {
	   font-size: 14px;
	   padding: 0 0 0 30upx;
	}
	.uni-list-cell-db button{
		position: absolute;
		right: 20upx;
		top: 10upx;
		background: rgb(255, 172, 96);
		color: #FFFFFF;
		z-index: 99;
	}
	.uni-input{
		padding: 0 !important;
		height: 66upx;
		line-height: 66upx;
	}
	.uni-label{
		width:140upx;
	}
</style>
